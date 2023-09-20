import { Tree } from '@nx/devkit';

import { FlutterPluginGeneratorOptions } from './schema';
import projectGenerator from '../../lib/generators/flutter-project.generator';

/**
 * Nx generator for creating a Flutter plugin (Dart + platform-specific code)
 *
 * @param tree the file system tree
 * @param options the options passed to the generator
 */
export default async function (
  tree: Tree,
  options: FlutterPluginGeneratorOptions
) {
  return projectGenerator('plugin', options, tree);
}
