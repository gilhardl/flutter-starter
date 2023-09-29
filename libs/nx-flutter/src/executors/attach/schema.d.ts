import { FlutterBuildMode } from '../../types';
import { FlutterExecutorOptions } from '../../lib/models/executors/flutter-executor-options.model';

/**
 * Flutter attach Nx executor options.
 *
 * These are specific options passed to the `flutter attach` command.
 */
export interface FlutterAttachExecutorOptions extends FlutterExecutorOptions {
  /**
   * Target device id or name (prefixes allowed).
   */
  deviceId?: string;

  /**
   * Application build mode.
   */
  mode: FlutterBuildMode;

  /**
   * The main entry-point file of the application, as run on the device. If the \"target\" option is omitted, but a file name is provided on the command line, then that is used instead. (defaults to \"lib/main.dart\")
   */
  target?: string;

  /**
   * Look for vmservice connections only from the specified port. Specifying port 0 (the default) will accept the first vmservice discovered.
   */
  deviceVmservicePort?: number;

  /**
   * When a device-side vmservice port is forwarded to a host-side port, use this value as the host port. Specifying port 0 (the default) will find a random free host port.
   */
  hostVmservicePort?: number;

  /**
   * Additional key-value pairs that will be available as constants from the String.fromEnvironment, bool.fromEnvironment, int.fromEnvironment, and double.fromEnvironment constructors.
   */
  dartDefine: string[];

  /**
   * The path of a json format file where flutter define a global constant pool. Json entry will be available as constants from the String.fromEnvironment, bool.fromEnvironment, int.fromEnvironment, and double.fromEnvironment constructors; the key and field are json values.
   */
  dartDefineFromFile?: string;

  /**
   * Identifier number for a user or work profile on Android only. Run \"adb shell pm list users\" for available identifiers.
   */
  deviceUser?: string;

  /**
   * Perform additional null assertions on the boundaries of migrated and un-migrated code. This setting is not currently supported on desktop devices.
   */
  nullAssertions: boolean;

  /**
   * The URL at which the observatory is listening.
   */
  debugUrl?: string;

  /**
   * The package name (Android) or bundle identifier (iOS) for the app. This can be specified to avoid being prompted if multiple observatory ports are advertised. If you have multiple devices or emulators running, you should include the device hostname as well, e.g. \"com.example.myApp@my-iphone\". This parameter is case-insensitive.
   */
  appId?: string;

  /**
   * Specify a file to write the process ID to. You can send SIGUSR1 to trigger a hot reload and SIGUSR2 to trigger a hot restart. The file is created when the signal handlers are hooked and deleted when they are removed.
   */
  pidFile?: string;

  /**
   * Track widget creation locations. This enables features such as the widget inspector. This parameter is only functional in debug mode (i.e. when compiling JIT, not AOT). (defaults to on)
   */
  trackWidgetCreation: boolean;

  /**
   * When this value is provided, the Dart Development Service (DDS) will be bound to the provided port. Specifying port 0 (the default) will find a random free port.
   */
  ddsPort?: number;

  /**
   * Time in seconds to wait for devices to attach. Longer timeouts may be necessary for networked devices.
   */
  deviceTimeout?: number;
}
