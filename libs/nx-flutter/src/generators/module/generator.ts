import { Tree } from '@nx/devkit';

import { FlutterModuleGeneratorOptions } from './schema';
import projectGenerator from '../../lib/generators/flutter-project.generator';

/**
 * Nx generator for creating a Flutter module (Embeddable Flutter view)
 *
 * @param tree the file system tree
 * @param options the options passed to the generator
 */
export default async function (
  tree: Tree,
  options: FlutterModuleGeneratorOptions
) {
  return projectGenerator('module', options, tree);
}
