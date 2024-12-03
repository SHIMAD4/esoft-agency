import { ExpoConfig, ConfigContext } from '@expo/config';
import * as dotenv from 'dotenv';

dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'esoft-agency',
  name: 'Esoft Agency',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.fireruviy.esoftagency',
  },
  android: {
    package: 'com.fireruviy.esoftagency',
    versionCode: 1,
    permissions: ['CAMERA', 'WRITE_EXTERNAL_STORAGE', 'READ_EXTERNAL_STORAGE'],
    adaptiveIcon: {
      foregroundImage: './assets/icons/logo.jpg',
      backgroundColor: '#ffffff',
    },
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_CLOUD_API_KEY,
      },
    },
  },
  extra: {
    eas: {
      projectId: 'd9ee2e61-321b-42b8-9ef2-c65d0357c76a',
    },
    apiUrl: process.env.API_URL,
  },
});
