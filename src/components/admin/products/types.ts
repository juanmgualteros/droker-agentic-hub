/**
 * Types for the product configuration state
 */

export interface TooltipType {
  question: string;
  answer: string;
}

export interface QAPair {
  id: string;
  question: string;
  answer: string;
}

export interface Source {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
}

export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
}

export interface ProductConfigurationState {
  // General settings
  productName: string;
  productDescription: string;
  productType: string;
  productCategory: string;
  productIndustry: string;
  productTargetAudience: string;
  productPricing: string;
  productFeatures: string;
  productBenefits: string;
  productValueProposition: string;
  productTone: string;
  productKeywords: string;
  isActive: boolean;
  
  // Sources
  sources: Source[];
  files: (string | File)[];
  websiteInput: string;
  websites: string[];
  newQA: {
    question: string;
    answer: string;
  };
  qaPairs: QAPair[];
  showQAForm: boolean;
  
  // Prompt configuration
  systemPrompt: string;
  userPrompt: string;
  qaMode: string;
  promptTemplates: PromptTemplate[];
  selectedPromptTemplate: string;
  
  // Chat appearance
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  fontSize: string;
  isPrivateChat: boolean;
  
  // Other state
  tooltips: {
    general: string;
    sources: string;
    prompt: string;
    appearance: string;
    analytics: string;
    systemPrompt: string;
    files: string;
    websites: string;
    qa: string;
    users: string;
    bulkImport: string;
    chatAppearance: string;
    chatPrivacy: string;
    testChat: string;
    liveChat: string;
  };
  
  // UI state
  activeTab: string;
  isLoading: boolean;
}

/**
 * Action types for the product configuration reducer
 */
export type ProductConfigurationAction = 
  // General settings actions
  | { type: 'SET_PRODUCT_NAME'; payload: string }
  | { type: 'SET_PRODUCT_DESCRIPTION'; payload: string }
  | { type: 'SET_PRODUCT_TYPE'; payload: string }
  | { type: 'SET_PRODUCT_CATEGORY'; payload: string }
  | { type: 'SET_PRODUCT_INDUSTRY'; payload: string }
  | { type: 'SET_PRODUCT_TARGET_AUDIENCE'; payload: string }
  | { type: 'SET_PRODUCT_PRICING'; payload: string }
  | { type: 'SET_PRODUCT_FEATURES'; payload: string }
  | { type: 'SET_PRODUCT_BENEFITS'; payload: string }
  | { type: 'SET_PRODUCT_VALUE_PROPOSITION'; payload: string }
  | { type: 'SET_PRODUCT_TONE'; payload: string }
  | { type: 'SET_PRODUCT_KEYWORDS'; payload: string }
  | { type: 'SET_IS_ACTIVE'; payload: boolean }
  
  // Sources actions
  | { type: 'SET_FILES'; payload: (string | File)[] }
  | { type: 'SET_WEBSITE_INPUT'; payload: string }
  | { type: 'ADD_WEBSITE'; payload: string }
  | { type: 'REMOVE_WEBSITE'; payload: string }
  | { type: 'SET_NEW_QA_QUESTION'; payload: string }
  | { type: 'SET_NEW_QA_ANSWER'; payload: string }
  | { type: 'ADD_QA_PAIR'; payload: { question: string; answer: string } }
  | { type: 'REMOVE_QA_PAIR'; payload: string }
  | { type: 'SET_SHOW_QA_FORM'; payload: boolean }
  | { type: 'ADD_SOURCE'; payload: Source }
  | { type: 'REMOVE_SOURCE'; payload: string }
  | { type: 'UPDATE_SOURCE'; payload: { id: string; field: string; value: string | boolean } }
  
  // Prompt configuration actions
  | { type: 'SET_SYSTEM_PROMPT'; payload: string }
  | { type: 'SET_USER_PROMPT'; payload: string }
  | { type: 'SET_QA_MODE'; payload: string }
  | { type: 'ADD_PROMPT_TEMPLATE'; payload: PromptTemplate }
  | { type: 'REMOVE_PROMPT_TEMPLATE'; payload: string }
  | { type: 'UPDATE_PROMPT_TEMPLATE'; payload: { id: string; field: string; value: string } }
  | { type: 'SET_SELECTED_PROMPT_TEMPLATE'; payload: string }
  
  // Chat appearance actions
  | { type: 'SET_PRIMARY_COLOR'; payload: string }
  | { type: 'SET_SECONDARY_COLOR'; payload: string }
  | { type: 'SET_FONT_FAMILY'; payload: string }
  | { type: 'SET_FONT_SIZE'; payload: string }
  | { type: 'SET_IS_PRIVATE_CHAT'; payload: boolean }
  
  // UI actions
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SAVE_PRODUCT' };
