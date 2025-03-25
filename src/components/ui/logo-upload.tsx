'use client';

import { ChangeEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Image from "next/image";

interface LogoUploadProps {
  currentLogo?: string;
  onUpload: (file: File) => Promise<void>;
  label: string;
}

export function LogoUpload({ currentLogo, onUpload, label }: LogoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await onUpload(file);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleClick}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload Logo
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex items-center justify-center border-2 border-dashed border-muted rounded-lg p-4">
        {currentLogo ? (
          <div className="relative w-32 h-32">
            <Image
              src={currentLogo}
              alt="Company logo"
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p className="text-sm">No logo uploaded</p>
            <p className="text-xs">Recommended size: 256x256px</p>
          </div>
        )}
      </div>
    </div>
  );
} 