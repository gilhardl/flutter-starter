import { FlutterBuildMode, FlutterWebRenderer } from '../types';
import { FlutterExecutorOptionsNormalized } from './flutter-executor-options.model';

/**
 * Normalized options passed to the `flutter run` command.
 */
export interface FlutterRunExecutorOptionsNormalized
  extends FlutterExecutorOptionsNormalized {
  /**
   * Target device id or name (prefixes allowed).
   */
  deviceId: string | null;

  /**
   * Application build mode.
   */
  mode: FlutterBuildMode | null;

  /**
   * Additional key-value pairs that will be available as constants from the String.fromEnvironment, bool.fromEnvironment, int.fromEnvironment, and double.fromEnvironment constructors.
   */
  dartDefine: string[] | null;

  /**
   * The path of a json format file where flutter define a global constant pool. Json entry will be available as constants from the String.fromEnvironment, bool.fromEnvironment, int.fromEnvironment, and double.fromEnvironment constructors; the key and field are json values.
   */
  dartDefineFromFile: string | null;

  /**
   * Build a custom app flavor as defined by platform-specific build setup. Supports the use of product flavors in Android Gradle scripts, and the use of custom Xcode schemes.
   */
  flavor: boolean | null;

  /**
   * The renderer implementation to use when building for the web.\nAuto - Use the HTML renderer on mobile devices, and CanvasKit on desktop devices.\nCanvasKit - Always use the CanvasKit renderer. This renderer uses WebGL and WebAssembly to render graphics.\nHTML - Always use the HTML renderer. This renderer uses a combination of HTML, CSS, SVG, 2D Canvas, and WebGL.
   */
  webRenderer: FlutterWebRenderer | null;

  /**
   * Specify a pre-built application binary to use when running. For Android applications, this must be the path to an APK. For iOS applications, the path to an IPA. Other device types do not yet support prebuilt application binaries.
   */
  useApplicationBinary: string | null;

  /**
   * Trace application startup, then exit, saving the trace to a file. By default, this will be saved in the \"build\" directory. If the FLUTTER_TEST_OUTPUTS_DIR environment variable is set, the file will be written there instead.
   */
  traceStartup: boolean | null;

  /**
   * Caches the CPU profile collected before the first frame for startup analysis.
   */
  cacheStartupProfile: boolean | null;

  /**
   * Include verbose logging from the Flutter engine.
   */
  verboseSystemLogs: boolean | null;

  /**
   * Cache the shader in the SkSL format instead of in binary or GLSL formats.
   */
  cacheSksl: boolean | null;

  /**
   * Automatically dump the skp that triggers new shader compilations. This is useful for writing custom ShaderWarmUp to reduce jank. By default, this is not enabled as it introduces significant overhead. This is only available in profile or debug builds.
   */
  dumpSkpOnShaderCompilation: boolean | null;

  /**
   * Removes all existing persistent caches. This allows reproducing shader compilation jank that normally only happens the first time an app is run, or for reliable testing of compilation jank fixes (e.g. shader warm-up).
   */
  purgePersistentCache: boolean | null;

  /**
   * Which route to load when running the app.
   */
  route: string | null;

  /**
   * Start in a paused mode and wait for a debugger to connect.
   */
  startPaused: boolean | null;

  /**
   * Enable tracing to an infinite buffer, instead of a ring buffer. This is useful when recording large traces. To use an endless buffer to record startup traces, combine this with \"traceStartup\".
   */
  endlessTraceBuffer: boolean | null;

  /**
   * Enable tracing to the system tracer. This is only useful on platforms where such a tracer is available (Android, iOS, macOS and Fuchsia).
   */
  traceSystrace: boolean | null;

  /**
   * Enable tracing of Skia code. This is useful when debugging the raster thread (formerly known as the GPU thread). By default, Flutter will not log Skia code, as it introduces significant overhead that may affect recorded performance metrics in a misleading way.
   */
  traceSkia: boolean | null;

  /**
   * Whether the Dart VM sampling CPU profiler is enabled. This flag is only meaningnful in debug and profile builds. (defaults to on)
   */
  enableDartProfiling: boolean | null;

  /**
   * Enable rendering using the Skia software backend. This is useful when testing Flutter on emulators. By default, Flutter will attempt to either use OpenGL or Vulkan and fall back to software when neither is available.
   */
  enableSoftwareRendering: boolean | null;

  /**
   * When combined with \"enableSoftwareRendering\", this should provide completely deterministic (i.e. reproducible) Skia rendering. This is useful for testing purposes (e.g. when comparing screenshots).
   */
  skiaDeterministicRendering: boolean | null;

  /**
   * Pass a list of arguments to the Dart entrypoint at application startup. By default this is main(List<String> args). Specify this option multiple times each with one argument to pass multiple arguments to the Dart entrypoint. Currently this is only supported on desktop platforms.
   */
  dartEntrypointArgs: string[];

  /**
   * The URL to provide to the browser. Defaults to an HTTP URL with the host name of \"--web-hostname\", the port of \"--web-port\", and the path set to \"/\".
   */
  webLaunchUrl: string | null;

  /**
   * The main entry-point file of the application, as run on the device. If the \"target\" option is omitted, but a file name is provided on the command line, then that is used instead. (defaults to \"lib/main.dart\")
   */
  target: string | null;

  /**
   * Look for vmservice connections only from the specified port. Specifying port 0 (the default) will accept the first vmservice discovered.
   */
  deviceVmservicePort: number | null;

  /**
   * When a device-side vmservice port is forwarded to a host-side port, use this value as the host port. Specifying port 0 (the default) will find a random free host port.
   */
  hostVmservicePort: number | null;

  /**
   * Whether to run \"flutter pub get\" before executing this command. (defaults to on)
   */
  pub: boolean | null;

  /**
   * Track widget creation locations. This enables features such as the widget inspector. This parameter is only functional in debug mode (i.e. when compiling JIT, not AOT). (defaults to on)
   */
  trackWidgetCreation: boolean | null;

  /**
   * Perform additional null assertions on the boundaries of migrated and un-migrated code. This setting is not currently supported on desktop devices.
   */
  nullAssertions: boolean | null;

  /**
   * Identifier number for a user or work profile on Android only. Run \"adb shell pm list users\" for available identifiers.
   */
  deviceUser: string | null;

  /**
   * Time in seconds to wait for devices to attach. Longer timeouts may be necessary for networked devices.
   */
  deviceTimeout: number | null;

  /**
   * When this value is provided, the Dart Development Service (DDS) will be bound to the provided port. Specifying port 0 (the default) will find a random free port.
   */
  ddsPort: number | null;

  /**
   * Additional arguments specified as key=value that are passed directly to the gradle project via the -P flag. These can be accessed in build.gradle via the \"project.property\" API.
   */
  androidProjectArg: string[] | null;

  /**
   * When enabled, indicates that the app should be built with multidex support. This flag adds the dependencies for multidex when the minimum android sdk is 20 or below. For android sdk versions 21 and above, multidex support is native. (defaults to on)
   */
  multidex: boolean | null;

  /**
   * Indicates that the app should ignore deprecation warnings and continue to build using deprecated APIs. Use of this flag may cause your app to fail to build when deprecated APIs are removed.
   */
  ignoreDeprecation: boolean | null;

  /**
   * Whether to wait for the first frame when tracing startup (\"traceStartup\"), or just dump the trace as soon as the application is running. The first frame is detected by looking for a Timeline event with the name \"Rasterized first useful frame\". By default, the widgets library's binding takes care of sending this event. (defaults to on)
   */
  awaitFirstFrameWhenTracing: boolean | null;

  /**
   * Enable (and default to) the \"Ahem\" font. This is a special font used in tests to remove any dependencies on the font metrics. It is enabled when you use \"flutter test\". Set this flag when running a test using \"flutter run\" for debugging purposes. This flag is only available when running in debug mode.
   */
  useTestFonts: boolean | null;

  /**
   * If necessary, build the app before running. (defaults to on)
   */
  build: boolean | null;

  /**
   * Run with support for hot reloading. Only available for debug mode. Not available with \"traceStartup\". (defaults to on)
   */
  hot: boolean | null;

  /**
   * Specify a file to write the process ID to. You can send SIGUSR1 to trigger a hot reload and SIGUSR2 to trigger a hot restart. The file is created when the signal handlers are hooked and deleted when they are removed.
   */
  pidFile: string | null;
}
