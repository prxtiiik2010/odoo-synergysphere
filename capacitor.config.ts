import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c0571377db5148dfbc58f5f177570bbf',
  appName: 'synergy-spark-ui-37',
  webDir: 'dist',
  server: {
    url: 'https://c0571377-db51-48df-bc58-f5f177570bbf.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: {
        camera: 'Camera access is required to take photos',
        photos: 'Photo library access is required to select images'
      }
    }
  }
};

export default config;