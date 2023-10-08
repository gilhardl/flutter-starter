import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import { TEST_APP_NAME } from '../../lib/constants/tests';
import * as FlutterCommandExecutor from '../../lib/flutter-command.executor';
import { FlutterAnalyzeExecutorOptionsNormalized } from '../../lib/models/executors/flutter-analyze-executor-options.model';
import { getExecutorContext } from '../../lib/utils/tests.utils';
import analyzeExecutor from './executor';
import { FlutterAnalyzeExecutorOptions } from './schema';

const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.analyze;

describe('Analyze executor', () => {
  const options: FlutterAnalyzeExecutorOptions = defaultOptions;
  const context = getExecutorContext(TEST_APP_NAME, 'analyze');

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
        ) as FlutterAnalyzeExecutorOptionsNormalized
      );
  });

  it('can run', async () => {
    const output = await analyzeExecutor(options, context);
    expect(output.success).toBe(true);
  });
});
