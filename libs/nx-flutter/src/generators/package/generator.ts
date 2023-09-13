import { Tree } from '@nx/devkit';

import { FlutterPackageGeneratorOptions } from './schema';
import { FlutterProject } from '../../lib/models/flutter-project.model';
import projectGenerator from '../../lib/flutter-project-generator';

/**
 * Nx generator for creating a Flutter package (pure Dart library)
 *
 * @param tree the file system tree
 * @param options the options passed to the generator
 */
export async function packageGenerator(
  tree: Tree,
  options: FlutterPackageGeneratorOptions
) {
  const project = new FlutterProject('package', options, tree);

  return projectGenerator(tree, project);
}

export default packageGenerator;
