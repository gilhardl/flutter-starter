import { ExecutorContext } from '@nx/devkit';

import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import { FlutterRunExecutorOptions } from './schema';
import { FlutterRunExecutorOptionsNormalized } from '../../lib/models/flutter-run-executor-options.model';
import flutterCommandExecutor, {
  normalizeCommandExecutorOptions,
} from '../../lib/executors/flutter-command.executor';

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
  const normalizedOptions = normalizeCommandExecutorOptions<
    FlutterRunExecutorOptions,
    FlutterRunExecutorOptionsNormalized
  >(options, DEFAULT_FLUTTER_CLI_ARGS.run);

  return flutterCommandExecutor(project, 'run', {
    keyValue: [
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
      {
        key: 'use-application-binary',
        value: normalizedOptions.useApplicationBinary,
      },
      {
        key: 'route',
        value: normalizedOptions.route,
      },
      ...(normalizedOptions.dartEntrypointArgs?.map((value) => ({
        key: 'dart-entrypoint-args',
        value: value,
      })) ?? []),
      { key: 'web-launch-url', value: normalizedOptions.webLaunchUrl },
      { key: 'target', value: normalizedOptions.target },
      {
        key: 'device-vmservice-port',
        value: normalizedOptions.deviceVmservicePort?.toString(),
      },
      {
        key: 'host-vmservice-port',
        value: normalizedOptions.hostVmservicePort?.toString(),
      },
      { key: 'device-user', value: normalizedOptions.deviceUser },
      {
        key: 'device-timeout',
        value: normalizedOptions.deviceTimeout?.toString(),
      },
      { key: 'dds-port', value: normalizedOptions.ddsPort?.toString() },
      ...(normalizedOptions.androidProjectArg?.map((value) => ({
        key: 'android-project-arg',
        value: value,
      })) ?? []),
      { key: 'pid-file', value: normalizedOptions.pidFile },
    ],
    boolean: [
      ...(normalizedOptions.mode !== null
        ? [
            {
              key: normalizedOptions.mode,
              value: normalizedOptions.mode !== 'debug',
            },
          ]
        : []),
      { key: 'verbose', value: normalizedOptions.verbose },
      { key: 'flavor', value: normalizedOptions.flavor },
      { key: 'trace-startup', value: normalizedOptions.traceStartup },
      {
        key: 'cache-startup-profile',
        value: normalizedOptions.cacheStartupProfile,
      },
      {
        key: 'verbose-system-logs',
        value: normalizedOptions.verboseSystemLogs,
      },
      { key: 'cache-sksl', value: normalizedOptions.cacheSksl },
      {
        key: 'dump-skp-on-shader-compilation',
        value: normalizedOptions.dumpSkpOnShaderCompilation,
      },
      {
        key: 'purge-persistent-cache',
        value: normalizedOptions.purgePersistentCache,
      },
      { key: 'start-paused', value: normalizedOptions.startPaused },
      {
        key: 'endless-trace-buffer',
        value: normalizedOptions.endlessTraceBuffer,
      },
      { key: 'trace-systrace', value: normalizedOptions.traceSystrace },
      { key: 'trace-skia', value: normalizedOptions.traceSkia },
      {
        key: 'enable-dart-profiling',
        value: normalizedOptions.enableDartProfiling,
      },
      {
        key: 'enable-software-rendering',
        value: normalizedOptions.enableSoftwareRendering,
      },
      {
        key: 'skia-deterministic-rendering',
        value: normalizedOptions.skiaDeterministicRendering,
      },
      { key: 'pub', value: normalizedOptions.pub },
      {
        key: 'track-widget-creation',
        value: normalizedOptions.trackWidgetCreation,
      },
      { key: 'null-assertions', value: normalizedOptions.nullAssertions },
      { key: 'multidex', value: normalizedOptions.multidex },
      { key: 'ignore-deprecation', value: normalizedOptions.ignoreDeprecation },
      {
        key: 'await-first-frame-when-tracing',
        value: normalizedOptions.awaitFirstFrameWhenTracing,
      },
      { key: 'use-test-fonts', value: normalizedOptions.useTestFonts },
      { key: 'build', value: normalizedOptions.build },
      { key: 'hot', value: normalizedOptions.hot },
    ],
    positional: [],
  });
}
