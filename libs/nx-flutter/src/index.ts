import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { load } from 'js-yaml';
import {
  CreateDependencies,
  DependencyType,
  ProjectConfiguration,
  ProjectGraphDependencyWithFile,
  workspaceRoot,
} from '@nx/devkit';

import { Pubspec } from './lib/models/pubspec.model';
import { isFlutterProject } from './lib/utils/flutter.utils';
import { getProjectFilePath } from './lib/utils/nx.utils';

export const createDependencies: CreateDependencies = (
  ctx
): ProjectGraphDependencyWithFile[] => {
  const flutterPackages = Object.values(ctx.projectsConfigurations.projects)
    .filter(isFlutterProject)
    .reduce<{
      [x in string]: {
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
        // Filter out dependencies that are not in the Nx workspace
        .filter(
          ([_, value]) =>
            typeof value === 'object' &&
            !!value['path'] &&
            resolve(
              getProjectFilePath(nxProject, 'pubspec.yaml'),
              '..',
              value['path']
            ).startsWith(resolve(workspaceRoot))
        )
        .map(([dependency, _]) => ({
          source: nxProject.name,
          target: flutterPackages[dependency].nxProject.name,
          sourceFile: join(nxProject.root, 'pubspec.yaml'),
          dependencyType: DependencyType.static,
        })),
    ];
  }, []);
};
