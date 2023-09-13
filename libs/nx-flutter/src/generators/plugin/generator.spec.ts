import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { pluginGenerator } from './generator';
import { FlutterPluginGeneratorOptions } from './schema';

describe('plugin generator', () => {
  let tree: Tree;
  const options: FlutterPluginGeneratorOptions = {
    name: 'test',
    description: 'Test application',
    org: 'com.example',
    platforms: [],
    androidLanguage: 'kotlin',
    iosLanguage: 'swift',
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
    await pluginGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
