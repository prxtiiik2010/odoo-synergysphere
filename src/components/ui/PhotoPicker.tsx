import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Camera, ImageIcon, X, MoreHorizontal } from 'lucide-react';
import { usePhotoLibrary } from '@/hooks/usePhotoLibrary';
import { cn } from '@/lib/utils';

interface PhotoPickerProps {
  currentImage?: string;
  onImageSelected: (imageDataUrl: string) => void;
  onImageRemoved?: () => void;
  className?: string;
  variant?: 'avatar' | 'card' | 'banner';
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  allowRemove?: boolean;
}

export function PhotoPicker({
  currentImage,
  onImageSelected,
  onImageRemoved,
  className,
  variant = 'avatar',
  size = 'md',
  placeholder,
  allowRemove = true
}: PhotoPickerProps) {
  const { choosePhotoSource, selectFromLibrary, takePhoto, isLoading } = usePhotoLibrary();

  const handleSelectFromLibrary = async () => {
    const image = await selectFromLibrary();
    if (image) {
      onImageSelected(image);
    }
  };

  const handleTakePhoto = async () => {
    const image = await takePhoto();
    if (image) {
      onImageSelected(image);
    }
  };

  const handleChooseSource = async () => {
    const image = await choosePhotoSource();
    if (image) {
      onImageSelected(image);
    }
  };

  const handleRemoveImage = () => {
    onImageRemoved?.();
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return variant === 'avatar' ? 'h-12 w-12' : 'h-20 w-20';
      case 'lg':
        return variant === 'avatar' ? 'h-32 w-32' : 'h-48 w-48';
      default:
        return variant === 'avatar' ? 'h-20 w-20' : 'h-32 w-32';
    }
  };

  if (variant === 'avatar') {
    return (
      <div className={cn('relative group', className)}>
        <Avatar className={getSizeClasses()}>
          <AvatarImage src={currentImage} />
          <AvatarFallback>
            <ImageIcon className="h-6 w-6 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="absolute -bottom-2 -right-2 h-8 w-8 p-0 shadow-md"
              disabled={isLoading}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleChooseSource} disabled={isLoading}>
              <Camera className="mr-2 h-4 w-4" />
              Choose Source
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSelectFromLibrary} disabled={isLoading}>
              <ImageIcon className="mr-2 h-4 w-4" />
              Photo Library
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleTakePhoto} disabled={isLoading}>
              <Camera className="mr-2 h-4 w-4" />
              Take Photo
            </DropdownMenuItem>
            {currentImage && allowRemove && (
              <DropdownMenuItem 
                onClick={handleRemoveImage}
                className="text-destructive"
              >
                <X className="mr-2 h-4 w-4" />
                Remove Photo
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={cn('relative group', className)}>
        <div className={cn(
          'rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/50 overflow-hidden',
          getSizeClasses()
        )}>
          {currentImage ? (
            <img 
              src={currentImage} 
              alt="Selected" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-4">
              <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {placeholder || 'Add Image'}
              </p>
            </div>
          )}
        </div>

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 shadow-md bg-background"
                disabled={isLoading}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleChooseSource} disabled={isLoading}>
                <Camera className="mr-2 h-4 w-4" />
                Choose Source
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSelectFromLibrary} disabled={isLoading}>
                <ImageIcon className="mr-2 h-4 w-4" />
                Photo Library
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleTakePhoto} disabled={isLoading}>
                <Camera className="mr-2 h-4 w-4" />
                Take Photo
              </DropdownMenuItem>
              {currentImage && allowRemove && (
                <DropdownMenuItem 
                  onClick={handleRemoveImage}
                  className="text-destructive"
                >
                  <X className="mr-2 h-4 w-4" />
                  Remove Photo
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }

  // Banner variant
  return (
    <div className={cn('relative group', className)}>
      <div className="w-full h-32 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/50 overflow-hidden">
        {currentImage ? (
          <img 
            src={currentImage} 
            alt="Banner" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center p-4">
            <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              {placeholder || 'Add Banner Image'}
            </p>
          </div>
        )}
      </div>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 shadow-md bg-background"
              disabled={isLoading}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleChooseSource} disabled={isLoading}>
              <Camera className="mr-2 h-4 w-4" />
              Choose Source
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSelectFromLibrary} disabled={isLoading}>
              <ImageIcon className="mr-2 h-4 w-4" />
              Photo Library
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleTakePhoto} disabled={isLoading}>
              <Camera className="mr-2 h-4 w-4" />
              Take Photo
            </DropdownMenuItem>
            {currentImage && allowRemove && (
              <DropdownMenuItem 
                onClick={handleRemoveImage}
                className="text-destructive"
              >
                <X className="mr-2 h-4 w-4" />
                Remove Photo
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}