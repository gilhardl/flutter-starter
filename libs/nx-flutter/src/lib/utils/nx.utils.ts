import { join } from 'path';
import {
  ProjectConfiguration,
  Tree,
  readJson,
  workspaceRoot,
  writeJson,
} from '@nx/devkit';

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
