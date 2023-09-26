import { join } from 'path';
import {
  CreateDependenciesContext,
  DependencyType,
  ProjectConfiguration,
  ProjectGraphDependencyWithFile,
} from '@nx/devkit';

import { Pubspec } from './lib/models/pubspec.model';
import { isFilePathInWorkspace } from './lib/utils/nx.utils';
import {
  isFlutterProject,
  readFlutterProjectPubspec,
  resolveFlutterProjectPathDependency,
} from './lib/utils/flutter.utils';

/**
 * Build the dependencies tree for the workspace's Nx project graph
 */
export default (
  ctx: CreateDependenciesContext
): ProjectGraphDependencyWithFile[] => {
  return getFlutterPackagesDependencies(ctx.projectsConfigurations.projects);
};

/**
 * Get dependencies between Flutter packages from the given list of Nx projects.
 *
 * @param nxProjects list of Nx projects to inspect
 * @returns dependencies between Flutter packages
 */
function getFlutterPackagesDependencies(nxProjects: {
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
