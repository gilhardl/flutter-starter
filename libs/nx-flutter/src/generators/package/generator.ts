import { Tree } from '@nx/devkit';

import { FlutterPackageGeneratorOptions } from './schema';
import projectGenerator from '../../lib/flutter-project.generator';

/**
 * Nx generator for creating a Flutter package (pure Dart library)
 *
 * @param tree the file system tree
 * @param options the options passed to the generator
 */
export default async function (
  tree: Tree,
  options: FlutterPackageGeneratorOptions
) {
  return projectGenerator('package', options, tree);
}
