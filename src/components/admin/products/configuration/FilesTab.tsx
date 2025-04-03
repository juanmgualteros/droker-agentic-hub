import React from 'react';
import { FileUploader } from './FileUploader';
import { ConfigSection } from "../ui-components";

interface FilesTabProps {
  files: Array<File | string>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: (index: number) => void;
  tooltips: Record<string, string>;
}

export const FilesTab: React.FC<FilesTabProps> = ({
  files,
  handleFileChange,
  handleRemoveFile,
  tooltips
}) => {
  return (
    <div className="space-y-4">
      <ConfigSection 
        title="Document Files" 
        tooltip={tooltips.files}
      >
        <FileUploader 
          files={files}
          onAddFiles={(files: FileList | null) => {
            if (files) {
              const syntheticEvent = { target: { files } } as React.ChangeEvent<HTMLInputElement>;
              handleFileChange(syntheticEvent);
            }
          }}
          onRemoveFile={handleRemoveFile}
          accept=".pdf,.doc,.docx,.txt"
          multiple={true}
        />
      </ConfigSection>
    </div>
  );
};

export default FilesTab;
