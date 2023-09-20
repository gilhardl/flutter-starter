import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { execSync } from 'child_process';
import { load } from 'js-yaml';
import { DependencyType, ProjectConfiguration, logger } from '@nx/devkit';
import { directoryExists, fileExists } from 'nx/src/utils/fileutils';

import { FlutterPlatform } from '../types';
import { Pubspec } from '../models/pubspec.model';
import { FlutterProjectGeneratorOptionsNormalized } from '../models/flutter-project-generator-options.model';
import { FlutterRunExecutorOptionsNormalized } from '../models/flutter-run-executor-options.model';
import { quote } from './strings.utils';
import { stringifyShellArguments } from './shell.utils';
import { runCommand } from './process.utils';
import { getProjectFilePath, isFilePathInWorkspace } from './nx.utils';

const FLUTTER_NOT_INSTALLED_ERROR_MESSAGE =
  "'flutter' was not found on your system's PATH.\nPlease make sure you have installed it correctly.\n👉🏾 https://flutter.dev/docs/get-started/install";

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

export function readFlutterProjectPubspec(
  nxProject: ProjectConfiguration
): Pubspec {
  return load(
    readFileSync(getProjectFilePath(nxProject, 'pubspec.yaml'), 'utf8')
  );
}

export function isFlutterPlatformTargeted(
  nxProject: ProjectConfiguration,
  platform: FlutterPlatform
): boolean {
  return directoryExists(getProjectFilePath(nxProject, platform));
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
 * Creates a Flutter project.
 *
 * It is a wrapper around the `flutter create` command.
 *
 * @returns a promise that resolves success of the command execution
 */
export async function createFlutterProject(
  options: FlutterProjectGeneratorOptionsNormalized
): Promise<boolean> {
  if (!isFlutterInstalled())
    throw new Error(FLUTTER_NOT_INSTALLED_ERROR_MESSAGE);

  const args = stringifyShellArguments(
    [
      {
        key: 'project-name',
        value: options.name.replace(new RegExp('-', 'g'), '_'),
      },
      { key: 'org', value: options.org },
      { key: 'description', value: quote(options.description) },
      { key: 'android-language', value: options.androidLanguage },
      { key: 'ios-language', value: options.iosLanguage },
      { key: 'template', value: options.template },
      {
        key: 'platforms',
        value: options.platforms ? quote(options.platforms.join(',')) : null,
      },
    ],
    [
      { key: 'pub', value: options.pub },
      { key: 'offline', value: options.offline },
      { key: 'overwrite', value: options.overwrite },
      { key: 'empty', value: options.empty },
    ]
  );

  if (process.env.NX_DRY_RUN === 'true') {
    logger.info(
      `Skipping Flutter ${options.template} creation because of --dry-run flag`
    );
    return;
  }

  const cmd = `flutter create ${args} ${options.directory}`;
  logger.info(
    `Creating Flutter ${options.template} with following command : ${cmd}`
  );

  try {
    const exitCode = await runCommand(cmd);

    const success = exitCode === 0;
    if (!success)
      logger.warn(
        `Warning: command "flutter create" exited with non-zero status code: ${exitCode}`
      );
    return success;
  } catch (e) {
    const error = new Error(`Failed to execute command: ${cmd}`);
    logger.error(error.message);
    logger.error(e);
    throw error;
  }
}

/**
 * Runs a Flutter project.
 *
 * It is a wrapper around the `flutter run` command.
 *
 * @returns a promise that resolves success of the command execution
 */
export async function runFlutterApplication(
  options: FlutterRunExecutorOptionsNormalized,
  cwd?: string
) {
  if (!isFlutterInstalled())
    throw new Error(FLUTTER_NOT_INSTALLED_ERROR_MESSAGE);

  const args = stringifyShellArguments(
    [
      ...(options.dartDefine?.map((value) => ({
        key: 'dart-define',
        value: value,
      })) ?? []),
      { key: 'dart-define-from-file', value: options.dartDefineFromFile },
      { key: 'web-renderer', value: options.webRenderer },
      { key: 'use-application-binary', value: options.useApplicationBinary },
      { key: 'route', value: options.route },
      ...(options.dartEntrypointArgs?.map((value) => ({
        key: 'dart-entrypoint-args',
        value: value,
      })) ?? []),
      { key: 'web-launch-url', value: options.webLaunchUrl },
      { key: 'target', value: options.target },
      {
        key: 'device-vmservice-port',
        value: options.deviceVmservicePort?.toString(),
      },
      {
        key: 'host-vmservice-port',
        value: options.hostVmservicePort?.toString(),
      },
      { key: 'device-user', value: options.deviceUser },
      { key: 'device-timeout', value: options.deviceTimeout?.toString() },
      { key: 'dds-port', value: options.ddsPort?.toString() },
      ...(options.androidProjectArg?.map((value) => ({
        key: 'android-project-arg',
        value: value,
      })) ?? []),
      { key: 'pid-file', value: options.pidFile },
    ],
    [
      ...(options.mode !== null
        ? [{ key: options.mode, value: options.mode !== 'debug' }]
        : []),
      { key: 'verbose', value: options.verbose },
      { key: 'flavor', value: options.flavor },
      { key: 'trace-startup', value: options.traceStartup },
      { key: 'cache-startup-profile', value: options.cacheStartupProfile },
      { key: 'verbose-system-logs', value: options.verboseSystemLogs },
      { key: 'cache-sksl', value: options.cacheSksl },
      {
        key: 'dump-skp-on-shader-compilation',
        value: options.dumpSkpOnShaderCompilation,
      },
      { key: 'purge-persistent-cache', value: options.purgePersistentCache },
      { key: 'start-paused', value: options.startPaused },
      { key: 'endless-trace-buffer', value: options.endlessTraceBuffer },
      { key: 'trace-systrace', value: options.traceSystrace },
      { key: 'trace-skia', value: options.traceSkia },
      { key: 'enable-dart-profiling', value: options.enableDartProfiling },
      {
        key: 'enable-software-rendering',
        value: options.enableSoftwareRendering,
      },
      {
        key: 'skia-deterministic-rendering',
        value: options.skiaDeterministicRendering,
      },
      { key: 'pub', value: options.pub },
      { key: 'track-widget-creation', value: options.trackWidgetCreation },
      { key: 'null-assertions', value: options.nullAssertions },
      { key: 'multidex', value: options.multidex },
      { key: 'ignore-deprecation', value: options.ignoreDeprecation },
      {
        key: 'await-first-frame-when-tracing',
        value: options.awaitFirstFrameWhenTracing,
      },
      { key: 'use-test-fonts', value: options.useTestFonts },
      { key: 'build', value: options.build },
      { key: 'hot', value: options.hot },
    ]
  );

  const cmd = `flutter run ${args}`;
  logger.info(`Running Flutter application with following command : ${cmd}`);
  try {
    const exitCode = await runCommand(cmd, cwd);

    const success = exitCode === 0;
    if (!success)
      logger.warn(
        `Warning: command "flutter run" exited with non-zero status code: ${exitCode}`
      );

    return success;
  } catch (e) {
    const error = new Error(`Failed to execute command: ${cmd}`);
    logger.error(error.message);
    logger.error(e);
    throw error;
  }
}

/**
 * Get Nx targets for the given project.
 */
export function getFlutterProjectNxTargets(
  options: FlutterProjectGeneratorOptionsNormalized
): Record<string, any> {
  // TODO : Create Nx executors for each Flutter command
  const tasks = [
    { name: 'analyze', command: 'analyze' },
    { name: 'clean', command: 'clean' },
    { name: 'format', command: `format ${options.directory}/*` },
    { name: 'test', command: 'test' },
  ];

  if (options.template === 'app') {
    tasks.push(
      { name: 'gen-l10n', command: 'gen-l10n' },
      { name: 'drive', command: 'drive' },
      { name: 'run', command: 'run' },
      { name: 'attach', command: 'attach' },
      { name: 'install', command: 'install' }
    );
    if (!!options.platforms) {
      if (options.platforms.indexOf('android') != -1) {
        tasks.push(
          { name: 'build-aar', command: 'build aar' },
          { name: 'build-apk', command: 'build apk' },
          { name: 'build-appbundle', command: 'build appbundle' },
          { name: 'build-bundle', command: 'build bundle' }
        );
      }
      if (options.platforms.indexOf('ios') != -1) {
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
        cwd: options.directory,
      },
      ...(task.name.startsWith('build-')
        ? {
            outputs: [`{workspaceRoot}/${options.directory}/build`],
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
      const pubspec = readFlutterProjectPubspec(nxProject);
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
