import { FlutterTestReporter, FlutterWebRenderer } from '../types';
import { FlutterExecutorOptionsNormalized } from './flutter-executor-options.model';

/**
 * Normalized options passed to the `flutter test` command.
 */
export interface FlutterTestExecutorOptionsNormalized
  extends FlutterExecutorOptionsNormalized {
  /**
   * Target device id or name (prefixes allowed).
   */
  deviceId: string | null;

  /**
   * Whether to run \"flutter pub get\" before executing this command.
   */
  pub: boolean | null;

  /**
   * Perform additional null assertions on the boundaries of migrated and un-migrated code. This setting is not currently supported on desktop devices.
   */
  nullAssertions: boolean | null;

  /**
   * Track widget creation locations. This enables features such as the widget inspector. This parameter is only functional in debug mode (i.e. when compiling JIT, not AOT). (defaults to on)
   */
  trackWidgetCreation: boolean | null;

  /**
   * Additional key-value pairs that will be available as constants from the String.fromEnvironment, bool.fromEnvironment, int.fromEnvironment, and double.fromEnvironment constructors.
   */
  dartDefine: string[];

  /**
   * The path of a json format file where flutter define a global constant pool. Json entry will be available as constants from the String.fromEnvironment, bool.fromEnvironment, int.fromEnvironment, and double.fromEnvironment constructors; the key and field are json values.
   */
  dartDefineFromFile: string | null;

  /**
   * The renderer implementation to use when building for the web.\nAuto - Use the HTML renderer on mobile devices, and CanvasKit on desktop devices.\nCanvasKit - Always use the CanvasKit renderer. This renderer uses WebGL and WebAssembly to render graphics.\nHTML - Always use the HTML renderer. This renderer uses a combination of HTML, CSS, SVG, 2D Canvas, and WebGL.
   */
  webRenderer: FlutterWebRenderer | null;

  /**
   * Identifier number for a user or work profile on Android only. Run \"adb shell pm list users\" for available identifiers.
   */
  deviceUser: string | null;

  /**
   * Build a custom app flavor as defined by platform-specific build setup.\nSupports the use of product flavors in Android Gradle scripts, and the use of custom Xcode schemes.
   */
  flavor: string | null;

  /**
   * A regular expression matching substrings of the names of tests to run.
   */
  name: string | null;

  /**
   * A plain-text substring of the names of tests to run.
   */
  plainName: string | null;

  /**
   * Run only tests associated with the specified tags. See: https://pub.dev/packages/test#tagging-tests
   */
  tags: string[];

  /**
   * Run only tests that do not have the specified tags. See: https://pub.dev/packages/test#tagging-tests
   */
  excludeTags: string[];

  /**
   * Start in a paused mode and wait for a debugger to connect.
   */
  startPaused: boolean | null;

  /**
   * Run skipped tests instead of skipping them.
   */
  runSkipped: boolean | null;

  /**
   * Whether to collect coverage information.
   */
  coverage: boolean | null;

  /**
   * Whether to merge coverage data with "coverage/lcov.base.info". Implies collecting coverage data. (Requires lcov.)
   */
  mergeCoverage: boolean | null;

  /**
   * Whether to collect branch coverage information. Implies collecting coverage data.
   */
  branchCoverage: boolean | null;

  /**
   * Where to store coverage information (if coverage is enabled).
   */
  coveragePath: string | null;

  /**
   * Whether "matchesGoldenFile()" calls within your test methods should update the golden files rather than test for an existing match.
   */
  updateGoldens: boolean | null;

  /**
   * The number of concurrent test processes to run. This will be ignored when running integration tests.
   */
  concurrency: number | null;

  /**
   * Whether to build the assets bundle for testing. This takes additional time before running the tests. Consider using "--no-test-assets" if assets are not required.
   */
  testAssets: boolean | null;

  /**
   * The seed to randomize the execution order of test cases within test files. Must be a 32bit unsigned integer or the string "random", which indicates that a seed should be selected randomly. By default, tests run in the order they are declared.
   */
  testRandomizeOrderingSeed: string | null;

  /**
   * Tests can be sharded with the "--total-shards" and "--shard-index" arguments, allowing you to split up your test suites and run them separately.
   */
  totalShards: number | null;

  /**
   * Tests can be sharded with the "--total-shards" and "--shard-index" arguments, allowing you to split up your test suites and run them separately.
   */
  shardIndex: number | null;

  /**
   * Set how to print test results. If unset, value will default to either compact or expanded.
   */
  reporter: FlutterTestReporter | null;

  /**
   * The default test timeout, specified either in seconds (e.g. "60s"), as a multiplier of the default timeout (e.g. "2x"), or as the string "none" to disable the timeout entirely.
   */
  timeout: string | null;

  /**
   * When this value is provided, the Dart Development Service (DDS) will be bound to the provided port. Specifying port 0 (the default) will find a random free port.
   */
  ddsPort: number | null;
}
