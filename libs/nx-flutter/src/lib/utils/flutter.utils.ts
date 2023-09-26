import { readFileSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';
import { load } from 'js-yaml';
import { logger, ProjectConfiguration } from '@nx/devkit';
import { fileExists } from 'nx/src/utils/fileutils';

import { CommandArguments, FlutterCommandType } from '../types';
import { Pubspec } from '../models/pubspec.model';
import { stringifyShellArguments } from './shell.utils';
import { runCommand } from './process.utils';
import { getProjectFilePath } from './nx.utils';

/**
 * Check if Flutter is installed
 *
 * @returns true if Flutter is installed, false otherwise
 */
export function isFlutterInstalled(): boolean {
  try {
    execSync(`flutter --version`, {
      stdio: ['ignore', 'ignore', 'ignore'],
    });
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Check if the given Nx project is a Flutter project
 *
 * @param nxProject the Nx project
 * @returns true if the Nx project is a Flutter project, false otherwise
 */
export function isFlutterProject(nxProject: ProjectConfiguration): boolean {
  return fileExists(getProjectFilePath(nxProject, 'pubspec.yaml'));
}

export function readFlutterProjectPubspec(
  nxProject: ProjectConfiguration
): Pubspec {
  return load(
    readFileSync(getProjectFilePath(nxProject, 'pubspec.yaml'), 'utf8')
  );
}

/**
 * Resolve the absolute path to the given dependency which path is relative to.
 *
 * @param nxProject the Nx project to resolve the dependency from
 * @param dependencyPath the relative dependency path to resolve form the Nx project
 * @returns absolute path to the given dependency
 */
export function resolveFlutterProjectPathDependency(
  nxProject: ProjectConfiguration,
  dependencyPath: string
): string {
  return resolve(
    getProjectFilePath(nxProject, 'pubspec.yaml'),
    '..',
    dependencyPath
  );
}

/**
 * Runs a Flutter command.
 *
 * It is a wrapper around the `flutter clean` command.
 *
 * @returns a promise that resolves success of the command execution
 */
export async function runFlutterCommand(
  command: FlutterCommandType,
  args: CommandArguments,
  cwd?: string
) {
  if (!isFlutterInstalled())
    throw new Error(
      "'flutter' was not found on your system's PATH.\nPlease make sure you have installed it correctly.\n👉🏾 https://flutter.dev/docs/get-started/install"
    );

  const cmd = `flutter ${command.toString()} ${stringifyShellArguments(args)}`;

  if (process.env.NX_DRY_RUN === 'true') {
    logger.info(
      `Skipping command execution because of --dry-run flag : ${cmd}`
    );
    return;
  }

  logger.info(`Running following command : ${cmd}`);
  try {
    const exitCode = await runCommand(cmd, cwd);

    const success = exitCode === 0;
    if (!success)
      logger.warn(
        `Warning: command exited with non-zero status code: ${exitCode}`
      );

    return success;
  } catch (e) {
    const error = new Error(`Failed to execute command: ${cmd}`);
    logger.error(error.message);
    logger.error(e);
    throw error;
  }
}
