import { Tree } from '@nx/devkit';

import { FlutterAppGeneratorOptions } from './schema';
import projectGenerator from '../../lib/generators/flutter-project.generator';

/**
 * Nx generator for creating a Flutter application
 *
 * @param tree the file system tree
 * @param options the options passed to the generator
 */
export default async function (
  tree: Tree,
  options: FlutterAppGeneratorOptions
) {
  return projectGenerator('app', options, tree);
}
