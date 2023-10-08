import {
  ExecutorContext,
  TargetConfiguration,
  getProjects,
  readNxJson,
  workspaceLayout,
  workspaceRoot,
} from '@nx/devkit';
import { NX_PLUGIN_PACKAGE } from '../constants';
import { FsTree } from 'nx/src/generators/tree';
import { FlutterCommand } from '../types';

/**
 * Create a dummy Nx executor context for testing
 *
 * @param project the name of the project the executor is being executed on
 * @param executor the name of the executor being executed
 * @param configuration the name of the configuration being executed
 * @param target the configuration of the target being executed
 * @returns Nx context for executor testing
 */
export function getExecutorContext(
  project: string,
  executor: Exclude<FlutterCommand, 'create'>,
  configuration = 'production',
  target?: TargetConfiguration
): ExecutorContext {
  const { appsDir } = workspaceLayout();

  const tree = new FsTree(
    workspaceRoot,
    true,
    `${NX_PLUGIN_PACKAGE}/${executor}/test`
  );

  const projects = Object.fromEntries(getProjects(tree));
  if (!Object.keys(projects[project]).includes(executor)) {
    projects[project].targets[executor] = {
      executor: `${NX_PLUGIN_PACKAGE}:${executor}`,
      ...target,
    };
  }

  return {
    root: workspaceRoot,
    projectName: project,
    targetName: executor,
    configurationName: configuration,
    target: target ?? projects[project].targets[executor],
    projectsConfigurations: {
      version: 2,
      projects,
    },
    nxJsonConfiguration: readNxJson(tree),
    cwd: workspaceRoot,
    isVerbose: false,
    projectGraph: {},
    taskGraph: {},
    workspace: {},
  } as ExecutorContext;
}
