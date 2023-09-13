import { Tree } from '@nx/devkit';

import { FlutterAppGeneratorOptions } from './schema';
import { FlutterProject } from '../../lib/models/flutter-project.model';
import projectGenerator from '../../lib/flutter-project-generator';

/**
 * Nx generator for creating a Flutter application
 *
 * @param tree the file system tree
 * @param options the options passed to the generator
 */
export async function appGenerator(
  tree: Tree,
  options: FlutterAppGeneratorOptions
) {
  const project = new FlutterProject('app', options, tree);

  return projectGenerator(tree, project);
}

export default appGenerator;
