import { ExecutorContext } from '@nx/devkit';

import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import cleanExecutor from './executor';
import { FlutterCleanExecutorOptions } from './schema';

const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.clean;

describe('Clean executor', () => {
  const options: FlutterCleanExecutorOptions = defaultOptions;
  const context = {
    cwd: '/root',
    root: '/root',
    projectName: 'my-app',
    targetName: 'build',
    configurationName: 'production',
    projectsConfigurations: {
      version: 1,
      projects: {
        'my-app': {
          root: '/apps/my-app',
        },
      },
    },
    isVerbose: false,
  } as ExecutorContext;

  it('can run', async () => {
    const output = await cleanExecutor(options, context);
    expect(output.success).toBe(true);
  });
});
