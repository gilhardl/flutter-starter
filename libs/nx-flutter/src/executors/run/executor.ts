import {ExecutorContext} from '@nx/devkit';

import {FlutterRunExecutorOptions} from './schema';
import {DEFAULT_FLUTTER_CLI_ARGS} from '../../lib/constants';
import flutterCommandExecutor from '../../lib/executors/flutter-command.executor';
import {FlutterRunExecutorOptionsNormalized} from '../../lib/models/flutter-run-executor-options.model';

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
  const normalizedOptions = normalizeOptions(options);

  return flutterCommandExecutor(project, {
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
  });
}

/**
 * Normalize options for a Flutter run Nx executor.
 *
 * - Set options to null if they are the same as the default Flutter CLI options
 *
 * @param options the options passed to the generator
 * @returns normalized options
 */
function normalizeOptions(
  options: FlutterRunExecutorOptions
): FlutterRunExecutorOptionsNormalized {
  const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.run;

  return {
    verbose:
      options.verbose !== defaultOptions.verbose ? options.verbose : null,
    deviceId:
      options.deviceId !== defaultOptions.deviceId ? options.deviceId : null,
    mode: options.mode !== defaultOptions.mode ? options.mode : null,
    dartDefine:
      options.dartDefine !== defaultOptions.dartDefine
        ? options.dartDefine
        : null,
    dartDefineFromFile:
      options.dartDefineFromFile !== defaultOptions.dartDefineFromFile
        ? options.dartDefineFromFile
        : null,
    flavor: options.flavor !== defaultOptions.flavor ? options.flavor : null,
    webRenderer:
      options.webRenderer !== defaultOptions.webRenderer
        ? options.webRenderer
        : null,
    useApplicationBinary:
      options.useApplicationBinary !== defaultOptions.useApplicationBinary
        ? options.useApplicationBinary
        : null,
    traceStartup:
      options.traceStartup !== defaultOptions.traceStartup
        ? options.traceStartup
        : null,
    cacheStartupProfile:
      options.cacheStartupProfile !== defaultOptions.cacheStartupProfile
        ? options.cacheStartupProfile
        : null,
    verboseSystemLogs:
      options.verboseSystemLogs !== defaultOptions.verboseSystemLogs
        ? options.verboseSystemLogs
        : null,
    cacheSksl:
      options.cacheSksl !== defaultOptions.cacheSksl ? options.cacheSksl : null,
    dumpSkpOnShaderCompilation:
      options.dumpSkpOnShaderCompilation !==
      defaultOptions.dumpSkpOnShaderCompilation
        ? options.dumpSkpOnShaderCompilation
        : null,
    purgePersistentCache:
      options.purgePersistentCache !== defaultOptions.purgePersistentCache
        ? options.purgePersistentCache
        : null,
    route: options.route !== defaultOptions.route ? options.route : null,
    startPaused:
      options.startPaused !== defaultOptions.startPaused
        ? options.startPaused
        : null,
    endlessTraceBuffer:
      options.endlessTraceBuffer !== defaultOptions.endlessTraceBuffer
        ? options.endlessTraceBuffer
        : null,
    traceSystrace:
      options.traceSystrace !== defaultOptions.traceSystrace
        ? options.traceSystrace
        : null,
    traceSkia:
      options.traceSkia !== defaultOptions.traceSkia ? options.traceSkia : null,
    enableDartProfiling:
      options.enableDartProfiling !== defaultOptions.enableDartProfiling
        ? options.enableDartProfiling
        : null,
    enableSoftwareRendering:
      options.enableSoftwareRendering !== defaultOptions.enableSoftwareRendering
        ? options.enableSoftwareRendering
        : null,
    skiaDeterministicRendering:
      options.skiaDeterministicRendering !==
      defaultOptions.skiaDeterministicRendering
        ? options.skiaDeterministicRendering
        : null,
    dartEntrypointArgs:
      options.dartEntrypointArgs !== defaultOptions.dartEntrypointArgs
        ? options.dartEntrypointArgs
        : null,
    webLaunchUrl:
      options.webLaunchUrl !== defaultOptions.webLaunchUrl
        ? options.webLaunchUrl
        : null,
    target: options.target !== defaultOptions.target ? options.target : null,
    deviceVmservicePort:
      options.deviceVmservicePort !== defaultOptions.deviceVmservicePort
        ? options.deviceVmservicePort
        : null,
    hostVmservicePort:
      options.hostVmservicePort !== defaultOptions.hostVmservicePort
        ? options.hostVmservicePort
        : null,
    pub: options.pub !== defaultOptions.pub ? options.pub : null,
    trackWidgetCreation:
      options.trackWidgetCreation !== defaultOptions.trackWidgetCreation
        ? options.trackWidgetCreation
        : null,
    nullAssertions:
      options.nullAssertions !== defaultOptions.nullAssertions
        ? options.nullAssertions
        : null,
    deviceUser:
      options.deviceUser !== defaultOptions.deviceUser
        ? options.deviceUser
        : null,
    deviceTimeout:
      options.deviceTimeout !== defaultOptions.deviceTimeout
        ? options.deviceTimeout
        : null,
    ddsPort:
      options.ddsPort !== defaultOptions.ddsPort ? options.ddsPort : null,
    androidProjectArg:
      options.androidProjectArg !== defaultOptions.androidProjectArg
        ? options.androidProjectArg
        : null,
    multidex:
      options.multidex !== defaultOptions.multidex ? options.multidex : null,
    ignoreDeprecation:
      options.ignoreDeprecation !== defaultOptions.ignoreDeprecation
        ? options.ignoreDeprecation
        : null,
    awaitFirstFrameWhenTracing:
      options.awaitFirstFrameWhenTracing !==
      defaultOptions.awaitFirstFrameWhenTracing
        ? options.awaitFirstFrameWhenTracing
        : null,
    useTestFonts:
      options.useTestFonts !== defaultOptions.useTestFonts
        ? options.useTestFonts
        : null,
    build: options.build !== defaultOptions.build ? options.build : null,
    hot: options.hot !== defaultOptions.hot ? options.hot : null,
    pidFile:
      options.pidFile !== defaultOptions.pidFile ? options.pidFile : null,
  };
}
