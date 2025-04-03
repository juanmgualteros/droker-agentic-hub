import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { ConfigSection } from "../ui-components";

interface WebsitesTabProps {
  websites: string[];
  addWebsite: (website: string) => void;
  removeWebsite: (index: number) => void;
  tooltips: Record<string, string>;
}

export const WebsitesTab: React.FC<WebsitesTabProps> = ({
  websites,
  addWebsite,
  removeWebsite,
  tooltips
}) => {
  const [websiteInput, setWebsiteInput] = useState('');

  const handleAddWebsite = () => {
    if (websiteInput.trim()) {
      addWebsite(websiteInput.trim());
      setWebsiteInput('');
    }
  };

  return (
    <div className="space-y-4">
      <ConfigSection 
        title="Website Sources" 
        tooltip={tooltips.websites}
      >
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="Enter website URL"
            value={websiteInput}
            onChange={(e) => setWebsiteInput(e.target.value)}
            className="font-comfortaa font-light rounded-xl"
          />
          <Button 
            onClick={handleAddWebsite}
            className="font-comfortaa font-light rounded-xl"
          >
            Add
          </Button>
        </div>

        {websites.length > 0 && (
          <div className="space-y-2 mt-4">
            {websites.map((website, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-accent/20 dark:bg-accent/10 rounded-xl">
                <span className="text-sm font-comfortaa font-light text-foreground dark:text-white">{website}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeWebsite(index)}
                  className="h-8 w-8 p-0 hover:bg-transparent hover:text-red-600 rounded-xl"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </ConfigSection>
    </div>
  );
};

export default WebsitesTab;
