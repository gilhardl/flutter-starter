import { ExecutorContext, logger, workspaceRoot } from '@nx/devkit';

import { FlutterRunExecutorOptions } from './schema';
import runExecutor from '../../lib/executors/flutter-run.executor';

/**
 * Nx executor for running a Flutter application
 *
 * @param options the options provided to the executor
 * @param context the Nx executor context
 */
export default async function (
  options: FlutterRunExecutorOptions,
  context: ExecutorContext
) {
  const project = context.projectsConfigurations.projects[context.projectName];

  return runExecutor(project, options);
}
