import { prompt } from 'enquirer';

import { FlutterCreateOptions } from '../models/flutter-create-options.model';
import { AndroidLanguage, FlutterPlatform, IosLanguage } from '../types';

/**
 * Prompt the user for the platforms the Flutter project should support.
 *
 * @param options the current options for the generator
 * @returns updated options
 */
export async function promptForPlatformOption<T extends FlutterCreateOptions>(
  options: T
): Promise<T> {
  if (process.env.NX_INTERACTIVE !== 'true') return options;
  if ('platforms' in options && !!options.platforms) return options;

  const { platforms }: { platforms: string } = await prompt([
    {
      name: 'platforms',
      type: 'multiselect',
      choices: [
        {
          name: 'android',
          value: 'Android platform',
        },
        {
          name: 'ios',
          value: 'iOS platform',
        },
        {
          name: 'linux',
          value: 'Linux platform',
        },
        {
          name: 'windows',
          value: 'Windows platform',
        },
        {
          name: 'macos',
          value: 'MacOS platform',
        },
        {
          name: 'web',
          value: 'Web platform',
        },
      ],
      validate: (platforms: string) => {
        return platforms?.length
          ? true
          : 'You must select at least one platform';
      },
      message: 'Which platforms the application support?',
    },
  ]);

  return {
    ...options,
    platforms: platforms.split(',') as FlutterPlatform[],
  };
}

/**
 * Prompt the user for the languages the Flutter project should use.
 *
 * @param options the current options for the generator
 * @returns updated options
 */
export async function promptForPlatformLanguagesOptions<
  T extends FlutterCreateOptions
>(options: T): Promise<T> {
  if (process.env.NX_INTERACTIVE !== 'true') return options;
  if (
    'androidLanguage' in options &&
    !!options.androidLanguage &&
    'iosLanguage' in options &&
    !!options.iosLanguage
  )
    return options;

  const platforms =
    'platforms' in options
      ? (options.platforms as FlutterPlatform[]) ?? []
      : [];

  const {
    languages,
  }: {
    languages: { androidLanguage: AndroidLanguage; iosLanguage: IosLanguage };
  } = await prompt([
    {
      skip: () =>
        ('androidLanguage' in options && !!options.androidLanguage) ||
        platforms.indexOf('android') === -1,
      name: 'androidLanguage',
      type: 'select',
      initial: 1,
      choices: [
        {
          name: 'kotlin',
          value: 'Kotlin',
        },
        {
          name: 'java',
          value: 'Java',
        },
      ],
      message: 'Which language to use for Android-specific code?',
    },
    {
      skip: () =>
        ('iosLanguage' in options && !!options.iosLanguage) ||
        platforms.indexOf('ios') === -1,
      name: 'iosLanguage',
      type: 'select',
      initial: 1,
      choices: [
        {
          name: 'swift',
          value: 'Swift',
        },
        {
          name: 'objc',
          value: 'Objective-C',
        },
      ],
      message: 'Which language to use for iOS-specific code?',
    },
  ]);

  return {
    ...options,
    androidLanguage: languages?.androidLanguage,
    iosLanguage: languages?.iosLanguage,
  };
}
