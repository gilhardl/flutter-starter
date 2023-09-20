import {
  CreateDependenciesContext,
  ProjectGraphDependencyWithFile,
} from '@nx/devkit';

import { getFlutterPackagesDependencies } from './lib/utils/flutter.utils';

/**
 * Build the dependencies tree for the workspace's Nx project graph
 */
export default (
  ctx: CreateDependenciesContext
): ProjectGraphDependencyWithFile[] => {
  return getFlutterPackagesDependencies(ctx.projectsConfigurations.projects);
};
