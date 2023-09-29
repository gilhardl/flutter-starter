import { join } from 'path';
import { logger, ProjectConfiguration, workspaceRoot } from '@nx/devkit';

import { CommandArguments, FlutterCommand } from '../types';
import {
  FlutterExecutorOptions,
  FlutterExecutorOptionsNormalized,
} from '../models/flutter-executor-options.model';
import { runFlutterCommand } from '../utils/flutter.utils';

/**
 * Nx executor for running a Flutter command
 *
 * @param nxProject the Nx project to run the command on
 * @param command the Flutter command to run
 * @param args arguments to pass to the flutter command
 */
export default async function (
  nxProject: ProjectConfiguration,
  command: FlutterCommand,
  args: CommandArguments
) {
  try {
    const success = await runFlutterCommand(
      command,
      args,
      join(workspaceRoot, nxProject.root)
    );
    return { success };
  } catch (e) {
    logger.error(e);
    return { success: false };
  }
}

/**
 * Normalize a Flutter command Nx executor options.
 *
 * - Set options to null if they are the same as the default options
 *
 * @param options the Nx executor options
 * @param defaultOptions the default options to compare against
 * @returns normalized options
 */
export function normalizeCommandExecutorOptions<
  Options extends FlutterExecutorOptions,
  OptionsNormalized extends FlutterExecutorOptionsNormalized
>(options: Options, defaultOptions: Options): OptionsNormalized {
  return Object.keys(options).reduce(
    (normalizedOptions, key) => ({
      ...normalizedOptions,
      [key]: options[key] !== defaultOptions[key] ? options[key] : null,
    }),
    {} as OptionsNormalized
  );
}
