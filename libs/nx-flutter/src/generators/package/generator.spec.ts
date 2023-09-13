import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { packageGenerator } from './generator';
import { FlutterPackageGeneratorOptions } from './schema';

describe('package generator', () => {
  let tree: Tree;
  const options: FlutterPackageGeneratorOptions = {
    name: 'test',
    description: 'Test application',
    org: 'com.example',
    pub: true,
    offline: false,
    overwrite: false,
    tags: '',
    directory: '.',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await packageGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
