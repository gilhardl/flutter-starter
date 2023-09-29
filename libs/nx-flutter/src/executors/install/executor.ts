import { ExecutorContext } from '@nx/devkit';

import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import { FlutterInstallExecutorOptions } from './schema';
import { FlutterInstallExecutorOptionsNormalized } from '../../lib/models/executors/flutter-install-executor-options.model';
import flutterCommandExecutor, {
  normalizeCommandExecutorOptions,
} from '../../lib/flutter-command.executor';

/**
 * Nx executor for installing a Flutter application
 *
 * @param options the options provided to the executor
 * @param context the Nx executor context
 */
export default async function (
  options: FlutterInstallExecutorOptions,
  context: ExecutorContext
) {
  const project = context.projectsConfigurations.projects[context.projectName];
  const normalizedOptions = normalizeCommandExecutorOptions<
    FlutterInstallExecutorOptions,
    FlutterInstallExecutorOptionsNormalized
  >(options, DEFAULT_FLUTTER_CLI_ARGS.install);

  return flutterCommandExecutor(project, 'run', {
    keyValue: [
      {
        key: 'device-id',
        value: normalizedOptions.deviceId,
      },
      {
        key: 'use-application-binary',
        value: normalizedOptions.useApplicationBinary,
      },
      { key: 'flavor', value: normalizedOptions.flavor },
      {
        key: 'device-timeout',
        value: normalizedOptions.deviceTimeout?.toString(),
      },
      { key: 'device-user', value: normalizedOptions.deviceUser },
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
      { key: 'uninstall-only', value: normalizedOptions.uninstallOnly },
    ],
    positional: [],
  });
}
