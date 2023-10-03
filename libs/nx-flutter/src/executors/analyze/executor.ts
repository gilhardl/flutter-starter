import { ExecutorContext } from '@nx/devkit';

import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import { FlutterAnalyzeExecutorOptions } from './schema';
import { FlutterAnalyzeExecutorOptionsNormalized } from '../../lib/models/executors/flutter-analyze-executor-options.model';
import flutterCommandExecutor, {
  normalizeCommandExecutorOptions,
} from '../../lib/flutter-command.executor';

/**
 * Nx executor for analyzing a Flutter project
 *
 * @param options the options provided to the executor
 * @param context the Nx executor context
 */
export default async function (
  options: FlutterAnalyzeExecutorOptions,
  context: ExecutorContext
) {
  const project = context.projectsConfigurations.projects[context.projectName];
  const normalizedOptions = normalizeCommandExecutorOptions<
    FlutterAnalyzeExecutorOptions,
    FlutterAnalyzeExecutorOptionsNormalized
  >(options, DEFAULT_FLUTTER_CLI_ARGS.analyze);

  return flutterCommandExecutor(project, 'analyze', {
    keyValue: [{ key: 'write', value: normalizedOptions.write }],
    boolean: [
      { key: 'verbose', value: normalizedOptions.verbose },
      { key: 'current-package', value: normalizedOptions.currentPackage },
      { key: 'watch', value: normalizedOptions.watch },
      { key: 'suggestions', value: normalizedOptions.suggestions },
      { key: 'pub', value: normalizedOptions.pub },
      { key: 'congratulate', value: normalizedOptions.congratulate },
      { key: 'preamble', value: normalizedOptions.preamble },
      { key: 'fatal-infos', value: normalizedOptions.fatalInfos },
      { key: 'fatal-warnings', value: normalizedOptions.fatalWarnings },
    ],
    positional: [],
  });
}
