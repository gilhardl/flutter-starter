import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import { TEST_APP_NAME } from '../../lib/constants/tests';
import * as FlutterCommandExecutor from '../../lib/flutter-command.executor';
import { FlutterInstallExecutorOptionsNormalized } from '../../lib/models/executors/flutter-install-executor-options.model';
import { getExecutorContext } from '../../lib/utils/tests.utils';
import runExecutor from './executor';
import { FlutterInstallExecutorOptions } from './schema';

const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.install;

describe('Install executor', () => {
  const options: FlutterInstallExecutorOptions = defaultOptions;
  const context = getExecutorContext(TEST_APP_NAME, 'install');

  beforeAll(() => {
    jest
      .spyOn(FlutterCommandExecutor, 'default')
      .mockImplementation(async () => ({ success: true }));

    jest
      .spyOn(FlutterCommandExecutor, 'normalizeCommandExecutorOptions')
      .mockReturnValue(
        Object.keys(defaultOptions).reduce(
          (acc, key) => ({
            ...acc,
            [key]: null,
          }),
          {}
        ) as FlutterInstallExecutorOptionsNormalized
      );
  });

  it('can run', async () => {
    const output = await runExecutor(options, context);
    expect(output.success).toBe(true);
  });
});
