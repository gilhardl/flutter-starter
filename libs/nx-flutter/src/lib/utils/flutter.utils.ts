import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { load } from 'js-yaml';
import { DependencyType, ProjectConfiguration, logger } from '@nx/devkit';
import { fileExists } from 'nx/src/utils/fileutils';

import { quote } from './strings.utils';
import { getProjectFilePath, isFilePathInWorkspace } from './nx.utils';
import { FlutterProject } from '../models/flutter-project.model';
import { Pubspec } from '../models/pubspec.model';
import { join, resolve } from 'path';

/**
 * Check if Flutter is installed
 *
 * @returns true if Flutter is installed, false otherwise
 */
export function isFlutterInstalled(): boolean {
  try {
    execSync(`flutter --version`, {
      stdio: ['ignore', 'ignore', 'ignore'],
    });
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Check if the given Nx project is a Flutter project
 *
 * @param nxProject the Nx project
 * @returns true if the Nx project is a Flutter project, false otherwise
 */
export function isFlutterProject(nxProject: ProjectConfiguration): boolean {
  return fileExists(getProjectFilePath(nxProject, 'pubspec.yaml'));
}

/**
 * Resolve the absolute path to the given dependency which path is relative to.
 *
 * @param nxProject the Nx project to resolve the dependency from
 * @param dependencyPath the relative dependency path to resolve form the Nx project
 * @returns absolute path to the given dependency
 */
export function resolveFlutterProjectPathDependency(
  nxProject: ProjectConfiguration,
  dependencyPath: string
): string {
  return resolve(
    getProjectFilePath(nxProject, 'pubspec.yaml'),
    '..',
    dependencyPath
  );
}

/**
 * Generate a Flutter project.
 *
 * It is a wrapper around the `flutter create` command.
 *
 * @returns a promise that resolves when the project is generated
 */
export async function createFlutterProject(
  project: FlutterProject
): Promise<void> {
  const keyValueArgs = [
    {
      key: 'project-name',
      value: project.name.replace(new RegExp('-', 'g'), '_'),
    },
    { key: 'org', value: project.org },
    { key: 'description', value: quote(project.description) },
    { key: 'android-language', value: project.androidLanguage },
    { key: 'ios-language', value: project.iosLanguage },
    { key: 'template', value: project.template },
    {
      key: 'platforms',
      value: project.platforms
        ? quote(project.platforms.join(','))
        : project.platforms,
    },
  ]
    .filter((e) => !!e.value)
    .map((e) => `--${e.key}=${e.value}`)
    .join(' ');

  const boolArgs = [
    { key: 'pub', value: project.pub },
    { key: 'offline', value: project.offline },
    { key: 'overwrite', value: project.overwrite },
    { key: 'empty', value: project.empty },
  ]
    .filter((e) => !!e.value)
    .map((e) => {
      if (e.value === true) return `--${e.key}`;
      else if (e.value === false) return `--no-${e.key}`;
      return '';
    })
    .join(' ');

  const args = [keyValueArgs, boolArgs].join(' ');

  logger.info(
    `Creating Flutter ${project.template} with following arguments : ${args}...`
  );

  if (!isFlutterInstalled()) {
    throw new Error(
      "'flutter' was not found on your system's PATH.\nPlease make sure you have installed it correctly.\n👉🏾 https://flutter.dev/docs/get-started/install"
    );
  }

  if (process.env.NX_DRY_RUN === 'true') {
    logger.info(
      `Skipping Flutter ${project.template} creation because of --dry-run flag`
    );
    return;
  }

  const cmd = `flutter create ${args} ${project.directory}`;
  try {
    logger.info(`Executing command: ${cmd}`);
    execSync(cmd, { stdio: [0, 1, 2] });
    return;
  } catch (e) {
    logger.error(`Failed to execute command: ${cmd}`);
    logger.error(e);
    return;
  }
}

/**
 * Get Nx targets for the given project.
 */
export function getFlutterProjectNxTargets(
  project: FlutterProject
): Record<string, any> {
  // TODO : Create Nx executors for each Flutter command
  const tasks = [
    { name: 'analyze', command: 'analyze' },
    { name: 'clean', command: 'clean' },
    { name: 'format', command: `format ${project.directory}/*` },
    { name: 'test', command: 'test' },
  ];

  if (project.template === 'app') {
    tasks.push(
      { name: 'gen-l10n', command: 'gen-l10n' },
      { name: 'drive', command: 'drive' },
      { name: 'run', command: 'run' },
      { name: 'attach', command: 'attach' },
      { name: 'install', command: 'install' }
    );
    if (!!project.platforms) {
      if (project.platforms.indexOf('android') != -1) {
        tasks.push(
          { name: 'build-aar', command: 'build aar' },
          { name: 'build-apk', command: 'build apk' },
          { name: 'build-appbundle', command: 'build appbundle' },
          { name: 'build-bundle', command: 'build bundle' }
        );
      }
      if (project.platforms.indexOf('ios') != -1) {
        tasks.push(
          { name: 'build-ios', command: 'build ios' },
          { name: 'build-ios-framework', command: 'build ios-framework' },
          { name: 'build-ipa', command: 'build ipa' }
        );
      }
    }
  }
  const targets = {};
  for (const task of tasks) {
    targets[task.name] = {
      executor: `nx:run-commands`,
      options: {
        command: `${task.name === 'format' ? 'dart' : 'flutter'} ${
          task.command
        }`,
        cwd: project.directory,
      },
      ...(task.name.startsWith('build-')
        ? {
            outputs: [`{workspaceRoot}/${project.directory}/build`],
          }
        : {}),
    };
  }
  return targets;
}

/**
 * Filter Flutter projects from the given list of Nx projects the read packages Pubspec data.
 *
 * @param nxProjects list of Nx projects to inspect
 * @returns a map of Flutter packages pubspec and it's Nx project associated, identified by it's Flutter package name.
 */
function inspectFlutterProjects(nxProjects: {
  [projectName: string]: ProjectConfiguration;
}): {
  [flutterPackageName: string]: {
    nxProject: ProjectConfiguration;
    pubspec: Pubspec;
  };
} {
  return Object.values(nxProjects)
    .filter(isFlutterProject)
    .reduce<{
      [flutterPackageName: string]: {
        nxProject: ProjectConfiguration;
        pubspec: Pubspec;
      };
    }>((repository, nxProject) => {
      const pubspec: Pubspec = load(
        readFileSync(getProjectFilePath(nxProject, 'pubspec.yaml'), 'utf8')
      );
      return {
        ...repository,
        [pubspec.name]: {
          nxProject,
          pubspec,
        },
      };
    }, {});
}

/**
 * Get dependencies between Flutter packages from the given list of Nx projects.
 *
 * @param nxProjects list of Nx projects to inspect
 * @returns dependencies between Flutter packages
 */
export function getFlutterPackagesDependencies(nxProjects: {
  [projectName: string]: ProjectConfiguration;
}) {
  const flutterPackages = inspectFlutterProjects(nxProjects);

  return Object.entries(flutterPackages).reduce((deps, entry) => {
    const { nxProject, pubspec } = entry[1] as {
      nxProject: ProjectConfiguration;
      pubspec: Pubspec;
    };

    return [
      ...deps,
      ...Object.entries({
        ...pubspec.dependencies,
        ...pubspec.dev_dependencies,
      })
        .filter(
          ([_, value]) =>
            typeof value === 'object' &&
            !!value['path'] &&
            isFilePathInWorkspace(
              resolveFlutterProjectPathDependency(nxProject, value['path'])
            )
        )
        .map(([dependency, _]) => ({
          source: nxProject.name,
          target: flutterPackages[dependency].nxProject.name,
          sourceFile: join(nxProject.root, 'pubspec.yaml'),
          dependencyType: DependencyType.static,
        })),
    ];
  }, []);
}
