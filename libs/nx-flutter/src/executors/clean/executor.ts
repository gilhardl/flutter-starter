import { ExecutorContext } from '@nx/devkit';

import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import { FlutterCleanExecutorOptions } from './schema';
import { FlutterCleanExecutorOptionsNormalized } from '../../lib/models/executors/flutter-clean-executor-options.model';
import flutterCommandExecutor, {
  normalizeCommandExecutorOptions,
} from '../../lib/flutter-command.executor';

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
  const normalizedOptions = normalizeCommandExecutorOptions<
    FlutterCleanExecutorOptions,
    FlutterCleanExecutorOptionsNormalized
  >(options, DEFAULT_FLUTTER_CLI_ARGS.clean);

  return flutterCommandExecutor(project, 'clean', {
    keyValue: [],
    boolean: [{ key: 'verbose', value: normalizedOptions.verbose }],
    positional: [],
  });
}
