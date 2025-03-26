"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FileText, MessageSquare, Save, Database, Bot, Globe, X, HelpCircle, Users, Download, Link as LinkIcon, Code, TestTube, Mic, PaintBucket, Palette, BarChart, LineChart, PieChart } from "lucide-react";
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
  const [selectedPromptTemplate, setSelectedPromptTemplate] = useState("default");

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

  // System prompt templates
  const promptTemplates = {
    default: "You are a helpful assistant that answers questions based on the provided context...",
    customer_service: "You are a friendly customer service representative. Be polite, helpful, and concise in your responses...",
    technical_support: "You are a technical support specialist. Focus on providing step-by-step solutions to technical problems...",
    sales: "You are a professional sales assistant. Help customers find the right products based on their needs..."
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
        <TabsList className="flex h-14 items-center gap-6 px-6 border-b w-full bg-transparent">
          <TabsTrigger 
            value="rag" 
            className="inline-flex h-full items-center border-b-2 px-1 text-sm font-medium transition-colors hover:border-gray-300 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 border-transparent text-gray-600"
          >
            <Database className="mr-2 h-4 w-4" />
            Sources
          </TabsTrigger>
          <TabsTrigger 
            value="chat" 
            className="inline-flex h-full items-center border-b-2 px-1 text-sm font-medium transition-colors hover:border-gray-300 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 border-transparent text-gray-600"
          >
            <Bot className="mr-2 h-4 w-4" />
            Prompt
          </TabsTrigger>
          <TabsTrigger 
            value="appearance" 
            className="inline-flex h-full items-center border-b-2 px-1 text-sm font-medium transition-colors hover:border-gray-300 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 border-transparent text-gray-600"
          >
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="inline-flex h-full items-center border-b-2 px-1 text-sm font-medium transition-colors hover:border-gray-300 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 border-transparent text-gray-600"
          >
            <BarChart className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="users" 
            className="inline-flex h-full items-center border-b-2 px-1 text-sm font-medium transition-colors hover:border-gray-300 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 border-transparent text-gray-600"
          >
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rag">
          <div className="space-y-6">
            {/* Sources Section */}
            <Card className="p-6 bg-white border border-gray-200 rounded-xl">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-comfortaa font-light text-gray-900">Sources</h3>
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="h-5 w-5 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                          >
                            <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="right" 
                          className="max-w-[280px] p-4 text-sm font-comfortaa font-light leading-6 rounded-xl bg-white border border-gray-200 shadow-md whitespace-normal"
                        >
                          Configure different types of data sources that the AI will use to answer questions.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-base font-comfortaa font-light text-gray-500">
                    Configure the different types of sources
                  </p>
                </div>

                <Tabs defaultValue="files" className="w-full">
                  <TabsList className="flex h-14 items-center gap-6 px-6 border-b w-full bg-transparent">
                    <TabsTrigger 
                      value="files" 
                      className="inline-flex h-full items-center border-b-2 px-1 text-sm font-medium transition-colors hover:border-gray-300 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 border-transparent text-gray-600"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Files
                    </TabsTrigger>
                    <TabsTrigger 
                      value="websites" 
                      className="inline-flex h-full items-center border-b-2 px-1 text-sm font-medium transition-colors hover:border-gray-300 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 border-transparent text-gray-600"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Websites
                    </TabsTrigger>
                    <TabsTrigger 
                      value="qa" 
                      className="inline-flex h-full items-center border-b-2 px-1 text-sm font-medium transition-colors hover:border-gray-300 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 border-transparent text-gray-600"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Q&A Pairs
                    </TabsTrigger>
                    <TabsTrigger 
                      value="interview" 
                      className="inline-flex h-full items-center border-b-2 px-1 text-sm font-medium transition-colors hover:border-gray-300 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 border-transparent text-gray-600"
                    >
                      <Mic className="mr-2 h-4 w-4" />
                      Interview Me
                    </TabsTrigger>
                  </TabsList>

                  {/* Files Tab */}
                  <TabsContent value="files" className="mt-6">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-4">
                        <Input
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-upload"
                          multiple
                          accept=".pdf,.doc,.docx,.txt"
                        />
                        <label htmlFor="file-upload">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full font-comfortaa font-light border-gray-200 hover:bg-gray-50 rounded-xl" 
                            asChild
                          >
                            <span>Upload Files</span>
                          </Button>
                        </label>

                        {files.length > 0 && (
                          <div className="space-y-2">
                            {files.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                                <span className="text-sm font-comfortaa font-light text-gray-700">{file.name}</span>
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
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Websites Tab */}
                  <TabsContent value="websites" className="mt-6">
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
                          {websites.map((website, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                              <span className="text-sm font-comfortaa font-light text-gray-700">{website}</span>
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
                      )}
                    </div>
                  </TabsContent>

                  {/* Q&A Pairs Tab */}
                  <TabsContent value="qa" className="mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-comfortaa font-light text-gray-900">Q&A Pairs</h4>
                          <TooltipProvider delayDuration={200}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  className="h-5 w-5 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                                >
                                  <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent 
                                side="right" 
                                className="max-w-[280px] p-4 text-sm font-comfortaa font-light leading-6 rounded-xl bg-white border border-gray-200 shadow-md whitespace-normal"
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

                      {showQAForm && (
                        <Card className="p-4 bg-white border border-gray-200 rounded-xl">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="question" className="font-comfortaa font-light text-gray-700">Question</Label>
                              <Input
                                id="question"
                                value={newQA.question}
                                onChange={(e) => setNewQA({ ...newQA, question: e.target.value })}
                                className="font-comfortaa font-light rounded-xl"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="answer" className="font-comfortaa font-light text-gray-700">Answer</Label>
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
                        </Card>
                      )}

                      {qaPairs.length > 0 && (
                        <div className="space-y-2">
                          {qaPairs.map((qa) => (
                            <div key={qa.id} className="p-4 bg-gray-50 rounded-xl">
                              <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                  <p className="font-comfortaa font-light text-gray-900">{qa.question}</p>
                                  <p className="text-sm font-comfortaa font-light text-gray-700">{qa.answer}</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveQAPair(qa.id)}
                                  className="h-8 w-8 p-0 hover:bg-transparent hover:text-red-600 rounded-xl"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Interview Me Tab */}
                  <TabsContent value="interview" className="mt-6">
                    <div className="space-y-4">
                      <Card className="p-6 bg-white border border-gray-200 rounded-xl">
                        <div className="space-y-4">
                          <p className="font-comfortaa font-light text-gray-700">
                            Start a conversation with the AI to provide information about your company. 
                            The AI will ask questions to better understand your business context.
                          </p>
                          
                          <div className="bg-gray-50 p-4 rounded-xl font-comfortaa font-light">
                            <p className="text-gray-700 mb-3">Sample questions the AI might ask:</p>
                            <ul className="space-y-2 text-gray-600 list-disc pl-5">
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
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chat">
          <div className="space-y-6">
            <Card className="p-6 bg-white border border-gray-200 rounded-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-comfortaa font-light text-gray-900">Prompt Configuration</h3>
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="h-5 w-5 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                        >
                          <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="right" 
                        className="max-w-[280px] p-4 text-sm font-comfortaa font-light leading-6 rounded-xl bg-white border border-gray-200 shadow-md whitespace-normal"
                      >
                        Configure your AI's behavior with system prompts and parameters
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="space-y-4">
                  {/* System Prompt with Templates */}
                  <div className="space-y-2">
                    <Label htmlFor="promptTemplate" className="font-comfortaa font-light text-gray-700">System Prompt Template</Label>
                    <select
                      id="promptTemplate"
                      value={selectedPromptTemplate}
                      onChange={(e) => setSelectedPromptTemplate(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-xl font-comfortaa font-light text-gray-700"
                    >
                      <option value="default">Default Assistant</option>
                      <option value="customer_service">Customer Service</option>
                      <option value="technical_support">Technical Support</option>
                      <option value="sales">Sales Assistant</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="systemPrompt" className="font-comfortaa font-light text-gray-700">System Prompt</Label>
                    <Textarea
                      id="systemPrompt"
                      value={promptTemplates[selectedPromptTemplate as keyof typeof promptTemplates]}
                      onChange={(e) => {
                        // Create a new template if the user modifies it
                        if (e.target.value !== promptTemplates[selectedPromptTemplate as keyof typeof promptTemplates]) {
                          setSelectedPromptTemplate("custom");
                          // In a real implementation, you would save the custom template
                        }
                      }}
                      className="font-comfortaa font-light rounded-xl"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="temperature" className="font-comfortaa font-light text-gray-700">Temperature</Label>
                      <Input
                        id="temperature"
                        type="number"
                        min="0"
                        max="2"
                        step="0.1"
                        defaultValue={product.chatSettings.temperature}
                        className="font-comfortaa font-light rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxTokens" className="font-comfortaa font-light text-gray-700">Max Tokens</Label>
                      <Input
                        id="maxTokens"
                        type="number"
                        min="1"
                        defaultValue={product.chatSettings.maxTokens}
                        className="font-comfortaa font-light rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <div className="space-y-6">
            <Card className="p-6 bg-white border border-gray-200 rounded-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-comfortaa font-light text-gray-900">Chat Appearance</h3>
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="h-5 w-5 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                        >
                          <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="right" 
                        className="max-w-[280px] p-4 text-sm font-comfortaa font-light leading-6 rounded-xl bg-white border border-gray-200 shadow-md whitespace-normal"
                      >
                        Customize the look and feel of your chat interface
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="space-y-6">
                  {/* Colors Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-comfortaa font-medium text-gray-900">Colors</h4>
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              className="h-4 w-4 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                            >
                              <HelpCircle className="h-3 w-3 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="right" 
                            className="max-w-[280px] p-4 text-sm font-comfortaa font-light leading-6 rounded-xl bg-white border border-gray-200 shadow-md whitespace-normal"
                          >
                            Choose the primary and secondary colors for your chat interface
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primaryColor" className="font-comfortaa font-light text-gray-700">Primary Color</Label>
                        <div className="flex gap-2">
                          <Input
                            id="primaryColor"
                            type="color"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="w-12 h-9 p-1 rounded-xl"
                          />
                          <Input
                            type="text"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="flex-1 font-comfortaa font-light rounded-xl"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="secondaryColor" className="font-comfortaa font-light text-gray-700">Secondary Color</Label>
                        <div className="flex gap-2">
                          <Input
                            id="secondaryColor"
                            type="color"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            className="w-12 h-9 p-1 rounded-xl"
                          />
                          <Input
                            type="text"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            className="flex-1 font-comfortaa font-light rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Typography Section */}
                  <div className="space-y-4 border-t pt-4">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-comfortaa font-medium text-gray-900">Typography</h4>
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              className="h-4 w-4 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                            >
                              <HelpCircle className="h-3 w-3 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="right" 
                            className="max-w-[280px] p-4 text-sm font-comfortaa font-light leading-6 rounded-xl bg-white border border-gray-200 shadow-md whitespace-normal"
                          >
                            Select fonts and text styles for your chat interface
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fontFamily" className="font-comfortaa font-light text-gray-700">Font Family</Label>
                        <select
                          id="fontFamily"
                          value={fontFamily}
                          onChange={(e) => setFontFamily(e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-xl font-comfortaa font-light text-gray-700"
                        >
                          <option value="Comfortaa">Comfortaa Light</option>
                          <option value="Arial">Arial</option>
                          <option value="Helvetica">Helvetica</option>
                          <option value="Georgia">Georgia</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Layout Section */}
                  <div className="space-y-4 border-t pt-4">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-comfortaa font-medium text-gray-900">Layout</h4>
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              className="h-4 w-4 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                            >
                              <HelpCircle className="h-3 w-3 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="right" 
                            className="max-w-[280px] p-4 text-sm font-comfortaa font-light leading-6 rounded-xl bg-white border border-gray-200 shadow-md whitespace-normal"
                          >
                            Configure the layout and access settings for your chat
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="isPrivateChat" className="font-comfortaa font-light text-gray-700">Private Chat</Label>
                        <Switch
                          id="isPrivateChat"
                          checked={isPrivateChat}
                          onCheckedChange={setIsPrivateChat}
                        />
                      </div>
                      <p className="text-sm font-comfortaa font-light text-gray-500">
                        {isPrivateChat ? "Users must be authenticated to access the chat" : "Chat is publicly accessible"}
                      </p>
                    </div>
                  </div>

                  {/* Preview Section */}
                  <div className="space-y-4 border-t pt-4">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-comfortaa font-medium text-gray-900">Preview</h4>
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              className="h-4 w-4 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                            >
                              <HelpCircle className="h-3 w-3 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="right" 
                            className="max-w-[280px] p-4 text-sm font-comfortaa font-light leading-6 rounded-xl bg-white border border-gray-200 shadow-md whitespace-normal"
                          >
                            See how your chat will look with the selected settings
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <div className="border rounded-xl p-4 bg-muted/50">
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                          <div className="h-8 w-8 rounded-full bg-muted flex-shrink-0"></div>
                          <div className="bg-card p-3 rounded-lg border border-border" style={{ maxWidth: '80%' }}>
                            <p className="text-sm font-comfortaa text-foreground">Hello! How can I help you today?</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 justify-end">
                          <div className="p-3 rounded-lg text-primary-foreground bg-primary" style={{ maxWidth: '80%' }}>
                            <p className="text-sm font-comfortaa">Can you tell me more about your services?</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-6">
            <Card className="p-6 bg-white border border-gray-200 rounded-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-comfortaa font-light text-gray-900">Usage Analytics</h3>
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="h-5 w-5 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                        >
                          <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="right" 
                        className="max-w-[280px] p-4 text-sm font-comfortaa font-light leading-6 rounded-xl bg-white border border-gray-200 shadow-md whitespace-normal"
                      >
                        View usage metrics and analytics for your AI assistant
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                {/* Overview Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4 bg-white border border-gray-200 rounded-xl">
                    <div className="flex flex-col items-center">
                      <p className="text-sm font-comfortaa font-medium text-gray-500">Total Conversations</p>
                      <h4 className="text-3xl font-comfortaa font-light text-gray-900 mt-2">1,285</h4>
                      <p className="text-xs font-comfortaa text-green-600 mt-1 flex items-center">
                        <span>↑ 12% from last month</span>
                      </p>
                    </div>
                  </Card>
                  <Card className="p-4 bg-white border border-gray-200 rounded-xl">
                    <div className="flex flex-col items-center">
                      <p className="text-sm font-comfortaa font-medium text-gray-500">Active Users</p>
                      <h4 className="text-3xl font-comfortaa font-light text-gray-900 mt-2">432</h4>
                      <p className="text-xs font-comfortaa text-green-600 mt-1 flex items-center">
                        <span>↑ 8% from last month</span>
                      </p>
                    </div>
                  </Card>
                  <Card className="p-4 bg-white border border-gray-200 rounded-xl">
                    <div className="flex flex-col items-center">
                      <p className="text-sm font-comfortaa font-medium text-gray-500">Avg. Response Time</p>
                      <h4 className="text-3xl font-comfortaa font-light text-gray-900 mt-2">1.2s</h4>
                      <p className="text-xs font-comfortaa text-green-600 mt-1 flex items-center">
                        <span>↓ 0.3s from last month</span>
                      </p>
                    </div>
                  </Card>
                </div>
                
                {/* Usage Over Time Chart */}
                <div className="mt-8 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-comfortaa font-medium text-gray-900">Monthly Usage</h4>
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="h-4 w-4 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                          >
                            <HelpCircle className="h-3 w-3 text-gray-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="right" 
                          className="max-w-[280px] p-4 text-sm font-comfortaa font-light leading-6 rounded-xl bg-white border border-gray-200 shadow-md whitespace-normal"
                        >
                          Number of conversations and messages over the past 6 months
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  {/* SVG Chart for Monthly Usage */}
                  <div className="w-full h-64 bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-xs font-comfortaa text-gray-700">Conversations</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-xs font-comfortaa text-gray-700">Messages</span>
                        </div>
                      </div>
                      <select className="text-xs font-comfortaa p-1 border border-gray-200 rounded">
                        <option>Last 6 months</option>
                        <option>Last 12 months</option>
                        <option>Last 30 days</option>
                      </select>
                    </div>
                    
                    {/* SVG Chart */}
                    <svg width="100%" height="200" className="mt-2">
                      {/* X-axis */}
                      <line x1="40" y1="180" x2="100%" y2="180" stroke="#e5e7eb" strokeWidth="1" />
                      
                      {/* Y-axis */}
                      <line x1="40" y1="20" x2="40" y2="180" stroke="#e5e7eb" strokeWidth="1" />
                      
                      {/* Mock Data Points - Conversations */}
                      <polyline 
                        points="80,150 180,120 280,140 380,90 480,70 580,50" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="2"
                      />
                      
                      {/* Mock Data Points - Messages */}
                      <polyline 
                        points="80,160 180,140 280,130 380,100 480,80 580,60" 
                        fill="none" 
                        stroke="#22c55e" 
                        strokeWidth="2"
                      />
                      
                      {/* X-axis Labels */}
                      <text x="80" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">Jan</text>
                      <text x="180" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">Feb</text>
                      <text x="280" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">Mar</text>
                      <text x="380" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">Apr</text>
                      <text x="480" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">May</text>
                      <text x="580" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">Jun</text>
                      
                      {/* Y-axis Labels */}
                      <text x="30" y="180" textAnchor="end" fontSize="10" fill="#6b7280">0</text>
                      <text x="30" y="140" textAnchor="end" fontSize="10" fill="#6b7280">100</text>
                      <text x="30" y="100" textAnchor="end" fontSize="10" fill="#6b7280">200</text>
                      <text x="30" y="60" textAnchor="end" fontSize="10" fill="#6b7280">300</text>
                      <text x="30" y="20" textAnchor="end" fontSize="10" fill="#6b7280">400</text>
                    </svg>
                  </div>
                </div>
                
                {/* Top Questions and User Distribution */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  {/* Top Questions */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-comfortaa font-medium text-gray-900">Top Questions</h4>
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              className="h-4 w-4 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                            >
                              <HelpCircle className="h-3 w-3 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="right" 
                            className="max-w-[280px] p-4 text-sm font-comfortaa font-light leading-6 rounded-xl bg-white border border-gray-200 shadow-md whitespace-normal"
                          >
                            Most common questions asked by users
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <Card className="p-4 bg-white border border-gray-200 rounded-xl">
                      <ul className="space-y-3">
                        <li className="flex items-center justify-between">
                          <span className="text-sm font-comfortaa font-light text-gray-700">What services do you offer?</span>
                          <span className="text-xs font-comfortaa bg-gray-100 px-2 py-1 rounded-full">128 times</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-sm font-comfortaa font-light text-gray-700">How much does it cost?</span>
                          <span className="text-xs font-comfortaa bg-gray-100 px-2 py-1 rounded-full">95 times</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-sm font-comfortaa font-light text-gray-700">Do you offer support?</span>
                          <span className="text-xs font-comfortaa bg-gray-100 px-2 py-1 rounded-full">82 times</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-sm font-comfortaa font-light text-gray-700">How do I get started?</span>
                          <span className="text-xs font-comfortaa bg-gray-100 px-2 py-1 rounded-full">76 times</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-sm font-comfortaa font-light text-gray-700">Can I integrate with my system?</span>
                          <span className="text-xs font-comfortaa bg-gray-100 px-2 py-1 rounded-full">67 times</span>
                        </li>
                      </ul>
                    </Card>
                  </div>
                  
                  {/* User Distribution */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-comfortaa font-medium text-gray-900">User Distribution</h4>
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              className="h-4 w-4 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                            >
                              <HelpCircle className="h-3 w-3 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="right" 
                            className="max-w-[280px] p-4 text-sm font-comfortaa font-light leading-6 rounded-xl bg-white border border-gray-200 shadow-md whitespace-normal"
                          >
                            Breakdown of users by source/device
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <Card className="p-4 bg-white border border-gray-200 rounded-xl">
                      <div className="flex justify-center mb-4">
                        {/* SVG Pie Chart */}
                        <svg width="180" height="180" viewBox="0 0 180 180">
                          <circle cx="90" cy="90" r="80" fill="#f3f4f6" />
                          {/* Segments */}
                          <path d="M90,10 A80,80 0 0,1 162,118 L90,90 Z" fill="#3b82f6" /> {/* 45% - Desktop */}
                          <path d="M90,90 L162,118 A80,80 0 0,1 17,125 L90,90 Z" fill="#10b981" /> {/* 30% - Mobile */}
                          <path d="M90,90 L17,125 A80,80 0 0,1 36,25 L90,90 Z" fill="#f59e0b" /> {/* 20% - Tablet */}
                          <path d="M90,90 L36,25 A80,80 0 0,1 90,10 L90,90 Z" fill="#ef4444" /> {/* 5% - Other */}
                          <circle cx="90" cy="90" r="40" fill="white" />
                        </svg>
                      </div>
                      
                      {/* Legend */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-xs font-comfortaa text-gray-700">Desktop (45%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-xs font-comfortaa text-gray-700">Mobile (30%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span className="text-xs font-comfortaa text-gray-700">Tablet (20%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="text-xs font-comfortaa text-gray-700">Other (5%)</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
                
                {/* Export Section */}
                <div className="flex justify-end mt-4">
                  <Button 
                    variant="outline"
                    className="font-comfortaa font-light text-gray-700 border-gray-200 hover:bg-gray-50 rounded-xl"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="space-y-6">
            <Card className="p-6 bg-white border border-gray-200 rounded-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-comfortaa font-light text-gray-900">User Management</h3>
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="h-5 w-5 p-0 hover:bg-transparent hover:opacity-70 transition-opacity"
                          >
                            <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="right" 
                          className="max-w-[280px] p-4 text-sm font-comfortaa font-light leading-6 rounded-xl bg-white border border-gray-200 shadow-md whitespace-normal"
                        >
                          {tooltips.users}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      className="hidden"
                      id="bulk-import"
                      accept=".csv,.xlsx"
                      onChange={handleBulkImport}
                    />
                    <label htmlFor="bulk-import">
                      <Button 
                        variant="outline" 
                        className="font-comfortaa font-light rounded-xl" 
                        asChild
                      >
                        <span>
                          <Download className="mr-2 h-4 w-4" />
                          Import Users
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          className="font-comfortaa font-light bg-gray-900 hover:bg-gray-800 text-white rounded-xl"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
} 