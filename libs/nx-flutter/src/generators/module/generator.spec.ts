import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { moduleGenerator } from './generator';
import { FlutterModuleGeneratorOptions } from './schema';

describe('module generator', () => {
  let tree: Tree;
  const options: FlutterModuleGeneratorOptions = {
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
    await moduleGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
