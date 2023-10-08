import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import { TEST_APP_NAME } from '../../lib/constants/tests';
import * as FlutterCommandExecutor from '../../lib/flutter-command.executor';
import { FlutterAttachExecutorOptionsNormalized } from '../../lib/models/executors/flutter-attach-executor-options.model';
import { getExecutorContext } from '../../lib/utils/tests.utils';
import runExecutor from './executor';
import { FlutterAttachExecutorOptions } from './schema';

const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.attach;

describe('Attach executor', () => {
  const options: FlutterAttachExecutorOptions = defaultOptions;
  const context = getExecutorContext(TEST_APP_NAME, 'attach');

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
        ) as FlutterAttachExecutorOptionsNormalized
      );
  });

  it('can run', async () => {
    const output = await runExecutor(options, context);
    expect(output.success).toBe(true);
  });
});
