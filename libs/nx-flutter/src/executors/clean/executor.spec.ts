import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import { TEST_APP_NAME } from '../../lib/constants/tests';
import * as FlutterCommandExecutor from '../../lib/flutter-command.executor';
import { FlutterCleanExecutorOptionsNormalized } from '../../lib/models/executors/flutter-clean-executor-options.model';
import { getExecutorContext } from '../../lib/utils/tests.utils';
import cleanExecutor from './executor';
import { FlutterCleanExecutorOptions } from './schema';

const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.clean;

describe('Clean executor', () => {
  const options: FlutterCleanExecutorOptions = defaultOptions;
  const context = getExecutorContext(TEST_APP_NAME, 'clean');

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
        ) as FlutterCleanExecutorOptionsNormalized
      );
  });

  it('can run', async () => {
    const output = await cleanExecutor(options, context);
    expect(output.success).toBe(true);
  });
});
