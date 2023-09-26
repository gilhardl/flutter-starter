import { join } from 'path';
import { logger, ProjectConfiguration, workspaceRoot } from '@nx/devkit';

import { CommandArguments, FlutterCommand } from '../types';
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
