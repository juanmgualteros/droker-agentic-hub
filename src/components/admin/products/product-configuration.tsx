"use client";

import * as React from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Save, X, Mic, HelpCircle } from "lucide-react";
import { StyledTabsTrigger, StyledCard, ConfigSection } from "./ui-components";
import {
  GeneralSettings,
  SourcesConfiguration,
  PromptConfiguration,
  ChatAppearance,
  UsageAnalytics,
  UserManagement,
  FilesTab,
  WebsitesTab,
  QAPairsTab
} from "./configuration";

interface ProductConfigurationProps {
  productId: string;
}

interface QAPair {
  id: string;
  question: string;
  answer: string;
}

interface Source {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
}

const handleBulkImport = () => console.log('Bulk import users');

function ProductConfiguration({ productId }: ProductConfigurationProps) {
  // Tab state
  const [activeTab, setActiveTab] = useState("general");
  
  // General settings state
  const [name, setName] = useState("AI Assistant");
  const [description, setDescription] = useState("A helpful AI assistant for your organization.");
  const [isActive, setIsActive] = useState(true);
  
  // Sources state
  const [sources, setSources] = useState<Source[]>([
    { id: "1", name: "Documentation", url: "https://example.com/docs", isActive: true },
    { id: "2", name: "Knowledge Base", url: "https://example.com/kb", isActive: true }
  ]);
  const [files, setFiles] = useState<(string | File)[]>([]);
  const [websites, setWebsites] = useState<string[]>([]);
  const [qaPairs, setQaPairs] = useState<QAPair[]>([]);
  const [showQAForm, setShowQAForm] = useState(false);
  const [websiteInput, setWebsiteInput] = useState("");
  const [newQA, setNewQA] = useState<{ question: string; answer: string }>({ question: "", answer: "" });
  
  // Prompt configuration state
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful AI assistant.");
  const [userPrompt, setUserPrompt] = useState("How can I help you today?");
  const [qaMode, setQaMode] = useState(false);
  const [promptTemplates, setPromptTemplates] = useState([
    { id: "1", name: "Default", content: "You are a helpful AI assistant." },
    { id: "2", name: "Customer Support", content: "You are a customer support agent helping users with their questions." }
  ]);
  const [selectedPromptTemplate, setSelectedPromptTemplate] = useState("1");
  
  // Chat appearance state
  const [primaryColor, setPrimaryColor] = useState("#0066cc");
  const [secondaryColor, setSecondaryColor] = useState("#f3f4f6");
  const [fontFamily, setFontFamily] = useState("comfortaa");
  const [fontSize, setFontSize] = useState("md");
  const [isPrivateChat, setIsPrivateChat] = useState(false);
  
  // Product settings
  const product = {
    chatSettings: {
      temperature: 0.7,
      maxTokens: 2048
    }
  };
  
  // File handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const newFiles = Array.from(e.target.files).map(file => file.name);
      setFiles([...files, ...newFiles]);
    }
  };
  
  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  
  // Website handling
  const handleAddWebsite = () => {
    if (websiteInput.trim() && !websites.includes(websiteInput)) {
      setWebsites([...websites, websiteInput]);
      setWebsiteInput("");
    }
  };
  
  const handleRemoveWebsite = (index: number) => {
    setWebsites(websites.filter((_, i) => i !== index));
  };
  
  // QA Pair handling
  const handleAddQAPair = () => {
    if (newQA.question.trim() && newQA.answer.trim()) {
      setQaPairs([...qaPairs, { id: Date.now().toString(), ...newQA }]);
      setNewQA({ question: "", answer: "" });
      setShowQAForm(false);
    }
  };
  
  const handleRemoveQAPair = (id: string) => {
    setQaPairs(qaPairs.filter(qa => qa.id !== id));
  };

  // Source management functions
  const addSource = () => {
    const newSource = {
      id: Date.now().toString(),
      name: "",
      url: "",
      isActive: true
    };
    setSources([...sources, newSource]);
  };

  const removeSource = (id: string) => {
    setSources(sources.filter(source => source.id !== id));
  };

  const updateSource = (id: string, field: string, value: string | boolean) => {
    setSources(sources.map(source => 
      source.id === id ? { ...source, [field]: value } : source
    ));
  };
  
  // Analytics functions
  const handleExportReport = () => {
    console.log("Exporting analytics report");
    // Implementation would go here
  };

  const handleSave = () => {
    // Save configuration
    console.log("Saving configuration", {
      general: { name, description, isActive },
      sources,
      files,
      websites,
      qaPairs,
      prompt: { systemPrompt, userPrompt, qaMode },
      appearance: { primaryColor, secondaryColor, fontFamily, fontSize, isPrivateChat }
    });
  };

  const tooltips = {
    general: "Basic information about your AI assistant",
    sources: "Configure the data sources for your AI assistant",
    prompt: "Configure the prompts and behavior of your AI assistant",
    appearance: "Customize the look and feel of your chat interface",
    analytics: "View usage metrics and analytics for your AI assistant",
    systemPrompt: "Define the AI's behavior and personality when responding to questions based on the provided context.",
    files: "Upload PDF documents, Word files, or text files that the AI will use as reference material when answering questions.",
    websites: "Add website URLs that the AI will crawl and use as reference material for answering questions.",
    qa: "Create predefined question and answer pairs that the AI can use as reference material.",
    users: "Manage users who have access to this product and their permissions.",
    bulkImport: "Import multiple users at once using a CSV or Excel file.",
    chatAppearance: "Customize the look and feel of your chat interface.",
    chatPrivacy: "Control whether the chat is publicly accessible or requires authentication.",
    testChat: "Test your chat configuration in a sandbox environment.",
    liveChat: "Get shareable links and embed code for your live chat.",
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save product configuration
    console.log("Saving product configuration:", {
      productId,
      name,
      description,
      isActive,
      sources,
      files,
      websites,
      qaPairs,
      systemPrompt,
      userPrompt,
      qaMode,
      promptTemplates,
      selectedPromptTemplate,
      primaryColor,
      secondaryColor,
      fontFamily,
      fontSize,
      isPrivateChat
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-foreground">Product Configuration</h2>
        <Button type="submit" className="flex items-center gap-1">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
      
      <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-6 mb-8 bg-muted dark:bg-muted rounded-lg">
          <StyledTabsTrigger value="general">General</StyledTabsTrigger>
          <StyledTabsTrigger value="sources">Sources</StyledTabsTrigger>
          <StyledTabsTrigger value="prompt">Prompt</StyledTabsTrigger>
          <StyledTabsTrigger value="appearance">Appearance</StyledTabsTrigger>
          <StyledTabsTrigger value="analytics">Analytics</StyledTabsTrigger>
          <StyledTabsTrigger value="users">Users</StyledTabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings 
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            isActive={isActive}
            setIsActive={setIsActive}
            tooltips={tooltips}
          />
        </TabsContent>
        
        <TabsContent value="sources">
          <SourcesConfiguration 
            sources={sources}
            addSource={addSource}
            removeSource={removeSource}
            updateSource={(id, field, value) => updateSource(id, field, value)}
            tooltips={tooltips}
          />
          
          {/* We'll handle the files, websites, and QA pairs here until we fully refactor these sections */}
          <div className="space-y-8 mt-6">
            <ConfigSection title="Files" tooltip={tooltips.files}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file-upload" className="block mb-2 font-comfortaa font-light text-foreground dark:text-white">Upload Files</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="font-comfortaa font-light rounded-xl"
                  />
                </div>
                {files.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-comfortaa font-medium text-foreground dark:text-white">Uploaded Files</h4>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-accent dark:bg-accent rounded-xl">
                          <span className="text-sm font-comfortaa font-light text-foreground dark:text-white">{typeof file === 'string' ? file : file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFile(index)}
                            className="h-8 w-8 p-0 hover:bg-transparent hover:text-red-600 rounded-xl"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ConfigSection>

            <ConfigSection title="Websites" tooltip={tooltips.websites}>
              <div className="space-y-4">
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
                  <div className="space-y-2">
                    <h4 className="font-comfortaa font-medium text-foreground dark:text-white">Websites</h4>
                    <div className="space-y-2">
                      {websites.map((website, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-accent dark:bg-accent rounded-xl">
                          <span className="text-sm font-comfortaa font-light text-foreground dark:text-white">{website}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveWebsite(index)}
                            className="h-8 w-8 p-0 hover:bg-transparent hover:text-red-600 rounded-xl"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ConfigSection>

            <ConfigSection title="Q&A Pairs" tooltip={tooltips.qa}>
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button 
                    onClick={() => setShowQAForm(true)}
                    className="font-comfortaa font-light rounded-xl"
                  >
                    Add Q&A Pair
                  </Button>
                </div>

                {showQAForm && (
                  <StyledCard className="p-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="question" className="font-comfortaa font-light text-foreground dark:text-white">Question</Label>
                        <Input
                          id="question"
                          value={newQA.question}
                          onChange={(e) => setNewQA({ ...newQA, question: e.target.value })}
                          className="font-comfortaa font-light rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="answer" className="font-comfortaa font-light text-foreground dark:text-white">Answer</Label>
                        <Textarea
                          id="answer"
                          value={newQA.answer}
                          onChange={(e) => setNewQA({ ...newQA, answer: e.target.value })}
                          className="font-comfortaa font-light rounded-xl"
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowQAForm(false)}
                          className="font-comfortaa font-light rounded-xl"
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleAddQAPair}
                          className="font-comfortaa font-light rounded-xl"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </StyledCard>
                )}
                
                {qaPairs.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-comfortaa font-medium text-foreground dark:text-white">Q&A Pairs</h4>
                    <div className="space-y-4">
                      {qaPairs.map((qa) => (
                        <StyledCard key={qa.id} className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-comfortaa font-medium text-foreground dark:text-white">{qa.question}</h5>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveQAPair(qa.id)}
                              className="h-8 w-8 p-0 hover:bg-transparent hover:text-red-600 rounded-xl"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="font-comfortaa font-light text-muted-foreground dark:text-gray-300">{qa.answer}</p>
                        </StyledCard>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ConfigSection>
          </div>
        </TabsContent>

        <TabsContent value="prompt">
          <PromptConfiguration 
            systemPrompt={systemPrompt}
            setSystemPrompt={(value: string) => setSystemPrompt(value)}
            userPrompt={userPrompt}
            setUserPrompt={(value: string) => setUserPrompt(value)}
            tooltips={tooltips}
            qaMode={qaMode}
            setQaMode={setQaMode}
            promptTemplates={promptTemplates}
            selectedPromptTemplate={selectedPromptTemplate}
            setSelectedPromptTemplate={setSelectedPromptTemplate}
            product={product}
          />
        </TabsContent>
        
        <TabsContent value="appearance">
          <ChatAppearance 
            primaryColor={primaryColor}
            setPrimaryColor={setPrimaryColor}
            secondaryColor={secondaryColor}
            setSecondaryColor={setSecondaryColor}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            fontSize={fontSize}
            setFontSize={setFontSize}
            isPrivateChat={isPrivateChat}
            setIsPrivateChat={setIsPrivateChat}
            tooltips={tooltips}
          />
        </TabsContent>
        
        {/* Files Tab */}
        <TabsContent value="files">
          <FilesTab
            files={files}
            handleFileChange={handleFileChange}
            handleRemoveFile={handleRemoveFile}
            tooltips={tooltips}
          />
        </TabsContent>

                  {/* Websites Tab */}
                  <TabsContent value="websites" className="mt-6">
                    <WebsitesTab
                      websites={websites}
                      addWebsite={handleAddWebsite}
                      removeWebsite={handleRemoveWebsite}
                      tooltips={tooltips}
                    />
                  </TabsContent>

                  {/* Q&A Pairs Tab */}
                  <TabsContent value="qa" className="mt-6">
                    <QAPairsTab
                      qaPairs={qaPairs}
                      newQA={newQA}
                      onQuestionChange={(e) => setNewQA({ ...newQA, question: e.target.value })}
                      onAnswerChange={(e) => setNewQA({ ...newQA, answer: e.target.value })}
                      onAddQAPair={handleAddQAPair}
                      onRemoveQAPair={handleRemoveQAPair}
                      tooltips={tooltips}
                    />
                  </TabsContent>

        {/* Interview Me Tab */}
        <TabsContent value="interview">
          <div className="space-y-4">
            <StyledCard>
              <div className="space-y-4">
                          <p className="font-comfortaa font-light text-foreground dark:text-white">
                            Start a conversation with the AI to provide information about your company. 
                            The AI will ask questions to better understand your business context.
                          </p>
                          
                          <div className="bg-accent/20 dark:bg-accent/10 p-4 rounded-xl font-comfortaa font-light">
                            <p className="text-foreground dark:text-white mb-3">Sample questions the AI might ask:</p>
                            <ul className="space-y-2 text-muted-foreground dark:text-white/70 list-disc pl-5">
                              <li>What industry is your company in?</li>
                              <li>What products or services do you offer?</li>
                              <li>Who are your typical customers?</li>
                              <li>What are common questions your customers ask?</li>
                              <li>What tone would you like the AI to use when responding?</li>
                            </ul>
                          </div>
                          
                          <Button 
                            className="font-comfortaa font-light rounded-xl w-full"
                          >
                            <Mic className="mr-2 h-4 w-4" />
                            Start Interview
                          </Button>
              </div>
            </StyledCard>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <UsageAnalytics 
            tooltips={tooltips}
            handleExportReport={handleExportReport}
          />
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <UserManagement tooltips={tooltips} handleBulkImport={handleBulkImport} />
        </TabsContent>



      </Tabs>
    </form>
  );
}

export { ProductConfiguration };
export default ProductConfiguration;