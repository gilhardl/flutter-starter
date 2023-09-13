import { join } from 'path';
import { addProjectConfiguration, Tree } from '@nx/devkit';

import { NX_FLUTTER_PKG } from './constants';
import { FlutterProject } from './models/flutter-project.model';
import { addPluginToNxJson } from './utils/nx.utils';
import {
  createFlutterProject,
  getFlutterProjectNxTargets,
} from './utils/flutter.utils';

/**
 * Nx generator for creating a Flutter application
 *
 * @param tree the file system tree
 * @param options the options passed to the generator
 */
export async function projectGenerator(tree: Tree, project: FlutterProject) {
  addPluginToNxJson(tree, NX_FLUTTER_PKG);

  await createFlutterProject(project);

  addProjectConfiguration(tree, project.name, {
    root: project.directory,
    sourceRoot: join(project.directory, 'src'),
    projectType: project.template === 'app' ? 'application' : 'library',
    targets: getFlutterProjectNxTargets(project),
    tags: project.tags,
  });
}

export default projectGenerator;
