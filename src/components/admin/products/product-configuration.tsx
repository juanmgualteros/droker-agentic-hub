"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FileText, MessageSquare, Upload, Save, Database, Bot, Globe, X, HelpCircle, Users, Download, Link as LinkIcon, Code, TestTube } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductConfigurationProps {
  productId: string;
}

interface QAPair {
  id: string;
  question: string;
  answer: string;
}

export function ProductConfiguration({ productId }: ProductConfigurationProps) {
  const [activeTab, setActiveTab] = useState("rag");
  const [files, setFiles] = useState<File[]>([]);
  const [websites, setWebsites] = useState<string[]>([]);
  const [websiteInput, setWebsiteInput] = useState("");
  const [qaPairs, setQaPairs] = useState<QAPair[]>([]);
  const [showQAForm, setShowQAForm] = useState(false);
  const [newQA, setNewQA] = useState({ question: "", answer: "" });
  const [isPrivateChat, setIsPrivateChat] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#0066cc");
  const [secondaryColor, setSecondaryColor] = useState("#f3f4f6");
  const [fontFamily, setFontFamily] = useState("Comfortaa");

  // Temporary mock data - this would come from your API/database
  const product = {
    id: productId,
    name: "Product A",
    description: "Description for Product A",
    features: {
      files: true,
      chat: true,
      qa: true,
    },
    ragSettings: {
      systemPrompt: "You are a helpful assistant that answers questions based on the provided context...",
      contextTypes: {
        files: true,
        text: true,
        qa: true,
      }
    },
    chatSettings: {
      systemPrompt: "You are a helpful assistant...",
      temperature: 0.7,
      maxTokens: 1000,
    },
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files || [])]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddWebsite = () => {
    if (websiteInput.trim() && !websites.includes(websiteInput)) {
      setWebsites(prev => [...prev, websiteInput]);
      setWebsiteInput("");
    }
  };

  const handleRemoveWebsite = (index: number) => {
    setWebsites(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddQAPair = () => {
    if (newQA.question.trim() && newQA.answer.trim()) {
      setQaPairs(prev => [...prev, { ...newQA, id: Date.now().toString() }]);
      setNewQA({ question: "", answer: "" });
      setShowQAForm(false);
    }
  };

  const handleRemoveQAPair = (id: string) => {
    setQaPairs(prev => prev.filter(qa => qa.id !== id));
  };

  const handleSave = () => {
    // Handle saving configuration
    console.log("Saving configuration...", {
      files,
      websites,
      qaPairs
    });
  };

  const handleBulkImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      // Handle file upload logic here
      console.log("Importing users from file:", e.target.files[0]);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const tooltips = {
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

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rag" className="flex items-center">
            <Database className="mr-2 h-4 w-4" />
            RAG Configuration
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center">
            <Bot className="mr-2 h-4 w-4" />
            Agent
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rag">
          <div className="space-y-6">
            {/* System Prompt Section */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">System Prompt</h3>
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="h-5 w-5 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                        >
                          <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="right" 
                        className="max-w-[280px] p-3 text-sm leading-relaxed"
                      >
                        {tooltips.systemPrompt}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ragPrompt">Prompt</Label>
                  <Textarea
                    id="ragPrompt"
                    defaultValue={product.ragSettings.systemPrompt}
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </div>
            </Card>

            {/* Sources Section */}
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Sources</h3>
                  <p className="text-sm text-gray-500">
                    Configure the different types of sources
                  </p>
                </div>

                <Tabs defaultValue="files" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="files" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Files
                    </TabsTrigger>
                    <TabsTrigger value="websites" className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      Websites
                    </TabsTrigger>
                    <TabsTrigger value="qa" className="flex items-center">
                      <Upload className="mr-2 h-4 w-4" />
                      Q&A Pairs
                    </TabsTrigger>
                  </TabsList>

                  {/* Files Tab */}
                  <TabsContent value="files" className="mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">Files</h4>
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                className="h-5 w-5 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                              >
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent 
                              side="right" 
                              className="max-w-[280px] p-3 text-sm leading-relaxed"
                            >
                              {tooltips.files}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                        multiple
                        accept=".pdf,.doc,.docx,.txt"
                      />
                      <label htmlFor="file-upload">
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <span>Upload Files</span>
                        </Button>
                      </label>
                      {files.length > 0 && (
                        <div className="mt-4">
                          <ul className="space-y-1">
                            {files.map((file, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center justify-between">
                                <span className="truncate">{file.name}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveFile(index)}
                                  className="h-4 w-4 p-0"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Websites Tab */}
                  <TabsContent value="websites" className="mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">Websites</h4>
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                className="h-5 w-5 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                              >
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent 
                              side="right" 
                              className="max-w-[280px] p-3 text-sm leading-relaxed"
                            >
                              {tooltips.websites}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter website URL"
                          value={websiteInput}
                          onChange={(e) => setWebsiteInput(e.target.value)}
                          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleAddWebsite()}
                        />
                        <Button variant="outline" size="sm" onClick={handleAddWebsite}>
                          Add URL
                        </Button>
                      </div>
                      {websites.length > 0 && (
                        <div className="mt-4">
                          <ul className="space-y-1">
                            {websites.map((url, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center justify-between">
                                <span className="truncate">{url}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveWebsite(index)}
                                  className="h-4 w-4 p-0"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Q&A Tab */}
                  <TabsContent value="qa" className="mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">Q&A Pairs</h4>
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                className="h-5 w-5 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                              >
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent 
                              side="right" 
                              className="max-w-[280px] p-3 text-sm leading-relaxed"
                            >
                              {tooltips.qa}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      {!showQAForm ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => setShowQAForm(true)}
                        >
                          Add Q&A Pair
                        </Button>
                      ) : (
                        <div className="space-y-4 border rounded-lg p-4">
                          <div className="space-y-2">
                            <Label htmlFor="question">Question</Label>
                            <Input
                              id="question"
                              value={newQA.question}
                              onChange={(e) => setNewQA(prev => ({ ...prev, question: e.target.value }))}
                              placeholder="Enter question"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="answer">Answer</Label>
                            <Textarea
                              id="answer"
                              value={newQA.answer}
                              onChange={(e) => setNewQA(prev => ({ ...prev, answer: e.target.value }))}
                              placeholder="Enter answer"
                              rows={3}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => {
                                setShowQAForm(false);
                                setNewQA({ question: "", answer: "" });
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              className="flex-1"
                              onClick={handleAddQAPair}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      )}
                      {qaPairs.length > 0 && (
                        <div className="mt-4">
                          <div className="space-y-2">
                            {qaPairs.map((qa) => (
                              <div key={qa.id} className="border rounded-lg p-3 space-y-2">
                                <div className="flex justify-between items-start">
                                  <div className="space-y-1 flex-1">
                                    <p className="text-sm font-medium">{qa.question}</p>
                                    <p className="text-sm text-gray-500">{qa.answer}</p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveQAPair(qa.id)}
                                    className="h-4 w-4 p-0 ml-2"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chat">
          <div className="space-y-6">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Agent Configuration</h3>
                  <p className="text-sm text-gray-500">Configure the agent's behavior and appearance</p>
                </div>

                {/* System Prompt */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="systemPrompt">System Prompt</Label>
                    <Textarea
                      id="systemPrompt"
                      defaultValue={product.chatSettings.systemPrompt}
                      rows={4}
                    />
                  </div>

                  {/* Model Parameters */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="temperature">Temperature</Label>
                      <Input
                        id="temperature"
                        type="number"
                        min="0"
                        max="1"
                        step="0.1"
                        defaultValue={product.chatSettings.temperature}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxTokens">Max Tokens</Label>
                      <Input
                        id="maxTokens"
                        type="number"
                        min="100"
                        max="4000"
                        step="100"
                        defaultValue={product.chatSettings.maxTokens}
                      />
                    </div>
                  </div>
                </div>

                {/* Chat Appearance */}
                <div className="space-y-4 border-t pt-6">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">Chat Appearance</h4>
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" className="h-5 w-5 p-0 hover:bg-transparent hover:opacity-70">
                            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-[280px] p-3">
                          {tooltips.chatAppearance}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-12 h-9 p-1"
                        />
                        <Input
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="w-12 h-9 p-1"
                        />
                        <Input
                          type="text"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fontFamily">Font Family</Label>
                      <select
                        id="fontFamily"
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                        className="w-full h-9 rounded-[var(--radius)] border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3"
                      >
                        <option value="Comfortaa">Comfortaa Light</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="space-y-4 border-t pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">Chat Privacy</h4>
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" className="h-5 w-5 p-0 hover:bg-transparent hover:opacity-70">
                              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-[280px] p-3">
                            {tooltips.chatPrivacy}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Switch
                      checked={isPrivateChat}
                      onCheckedChange={setIsPrivateChat}
                      id="privacy-mode"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    {isPrivateChat ? "Users must be authenticated to access the chat" : "Chat is publicly accessible"}
                  </p>
                </div>

                {/* Test and Live Chat */}
                <div className="space-y-4 border-t pt-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Test Chat */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">Test Chat</h4>
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" className="h-5 w-5 p-0 hover:bg-transparent hover:opacity-70">
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="max-w-[280px] p-3">
                              {tooltips.testChat}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          readOnly
                          value={`https://yourdomain.com/chat/${productId}/test`}
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(`https://yourdomain.com/chat/${productId}/test`)}
                        >
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <TestTube className="mr-2 h-4 w-4" />
                        Open Test Chat
                      </Button>
                    </div>

                    {/* Live Chat */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">Live Chat</h4>
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" className="h-5 w-5 p-0 hover:bg-transparent hover:opacity-70">
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="max-w-[280px] p-3">
                              {tooltips.liveChat}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          readOnly
                          value={`https://yourdomain.com/chat/${productId}`}
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(`https://yourdomain.com/chat/${productId}`)}
                        >
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="embed-code">Embed Code</Label>
                        <div className="relative">
                          <Textarea
                            id="embed-code"
                            readOnly
                            value={`<script src="https://yourdomain.com/embed.js"></script>\n<div id="chat-widget" data-product-id="${productId}"></div>`}
                            rows={3}
                            className="pr-10"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(`<script src="https://yourdomain.com/embed.js"></script>\n<div id="chat-widget" data-product-id="${productId}"></div>`)}
                          >
                            <Code className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">Product Users</h3>
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" className="h-5 w-5 p-0 hover:bg-transparent hover:opacity-70">
                        <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[280px] p-3">
                      {tooltips.users}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Manage users who have access to this product
                </p>
                <div className="flex gap-2">
                  <div className="relative">
                    <Input
                      type="file"
                      onChange={handleBulkImport}
                      className="hidden"
                      id="bulk-import"
                      accept=".csv,.xlsx,.xls"
                    />
                    <label htmlFor="bulk-import">
                      <Button variant="outline" size="sm" className="flex items-center" asChild>
                        <span>
                          <Download className="mr-2 h-4 w-4" />
                          Import Users
                        </span>
                      </Button>
                    </label>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </div>
              </div>

              {/* ... rest of the users section remains the same ... */}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
} 