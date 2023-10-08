import * as NxDevkit from '@nx/devkit';
import { Tree, getWorkspaceLayout } from '@nx/devkit';

import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { DEFAULT_FLUTTER_CLI_ARGS, NX_PLUGIN_PACKAGE } from './constants';
import { TEST_APP_NAME } from './constants/tests';
import projectGenerator, {
  normalizeProjectGeneratorOptions,
} from './flutter-project.generator';
import { FlutterProjectGeneratorOptions } from './models/generators/flutter-project-generator-options.model';
import * as FlutterUtils from './utils/flutter.utils';
import * as NxUtils from './utils/nx.utils';

const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.create;

describe('Project generator', () => {
  let tree: Tree;
  let options: FlutterProjectGeneratorOptions;

  let addPluginToNxJsonMock: jest.SpyInstance;

  beforeAll(() => {
    jest.spyOn(NxDevkit, 'addProjectConfiguration').mockReturnValue(void 0);

    addPluginToNxJsonMock = jest.spyOn(NxUtils, 'addPluginToNxJson');
    addPluginToNxJsonMock.mockReturnValue(void 0);
    jest.spyOn(NxUtils, 'isNxProject').mockReturnValue(false);

    jest.spyOn(FlutterUtils, 'runFlutterCommand').mockReturnValue(void 0);
  });

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    options = {
      ...defaultOptions,
      name: TEST_APP_NAME,
      tags: undefined,
      directory: '.',
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`should add ${NX_PLUGIN_PACKAGE} plugin to workspace nx.json`, async () => {
    await projectGenerator('app', options, tree);

    expect(addPluginToNxJsonMock).toBeCalledTimes(1);
    expect(addPluginToNxJsonMock).toHaveBeenCalledWith(tree, NX_PLUGIN_PACKAGE);
  });

  describe('normalizeProjectGeneratorOptions', () => {
    describe('name', () => {
      it.each([
        ['test-app', 'test-app'],
        ['testApp', 'test-app'],
        ['Test app', 'test-app'],
        ['TestApp', 'test-app'],
        ['   Test app ', 'test-app'],
      ])('should format %s as %s', (name: string, expected: string) => {
        const customOptions = {
          ...options,
          name,
        };

        const normalizedOptions = normalizeProjectGeneratorOptions(
          'app',
          customOptions,
          getWorkspaceLayout(tree)
        );

        expect(normalizedOptions.name).toBe(expected);
      });

      it('should be prefixed by parent folders names', () => {
        // TODO: add test
      });
    });

    describe('description', () => {
      it('should be trimmed', () => {
        // TODO: add test
      });
      it('should be set to null if is default', () => {
        // TODO: add test
      });
    });

    describe('organization name', () => {
      it('should be trimmed', () => {
        // TODO: add test
      });
      it('should be set to null if is default', () => {
        // TODO: add test
      });
    });
    // TODO: add tests for other options
  });
});
