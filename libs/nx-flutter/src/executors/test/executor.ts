import { ExecutorContext } from '@nx/devkit';

import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import { FlutterTestExecutorOptions } from './schema';
import { FlutterTestExecutorOptionsNormalized } from '../../lib/models/executors/flutter-test-executor-options.model';
import flutterCommandExecutor, {
  normalizeCommandExecutorOptions,
} from '../../lib/flutter-command.executor';

/**
 * Nx executor for testing a Flutter application
 *
 * @param options the options provided to the executor
 * @param context the Nx executor context
 */
export default async function (
  options: FlutterTestExecutorOptions,
  context: ExecutorContext
) {
  const project = context.projectsConfigurations.projects[context.projectName];
  const normalizedOptions = normalizeCommandExecutorOptions<
    FlutterTestExecutorOptions,
    FlutterTestExecutorOptionsNormalized
  >(options, DEFAULT_FLUTTER_CLI_ARGS.test);

  return flutterCommandExecutor(project, 'run', {
    keyValue: [
      {
        key: 'device-id',
        value: normalizedOptions.deviceId,
      },
      ...(normalizedOptions.dartDefine?.map((value) => ({
        key: 'dart-define',
        value: value,
      })) ?? []),
      {
        key: 'dart-define-from-file',
        value: normalizedOptions.dartDefineFromFile,
      },
      {
        key: 'web-renderer',
        value: normalizedOptions.webRenderer,
      },
      { key: 'device-user', value: normalizedOptions.deviceUser },
      { key: 'flavor', value: normalizedOptions.flavor },
      { key: 'name', value: normalizedOptions.name },
      { key: 'plain-name', value: normalizedOptions.plainName },
      { key: 'tags', value: normalizedOptions.tags?.join(',') },
      { key: 'exclude-tags', value: normalizedOptions.excludeTags?.join(',') },
      { key: 'coverage-path', value: normalizedOptions.coveragePath },
      { key: 'concurrency', value: normalizedOptions.concurrency?.toString() },
      {
        key: 'test-randomize-ordering-seed',
        value: normalizedOptions.testRandomizeOrderingSeed,
      },
      { key: 'total-shards', value: normalizedOptions.totalShards?.toString() },
      { key: 'shard-index', value: normalizedOptions.shardIndex?.toString() },
      { key: 'reporter', value: normalizedOptions.reporter },
      { key: 'timeout', value: normalizedOptions.timeout },
      { key: 'dds-port', value: normalizedOptions.ddsPort?.toString() },
    ],
    boolean: [
      { key: 'verbose', value: normalizedOptions.verbose },
      { key: 'pub', value: normalizedOptions.pub },
      { key: 'null-assertions', value: normalizedOptions.nullAssertions },
      {
        key: 'track-widget-creation',
        value: normalizedOptions.trackWidgetCreation,
      },
      { key: 'start-paused', value: normalizedOptions.startPaused },
      { key: 'run-skipped', value: normalizedOptions.runSkipped },
      { key: 'coverage', value: normalizedOptions.coverage },
      { key: 'merge-coverage', value: normalizedOptions.mergeCoverage },
      { key: 'branch-coverage', value: normalizedOptions.branchCoverage },
      { key: 'update-goldens', value: normalizedOptions.updateGoldens },
      { key: 'test-assets', value: normalizedOptions.testAssets },
    ],
    positional: [],
  });
}
