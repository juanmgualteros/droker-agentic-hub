import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { StyledCard, ConfigSection } from "../ui-components";
import { Plus, Trash2 } from "lucide-react";

interface SourcesConfigurationProps {
  sources: { id: string; name: string; url: string; isActive: boolean }[];
  addSource: () => void;
  removeSource: (id: string) => void;
  updateSource: (id: string, field: string, value: any) => void;
  tooltips: Record<string, string>;
}

const SourcesConfiguration: React.FC<SourcesConfigurationProps> = ({
  sources,
  addSource,
  removeSource,
  updateSource,
  tooltips
}) => {
  return (
    <div className="space-y-6">
      <StyledCard>
        <div className="space-y-4">
          <ConfigSection 
            title="Knowledge Sources" 
            tooltip="Configure the data sources for your AI assistant"
            className="space-y-4"
          >
            <div className="space-y-4">
              {sources.map((source) => (
                <div key={source.id} className="grid grid-cols-[1fr_auto] gap-4 items-start p-4 rounded-xl border border-border bg-background dark:bg-card/50">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`source-name-${source.id}`} className="font-comfortaa font-light text-foreground dark:text-white">Source Name</Label>
                      <Input
                        id={`source-name-${source.id}`}
                        value={source.name}
                        onChange={(e) => updateSource(source.id, 'name', e.target.value)}
                        placeholder="Enter source name"
                        className="font-comfortaa font-light"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`source-url-${source.id}`} className="font-comfortaa font-light text-foreground dark:text-white">URL</Label>
                      <Input
                        id={`source-url-${source.id}`}
                        value={source.url}
                        onChange={(e) => updateSource(source.id, 'url', e.target.value)}
                        placeholder="https://example.com"
                        className="font-comfortaa font-light"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`source-active-${source.id}`} className="font-comfortaa font-light text-foreground dark:text-white">Active</Label>
                      <Switch
                        id={`source-active-${source.id}`}
                        checked={source.isActive}
                        onCheckedChange={(checked) => updateSource(source.id, 'isActive', checked)}
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSource(source.id)}
                    className="h-8 w-8 mt-1 text-muted-foreground dark:text-white/50 hover:text-destructive dark:hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addSource}
                className="w-full font-comfortaa font-light rounded-xl"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Source
              </Button>
            </div>
          </ConfigSection>
        </div>
      </StyledCard>
    </div>
  );
};

export default SourcesConfiguration;
