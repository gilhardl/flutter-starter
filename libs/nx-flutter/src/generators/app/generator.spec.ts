import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { appGenerator } from './generator';
import { AppGeneratorSchema } from './schema';

describe('app generator', () => {
  let tree: Tree;
  const options: AppGeneratorSchema = {
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
    tags: [],
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
