import { FlutterBuildMode } from '../../types';
import { FlutterExecutorOptions } from '../../lib/models/flutter-executor-options.model';

/**
 * Flutter install Nx executor options.
 *
 * These are specific options passed to the `flutter install` command.
 */
export interface FlutterInstallExecutorOptions extends FlutterExecutorOptions {
  /**
   * Target device id or name (prefixes allowed).
   */
  deviceId?: string;

  /**
   * Application build mode.
   */
  mode: FlutterBuildMode;

  /**
   * Specify a pre-built application binary to use when running. For Android applications, this must be the path to an APK. For iOS applications, the path to an IPA.\nOther device types do not yet support prebuilt application binaries.
   */
  useApplicationBinary?: string;

  /**
   * Build a custom app flavor as defined by platform-specific build setup.\nSupports the use of product flavors in Android Gradle scripts, and the use of custom Xcode schemes.
   */
  flavor: string;

  /**
   * Time in seconds to wait for devices to attach. Longer timeouts may be necessary for networked devices.
   */
  deviceTimeout?: number;

  /**
   * Identifier number for a user or work profile on Android only. Run \"adb shell pm list users\" for available identifiers.
   */
  deviceUser?: string;

  /**
   * Uninstall the app if already on the device. Skip install.
   */
  uninstallOnly: boolean;
}
