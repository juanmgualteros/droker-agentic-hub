import { ProductConfigurationState, ProductConfigurationAction } from "../types";

/**
 * Initial state for the product configuration
 */
export const initialProductState: ProductConfigurationState = {
  // General settings
  productName: "AI Assistant",
  productDescription: "A helpful AI assistant for your organization.",
  productType: "",
  productCategory: "",
  productIndustry: "",
  productTargetAudience: "",
  productPricing: "",
  productFeatures: "",
  productBenefits: "",
  productValueProposition: "",
  productTone: "",
  productKeywords: "",
  isActive: true,
  
  // Sources
  sources: [
    { id: "1", name: "Documentation", url: "https://example.com/docs", isActive: true },
    { id: "2", name: "Knowledge Base", url: "https://example.com/kb", isActive: true }
  ],
  files: [],
  websiteInput: "",
  websites: [],
  newQA: { question: "", answer: "" },
  qaPairs: [],
  showQAForm: false,
  
  // Prompt configuration
  systemPrompt: "You are a helpful AI assistant.",
  userPrompt: "How can I help you today?",
  qaMode: "flexible",
  promptTemplates: [
    { id: "1", name: "Default", content: "You are a helpful AI assistant." },
    { id: "2", name: "Customer Support", content: "You are a customer support agent helping users with their questions." }
  ],
  selectedPromptTemplate: "1",
  
  // Chat appearance
  primaryColor: "#0066cc",
  secondaryColor: "#f3f4f6",
  fontFamily: "comfortaa",
  fontSize: "md",
  isPrivateChat: false,
  
  // Other state
  tooltips: {
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
  },
  
  // UI state
  activeTab: "general",
  isLoading: false,
};

/**
 * Reducer for product configuration state
 */
export function productReducer(
  state: ProductConfigurationState,
  action: ProductConfigurationAction
): ProductConfigurationState {
  switch (action.type) {
    // General settings actions
    case "SET_PRODUCT_NAME":
      return { ...state, productName: action.payload };
    case "SET_PRODUCT_DESCRIPTION":
      return { ...state, productDescription: action.payload };
    case "SET_PRODUCT_TYPE":
      return { ...state, productType: action.payload };
    case "SET_PRODUCT_CATEGORY":
      return { ...state, productCategory: action.payload };
    case "SET_PRODUCT_INDUSTRY":
      return { ...state, productIndustry: action.payload };
    case "SET_PRODUCT_TARGET_AUDIENCE":
      return { ...state, productTargetAudience: action.payload };
    case "SET_PRODUCT_PRICING":
      return { ...state, productPricing: action.payload };
    case "SET_PRODUCT_FEATURES":
      return { ...state, productFeatures: action.payload };
    case "SET_PRODUCT_BENEFITS":
      return { ...state, productBenefits: action.payload };
    case "SET_PRODUCT_VALUE_PROPOSITION":
      return { ...state, productValueProposition: action.payload };
    case "SET_PRODUCT_TONE":
      return { ...state, productTone: action.payload };
    case "SET_PRODUCT_KEYWORDS":
      return { ...state, productKeywords: action.payload };
    case "SET_IS_ACTIVE":
      return { ...state, isActive: action.payload };
    
    // Sources actions
    case "SET_FILES":
      return { ...state, files: action.payload };
    case "SET_WEBSITE_INPUT":
      return { ...state, websiteInput: action.payload };
    case "ADD_WEBSITE":
      return { 
        ...state, 
        websites: [...state.websites, action.payload],
        websiteInput: "" 
      };
    case "REMOVE_WEBSITE":
      return { 
        ...state, 
        websites: state.websites.filter(website => website !== action.payload) 
      };
    case "SET_NEW_QA_QUESTION":
      return { 
        ...state, 
        newQA: { ...state.newQA, question: action.payload } 
      };
    case "SET_NEW_QA_ANSWER":
      return { 
        ...state, 
        newQA: { ...state.newQA, answer: action.payload } 
      };
    case "ADD_QA_PAIR":
      return { 
        ...state, 
        qaPairs: [...state.qaPairs, { id: Date.now().toString(), ...action.payload }],
        newQA: { question: "", answer: "" },
        showQAForm: false
      };
    case "REMOVE_QA_PAIR":
      return { 
        ...state, 
        qaPairs: state.qaPairs.filter(qa => qa.id !== action.payload) 
      };
    case "SET_SHOW_QA_FORM":
      return { ...state, showQAForm: action.payload };
    case "ADD_SOURCE":
      return { ...state, sources: [...state.sources, action.payload] };
    case "REMOVE_SOURCE":
      return { 
        ...state, 
        sources: state.sources.filter(source => source.id !== action.payload) 
      };
    case "UPDATE_SOURCE":
      return { 
        ...state, 
        sources: state.sources.map(source => 
          source.id === action.payload.id 
            ? { ...source, [action.payload.field]: action.payload.value } 
            : source
        ) 
      };
    
    // Prompt configuration actions
    case "SET_SYSTEM_PROMPT":
      return { ...state, systemPrompt: action.payload };
    case "SET_USER_PROMPT":
      return { ...state, userPrompt: action.payload };
    case "SET_QA_MODE":
      return { ...state, qaMode: action.payload };
    case "ADD_PROMPT_TEMPLATE":
      return { 
        ...state, 
        promptTemplates: [...state.promptTemplates, action.payload] 
      };
    case "REMOVE_PROMPT_TEMPLATE":
      return { 
        ...state, 
        promptTemplates: state.promptTemplates.filter(template => template.id !== action.payload) 
      };
    case "UPDATE_PROMPT_TEMPLATE":
      return { 
        ...state, 
        promptTemplates: state.promptTemplates.map(template => 
          template.id === action.payload.id 
            ? { ...template, [action.payload.field]: action.payload.value } 
            : template
        ) 
      };
    case "SET_SELECTED_PROMPT_TEMPLATE":
      return { ...state, selectedPromptTemplate: action.payload };
    
    // Chat appearance actions
    case "SET_PRIMARY_COLOR":
      return { ...state, primaryColor: action.payload };
    case "SET_SECONDARY_COLOR":
      return { ...state, secondaryColor: action.payload };
    case "SET_FONT_FAMILY":
      return { ...state, fontFamily: action.payload };
    case "SET_FONT_SIZE":
      return { ...state, fontSize: action.payload };
    case "SET_IS_PRIVATE_CHAT":
      return { ...state, isPrivateChat: action.payload };
    
    // UI actions
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SAVE_PRODUCT":
      console.log("Saving product configuration", state);
      return { ...state, isLoading: true };
      
    default:
      return state;
  }
}
