import { ExecutorContext } from '@nx/devkit';

import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import { FlutterAnalyzeExecutorOptions } from './schema';
import { FlutterAnalyzeExecutorOptionsNormalized } from '../../lib/models/flutter-analyze-executor-options.model';
import flutterCommandExecutor, {
  normalizeCommandExecutorOptions,
} from '../../lib/executors/flutter-command.executor';

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
      { key: 'currentPackage', value: normalizedOptions.currentPackage },
      { key: 'watch', value: normalizedOptions.watch },
      { key: 'suggestions', value: normalizedOptions.suggestions },
      { key: 'pub', value: normalizedOptions.pub },
      { key: 'congratulate', value: normalizedOptions.congratulate },
      { key: 'preamble', value: normalizedOptions.preamble },
      { key: 'fatalInfos', value: normalizedOptions.fatalInfos },
      { key: 'fatalWarnings', value: normalizedOptions.fatalWarnings },
    ],
    positional: [],
  });
}
