import { ExecutorContext } from '@nx/devkit';

import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import { FlutterAttachExecutorOptions } from './schema';
import { FlutterAttachExecutorOptionsNormalized } from '../../lib/models/executors/flutter-attach-executor-options.model';
import flutterCommandExecutor, {
  normalizeCommandExecutorOptions,
} from '../../lib/flutter-command.executor';

/**
 * Nx executor for running a Flutter application
 *
 * @param options the options provided to the executor
 * @param context the Nx executor context
 */
export default async function (
  options: FlutterAttachExecutorOptions,
  context: ExecutorContext
) {
  const project = context.projectsConfigurations.projects[context.projectName];
  const normalizedOptions = normalizeCommandExecutorOptions<
    FlutterAttachExecutorOptions,
    FlutterAttachExecutorOptionsNormalized
  >(options, DEFAULT_FLUTTER_CLI_ARGS.attach);

  return flutterCommandExecutor(project, 'attach', {
    keyValue: [
      {
        key: 'device-id',
        value: normalizedOptions.deviceId,
      },
      { key: 'target', value: normalizedOptions.target },
      {
        key: 'device-vmservice-port',
        value: normalizedOptions.deviceVmservicePort?.toString(),
      },
      {
        key: 'host-vmservice-port',
        value: normalizedOptions.hostVmservicePort?.toString(),
      },
      ...(normalizedOptions.dartDefine?.map((value) => ({
        key: 'dart-define',
        value: value,
      })) ?? []),
      {
        key: 'dart-define-from-file',
        value: normalizedOptions.dartDefineFromFile,
      },
      { key: 'device-user', value: normalizedOptions.deviceUser },
      { key: 'debug-url', value: normalizedOptions.debugUrl },
      { key: 'app-id', value: normalizedOptions.appId },
      { key: 'pid-file', value: normalizedOptions.pidFile },
      { key: 'dds-port', value: normalizedOptions.ddsPort?.toString() },
      {
        key: 'device-timeout',
        value: normalizedOptions.deviceTimeout?.toString(),
      },
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
      { key: 'null-assertions', value: normalizedOptions.nullAssertions },
      {
        key: 'track-widget-creation',
        value: normalizedOptions.trackWidgetCreation,
      },
    ],
    positional: [],
  });
}
