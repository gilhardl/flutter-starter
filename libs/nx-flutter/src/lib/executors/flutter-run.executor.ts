import { join } from 'path';
import { ProjectConfiguration, logger, workspaceRoot } from '@nx/devkit';

import { DEFAULT_FLUTTER_CLI_ARGS } from '../constants';
import { FlutterRunExecutorOptions } from '../../executors/run/schema';
import { FlutterRunExecutorOptionsNormalized } from '../models/flutter-run-executor-options.model';
import { runFlutterApplication } from '../utils/flutter.utils';

/**
 * Nx executor for running a Flutter application
 *
 * @param options the options provided to the executor
 */
export default async function (
  nxProject: ProjectConfiguration,
  options: FlutterRunExecutorOptions
) {
  const normalizedOptions = normalizeOptions(options);

  try {
    const success = await runFlutterApplication(
      normalizedOptions,
      join(workspaceRoot, nxProject.root)
    );
    return { success };
  } catch (e) {
    logger.error(e);
    return { success: false };
  }
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
