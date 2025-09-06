import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { toast } from 'sonner';

export interface PhotoOptions {
  quality?: number;
  allowEditing?: boolean;
  resultType?: CameraResultType;
}

export const usePhotoLibrary = () => {
  const [isLoading, setIsLoading] = useState(false);

  const selectFromLibrary = async (options: PhotoOptions = {}) => {
    if (!Capacitor.isNativePlatform()) {
      // Fallback for web - create file input
      return new Promise<string | null>((resolve) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              resolve(e.target?.result as string);
            };
            reader.readAsDataURL(file);
          } else {
            resolve(null);
          }
        };
        input.oncancel = () => resolve(null);
        input.click();
      });
    }

    try {
      setIsLoading(true);
      
      const image = await Camera.getPhoto({
        quality: options.quality || 90,
        allowEditing: options.allowEditing || true,
        resultType: options.resultType || CameraResultType.DataUrl,
        source: CameraSource.Photos, // Only photo library
      });

      return image.dataUrl || null;
    } catch (error) {
      console.error('Error selecting photo:', error);
      toast.error('Failed to select photo from library');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const takePhoto = async (options: PhotoOptions = {}) => {
    if (!Capacitor.isNativePlatform()) {
      toast.error('Camera is only available on mobile devices');
      return null;
    }

    try {
      setIsLoading(true);
      
      const image = await Camera.getPhoto({
        quality: options.quality || 90,
        allowEditing: options.allowEditing || true,
        resultType: options.resultType || CameraResultType.DataUrl,
        source: CameraSource.Camera, // Camera only
      });

      return image.dataUrl || null;
    } catch (error) {
      console.error('Error taking photo:', error);
      toast.error('Failed to take photo');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const choosePhotoSource = async (options: PhotoOptions = {}) => {
    if (!Capacitor.isNativePlatform()) {
      return selectFromLibrary(options);
    }

    try {
      setIsLoading(true);
      
      const image = await Camera.getPhoto({
        quality: options.quality || 90,
        allowEditing: options.allowEditing || true,
        resultType: options.resultType || CameraResultType.DataUrl,
        source: CameraSource.Prompt, // Let user choose between camera and library
      });

      return image.dataUrl || null;
    } catch (error) {
      console.error('Error selecting photo source:', error);
      toast.error('Failed to select photo');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    selectFromLibrary,
    takePhoto,
    choosePhotoSource,
    isLoading
  };
};