import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { HelpCircle } from "lucide-react";
import { StyledCard } from "../ui-components";
import { ConfigSection } from "../ui-components";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface GeneralSettingsProps {
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  tooltips: Record<string, string>;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  name,
  setName,
  description,
  setDescription,
  isActive,
  setIsActive,
  tooltips
}) => {
  return (
    <div className="space-y-6">
      <StyledCard>
        <div className="space-y-4">
          <ConfigSection 
            title="General Information" 
            tooltip="Basic information about your AI assistant"
            className="space-y-4"
          >
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-comfortaa font-light text-foreground dark:text-white">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product name"
                  className="font-comfortaa font-light"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="font-comfortaa font-light text-foreground dark:text-white">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter product description"
                  className="font-comfortaa font-light min-h-[100px]"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive" className="font-comfortaa font-light text-foreground dark:text-white">Active</Label>
                <Switch
                  id="isActive"
                  checked={isActive}
                  onCheckedChange={setIsActive}
                />
              </div>
              <p className="text-sm font-comfortaa font-light text-muted-foreground dark:text-white/70">
                {isActive ? "This product is active and visible to users" : "This product is inactive and hidden from users"}
              </p>
            </div>
          </ConfigSection>
        </div>
      </StyledCard>
    </div>
  );
};

export default GeneralSettings;
