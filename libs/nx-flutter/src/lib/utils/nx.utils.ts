import { join, resolve } from 'path';
import {
  ProjectConfiguration,
  Tree,
  readJson,
  workspaceRoot,
  writeJson,
} from '@nx/devkit';

/**
 * Check if given file path is in the Nx workspace
 *
 * @param filePath the file path to check
 * @returns true if the file path is in the Nx workspace, false otherwise
 */
export function isFilePathInWorkspace(filePath: string) {
  return filePath.startsWith(resolve(workspaceRoot));
}

/**
 * Get the path to the project root
 *
 * @param project the Nx project
 * @returns the path to the project root
 */
export function getProjectRoot(project: ProjectConfiguration) {
  return join(workspaceRoot, project.root);
}

/**
 * Get the path of a file in the project
 *
 * @param project the Nx project
 * @returns the path to the file in the project
 */
export function getProjectFilePath(
  project: ProjectConfiguration,
  relativeFile: string
) {
  return join(getProjectRoot(project), ...relativeFile.split(/[/\\]/));
}

/**
 * Add a plugin to the Nx configuration
 *
 * @param tree the file system tree
 * @param pluginName the name of the plugin to add
 * @returns void
 */
export function addPluginToNxJson(tree: Tree, pluginName: string) {
  const nxJson = readJson(tree, 'nx.json');
  nxJson.plugins = nxJson.plugins || [];
  if (!nxJson.plugins.includes(pluginName)) {
    nxJson.plugins.push(pluginName);
  }

  writeJson(tree, 'nx.json', nxJson);
}
