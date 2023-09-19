import { Tree } from '@nx/devkit';

import { FlutterModuleGeneratorOptions } from './schema';
import { FlutterProject } from '../../lib/models/flutter-project.model';
import projectGenerator from '../../lib/flutter-project-generator';

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
  const project = new FlutterProject('module', options, tree);

  return projectGenerator(tree, project);
}
