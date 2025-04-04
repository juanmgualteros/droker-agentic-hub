import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { StyledCard, ConfigSection } from "../ui-components";
import { StyledTabsTrigger } from "../ui-components";
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";
import { HexColorPicker } from "react-colorful";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChatAppearanceProps {
  primaryColor: string;
  setPrimaryColor: (value: string) => void;
  secondaryColor: string;
  setSecondaryColor: (value: string) => void;
  fontFamily: string;
  setFontFamily: (value: string) => void;
  fontSize: string;
  setFontSize: (value: string) => void;
  isPrivateChat: boolean;
  setIsPrivateChat: (value: boolean) => void;
  tooltips: Record<string, string>;
}

const ChatAppearance: React.FC<ChatAppearanceProps> = ({
  primaryColor,
  setPrimaryColor,
  secondaryColor,
  setSecondaryColor,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  isPrivateChat,
  setIsPrivateChat,
  tooltips
}) => {
  return (
    <div className="space-y-6">
      <StyledCard>
        <div className="space-y-4">
          <ConfigSection 
            title="Chat Appearance" 
            tooltip="Customize the look and feel of your chat interface"
            className="space-y-4"
          >
            <div className="space-y-6">
              {/* Colors Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-comfortaa font-medium text-foreground dark:text-white">Colors</h4>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="font-comfortaa font-light text-foreground dark:text-white">Primary Color</Label>
                    <div className="flex flex-col items-center gap-3">
                      <div 
                        className="h-10 w-full rounded-md border border-border"
                        style={{ backgroundColor: primaryColor }}
                      />
                      <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
                      <div className="w-full text-center font-mono text-xs text-muted-foreground dark:text-white/70">
                        {primaryColor}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="font-comfortaa font-light text-foreground dark:text-white">Secondary Color</Label>
                    <div className="flex flex-col items-center gap-3">
                      <div 
                        className="h-10 w-full rounded-md border border-border"
                        style={{ backgroundColor: secondaryColor }}
                      />
                      <HexColorPicker color={secondaryColor} onChange={setSecondaryColor} />
                      <div className="w-full text-center font-mono text-xs text-muted-foreground dark:text-white/70">
                        {secondaryColor}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-comfortaa font-medium text-foreground dark:text-white">Typography</h4>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fontFamily" className="font-comfortaa font-light text-foreground dark:text-white">Font Family</Label>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger id="fontFamily" className="font-comfortaa font-light">
                        <SelectValue placeholder="Select font family" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="opensans">Open Sans</SelectItem>
                        <SelectItem value="lato">Lato</SelectItem>
                        <SelectItem value="comfortaa">Comfortaa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fontSize" className="font-comfortaa font-light text-foreground dark:text-white">Font Size</Label>
                    <Select value={fontSize} onValueChange={setFontSize}>
                      <SelectTrigger id="fontSize" className="font-comfortaa font-light">
                        <SelectValue placeholder="Select font size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="md">Medium</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Layout Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-comfortaa font-medium text-foreground dark:text-white">Layout & Access</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isPrivateChat" className="font-comfortaa font-light text-foreground dark:text-white">Private Chat</Label>
                    <Switch
                      id="isPrivateChat"
                      checked={isPrivateChat}
                      onCheckedChange={setIsPrivateChat}
                    />
                  </div>
                  <p className="text-sm font-comfortaa font-light text-muted-foreground dark:text-white/70">
                    {isPrivateChat ? "Users must be authenticated to access the chat" : "Chat is publicly accessible"}
                  </p>
                </div>
              </div>

              {/* Preview Section */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-comfortaa font-medium text-foreground dark:text-white">Preview</h4>
                </div>
                <div className="rounded-xl border border-border overflow-hidden">
                  <div className="bg-background dark:bg-card p-4 border-b border-border">
                    <div className="font-medium" style={{ fontFamily: fontFamily === 'comfortaa' ? 'Comfortaa' : fontFamily }}>
                      Chat Preview
                    </div>
                  </div>
                  <div className="p-4 space-y-4 bg-background dark:bg-card/50">
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-2 items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                        <div 
                          className="p-3 rounded-xl max-w-[80%] bg-gray-100 dark:bg-gray-800" 
                          style={{ 
                            fontFamily: fontFamily === 'comfortaa' ? 'Comfortaa' : fontFamily,
                            fontSize: fontSize === 'sm' ? '0.875rem' : fontSize === 'md' ? '1rem' : '1.125rem'
                          }}
                        >
                          Hello! How can I help you today?
                        </div>
                      </div>
                      <div className="flex gap-2 items-start justify-end">
                        <div 
                          className="p-3 rounded-xl max-w-[80%] text-white" 
                          style={{ 
                            backgroundColor: primaryColor,
                            fontFamily: fontFamily === 'comfortaa' ? 'Comfortaa' : fontFamily,
                            fontSize: fontSize === 'sm' ? '0.875rem' : fontSize === 'md' ? '1rem' : '1.125rem'
                          }}
                        >
                          I have a question about your services.
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ConfigSection>
        </div>
      </StyledCard>
    </div>
  );
};

export default ChatAppearance;
