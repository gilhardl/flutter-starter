import { ExecutorContext } from '@nx/devkit';

import { FlutterCleanExecutorOptions } from './schema';
import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import flutterCommandExecutor from '../../lib/executors/flutter-command.executor';
import { FlutterCleanExecutorOptionsNormalized } from '../../lib/models/flutter-clean-executor-options.model';

/**
 * Nx executor for cleaning a Flutter project
 *
 * @param options the options provided to the executor
 * @param context the Nx executor context
 */
export default async function (
  options: FlutterCleanExecutorOptions,
  context: ExecutorContext
) {
  const project = context.projectsConfigurations.projects[context.projectName];
  const normalizedOptions = normalizeOptions(options);

  return flutterCommandExecutor(project, 'clean', {
    keyValue: [],
    boolean: [{ key: 'verbose', value: normalizedOptions.verbose }],
    positional: [],
  });
}

/**
 * Normalize options for a Flutter clean Nx executor.
 *
 * - Set options to null if they are the same as the default Flutter CLI options
 *
 * @param options the options passed to the generator
 * @returns normalized options
 */
function normalizeOptions(
  options: FlutterCleanExecutorOptions
): FlutterCleanExecutorOptionsNormalized {
  const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.clean;

  return {
    verbose:
      options.verbose !== defaultOptions.verbose ? options.verbose : null,
  };
}
