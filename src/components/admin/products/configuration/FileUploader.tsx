import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface FileUploaderProps {
  files: Array<File | string>;
  onAddFiles: (files: FileList) => void;
  onRemoveFile: (index: number) => void;
  accept?: string;
  multiple?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  onAddFiles,
  onRemoveFile,
  accept = '.pdf,.doc,.docx,.txt',
  multiple = true
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFiles(e.target.files);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
        multiple={multiple}
        accept={accept}
      />
      <label htmlFor="file-upload">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full font-comfortaa font-light border-border dark:border-border hover:bg-accent dark:hover:bg-accent rounded-xl" 
          asChild
        >
          <span>Upload Files</span>
        </Button>
      </label>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-accent/20 dark:bg-accent/10 rounded-xl">
              <span className="text-sm font-comfortaa font-light text-foreground dark:text-white">
                {typeof file === 'string' ? file : file.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFile(index)}
                className="h-8 w-8 p-0 hover:bg-transparent hover:text-red-600 rounded-xl"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
