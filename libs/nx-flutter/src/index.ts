import {
  CreateDependencies,
  CreateDependenciesContext,
  ProjectGraphDependencyWithFile,
} from '@nx/devkit';

import { getFlutterPackagesDependencies } from './lib/utils/flutter.utils';

export const createDependencies: CreateDependencies = (
  ctx: CreateDependenciesContext
): ProjectGraphDependencyWithFile[] => {
  return getFlutterPackagesDependencies(ctx.projectsConfigurations.projects);
};
