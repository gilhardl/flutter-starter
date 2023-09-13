import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { appGenerator } from './generator';
import { FlutterAppGeneratorOptions } from './schema';

describe('app generator', () => {
  let tree: Tree;
  const options: FlutterAppGeneratorOptions = {
    name: 'test',
    description: 'Test application',
    org: 'com.example',
    platforms: [],
    androidLanguage: 'kotlin',
    iosLanguage: 'swift',
    pub: true,
    offline: false,
    overwrite: false,
    empty: false,
    tags: '',
    directory: '.',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await appGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
