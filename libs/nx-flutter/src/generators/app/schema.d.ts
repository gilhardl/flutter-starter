import { FlutterPlatform, AndroidLanguage, IosLanguage } from '../../types';
import { FlutterCreateOptions } from '../../lib/models/flutter-create-options.model';

export interface AppGeneratorSchema extends FlutterCreateOptions {
  empty: boolean;
  platforms: FlutterPlatform[];
  androidLanguage: AndroidLanguage;
  iosLanguage: IosLanguage;
}
