import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { StyledCard, ConfigSection } from "../ui-components";
import { StyledTabsTrigger } from "../ui-components";
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";

interface PromptConfigurationProps {
  systemPrompt: string;
  setSystemPrompt: (value: string) => void;
  userPrompt: string;
  setUserPrompt: (value: string) => void;
  qaMode: boolean;
  setQaMode: (value: boolean) => void;
  tooltips: Record<string, string>;
  promptTemplates?: Array<{ id: string; name: string; content: string }>;
  selectedPromptTemplate?: string;
  setSelectedPromptTemplate?: (value: string) => void;
  product?: { chatSettings?: { temperature?: number; maxTokens?: number } };
}

export const PromptConfiguration: React.FC<PromptConfigurationProps> = ({
  systemPrompt,
  setSystemPrompt,
  userPrompt,
  setUserPrompt,
  qaMode,
  setQaMode,
  tooltips
}) => {
  return (
    <div className="space-y-6">
      <StyledCard>
        <div className="space-y-4">
          <ConfigSection 
            title="Prompt Configuration" 
            tooltip={tooltips.qa}
            className="space-y-4"
          >
            <div className="space-y-4">
              <Tabs defaultValue="system" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <StyledTabsTrigger value="system">System Prompt</StyledTabsTrigger>
                  <StyledTabsTrigger value="user">User Prompt</StyledTabsTrigger>
                </TabsList>
                <TabsContent value="system" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="systemPrompt" className="font-comfortaa font-light text-foreground dark:text-white">System Prompt</Label>
                    <Textarea
                      id="systemPrompt"
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      placeholder="Enter system prompt"
                      className="font-comfortaa font-light min-h-[200px]"
                    />
                    <p className="text-xs font-comfortaa font-light text-muted-foreground dark:text-white/70">
                      The system prompt provides context and instructions to the AI model
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="user" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="userPrompt" className="font-comfortaa font-light text-foreground dark:text-white">User Prompt</Label>
                    <Textarea
                      id="userPrompt"
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      placeholder="Enter user prompt"
                      className="font-comfortaa font-light min-h-[200px]"
                    />
                    <p className="text-xs font-comfortaa font-light text-muted-foreground dark:text-white/70">
                      The user prompt is the initial message sent to the AI model
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="flex items-center justify-between">
                <Label htmlFor="qaMode" className="font-comfortaa font-light text-foreground dark:text-white">Q&A Mode</Label>
                <Switch
                  id="qaMode"
                  checked={qaMode}
                  onCheckedChange={setQaMode}
                />
              </div>
              <p className="text-sm font-comfortaa font-light text-muted-foreground dark:text-white/70">
                {qaMode ? "Q&A mode is enabled. The AI will focus on answering questions directly." : "Q&A mode is disabled. The AI will engage in conversational interactions."}
              </p>
            </div>
          </ConfigSection>
        </div>
      </StyledCard>
    </div>
  );
};

export default PromptConfiguration;
