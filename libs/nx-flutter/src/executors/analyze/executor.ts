import { ExecutorContext } from '@nx/devkit';

import { FlutterAnalyzeExecutorOptions } from './schema';
import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import flutterCommandExecutor from '../../lib/executors/flutter-command.executor';
import { FlutterAnalyzeExecutorOptionsNormalized } from '../../lib/models/flutter-analyze-executor-options.model';

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
  const normalizedOptions = normalizeOptions(options);

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
  });
}

/**
 * Normalize options for a Flutter analyze Nx executor.
 *
 * - Set options to null if they are the same as the default Flutter CLI options
 *
 * @param options the options passed to the generator
 * @returns normalized options
 */
function normalizeOptions(
  options: FlutterAnalyzeExecutorOptions
): FlutterAnalyzeExecutorOptionsNormalized {
  const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.analyze;

  return {
    verbose:
      options.verbose !== defaultOptions.verbose ? options.verbose : null,
    currentPackage:
      options.currentPackage !== defaultOptions.currentPackage
        ? options.currentPackage
        : null,
    watch: options.watch !== defaultOptions.watch ? options.watch : null,
    write: options.write !== defaultOptions.write ? options.write : null,
    suggestions:
      options.suggestions !== defaultOptions.suggestions
        ? options.suggestions
        : null,
    pub: options.pub !== defaultOptions.pub ? options.pub : null,
    congratulate:
      options.congratulate !== defaultOptions.congratulate
        ? options.congratulate
        : null,
    preamble:
      options.preamble !== defaultOptions.preamble ? options.preamble : null,
    fatalInfos:
      options.fatalInfos !== defaultOptions.fatalInfos
        ? options.fatalInfos
        : null,
    fatalWarnings:
      options.fatalWarnings !== defaultOptions.fatalWarnings
        ? options.fatalWarnings
        : null,
  };
}
