import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Plus, X } from "lucide-react";
import { FormField } from "../ui-components/FormField";
import { ListItem } from "../ui-components/ListItem";
import { StyledCard } from "../ui-components/StyledCard";
import { ConfigSection } from "../ui-components/ConfigSection";
import { QAPair } from "../types";

interface QAPairsTabProps {
  qaPairs: QAPair[];
  newQA: { question: string; answer: string };
  onQuestionChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onAnswerChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAddQAPair: () => void;
  onRemoveQAPair: (id: string) => void;
  tooltips: Record<string, string>;
}

/**
 * QA Pairs Tab for managing knowledge base question and answer pairs
 */
const QAPairsTab: React.FC<QAPairsTabProps> = ({
  qaPairs,
  newQA,
  onQuestionChange,
  onAnswerChange,
  onAddQAPair,
  onRemoveQAPair,
  tooltips
}) => {
  const [showQAForm, setShowQAForm] = useState(false);

  // Cancel adding a new QA pair and reset the form
  const handleCancelQAForm = () => {
    setShowQAForm(false);
  };

  return (
    <div className="space-y-6 bg-background dark:bg-secondary p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-comfortaa font-light text-foreground dark:text-white">Q&A Pairs</h4>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="h-5 w-5 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                >
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground dark:text-white/50" />
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="max-w-[280px] p-4 text-sm font-comfortaa font-light leading-6 rounded-xl bg-background dark:bg-card border border-border shadow-md whitespace-normal"
              >
                {tooltips.qa}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button 
          onClick={() => setShowQAForm(true)}
          className="font-comfortaa font-light rounded-xl"
        >
          Add Q&A Pair
        </Button>
      </div>

      {/* Form to add a new QA pair */}
      {showQAForm && (
        <StyledCard className="p-4">
          <div className="space-y-3">
            <FormField label="Question">
              <Input
                placeholder="Enter a question your users might ask"
                value={newQA.question}
                onChange={onQuestionChange}
                className="font-comfortaa font-light rounded-xl text-foreground dark:text-white"
              />
            </FormField>

            <FormField label="Answer">
              <Textarea
                placeholder="Enter the answer to provide"
                value={newQA.answer}
                onChange={onAnswerChange}
                className="font-comfortaa font-light rounded-xl text-foreground dark:text-white"
                rows={3}
              />
            </FormField>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelQAForm}
                className="font-comfortaa font-light"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={onAddQAPair}
                className="font-comfortaa font-light"
                disabled={!newQA.question.trim() || !newQA.answer.trim()}
              >
                Add
              </Button>
            </div>
          </div>
        </StyledCard>
      )}

      {/* List of QA pairs */}
      {qaPairs.length > 0 ? (
        <div className="space-y-4">
          {qaPairs.map((qa) => (
            <ListItem 
              key={qa.id} 
              onRemove={() => onRemoveQAPair(qa.id)}
              className="flex-col items-start"
            >
              <div className="w-full">
                <p className="font-semibold mb-1 text-foreground dark:text-white">{qa.question}</p>
                <p className="text-muted-foreground dark:text-white/70">{qa.answer}</p>
              </div>
            </ListItem>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground dark:text-white/70">
          No Q&A pairs yet. Add some to help your AI assistant answer common questions.
        </p>
      )}

      {/* Help section */}
      <div className="p-4 rounded-lg border border-border bg-background/50 dark:bg-secondary/50">
        <div className="flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-muted-foreground dark:text-white/50 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium mb-1 text-foreground dark:text-white">Why add Q&A pairs?</h4>
            <p className="text-sm text-muted-foreground dark:text-white/70">
              Q&A pairs help your AI assistant provide consistent and accurate answers to common questions.
              They're especially useful for domain-specific knowledge that might not be covered in the AI's
              training data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAPairsTab;
