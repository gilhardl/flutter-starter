import { FlutterCreateOptions } from '../../lib/models/flutter-create-options.model';

export interface PluginGeneratorSchema extends FlutterCreateOptions {
  platforms: FlutterPlatform[];
  androidLanguage: AndroidLanguage;
  iosLanguage: IosLanguage;
}
