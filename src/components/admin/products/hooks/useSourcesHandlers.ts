import { useCallback } from "react";

/**
 * Custom hook to handle source-related operations (files, websites, QA pairs)
 */
interface UseSourcesHandlersProps {
  dispatch: React.Dispatch<any>;
  state: {
    files: (string | File)[];
    websiteInput: string;
    websites: string[];
    newQA: { question: string; answer: string };
    qaPairs: { id: string; question: string; answer: string }[];
    sources: { id: string; name: string; url: string; isActive: boolean }[];
  };
}

export function useSourcesHandlers({ dispatch, state }: UseSourcesHandlersProps) {
  // File handling
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const newFiles = Array.from(e.target.files).map(file => file);
      dispatch({ type: "SET_FILES", payload: [...state.files, ...newFiles] });
    }
  }, [dispatch, state.files]);

  const handleRemoveFile = useCallback((index: number) => {
    dispatch({ 
      type: "SET_FILES", 
      payload: state.files.filter((_, i) => i !== index) 
    });
  }, [dispatch, state.files]);

  // Website handling
  const handleWebsiteInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_WEBSITE_INPUT", payload: e.target.value });
  }, [dispatch]);

  const handleAddWebsite = useCallback(() => {
    if (state.websiteInput.trim() && !state.websites.includes(state.websiteInput)) {
      dispatch({ type: "ADD_WEBSITE", payload: state.websiteInput });
    }
  }, [dispatch, state.websiteInput, state.websites]);

  const handleRemoveWebsite = useCallback((website: string) => {
    dispatch({ type: "REMOVE_WEBSITE", payload: website });
  }, [dispatch]);

  // QA Pair handling
  const handleNewQAQuestionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: "SET_NEW_QA_QUESTION", payload: e.target.value });
  }, [dispatch]);

  const handleNewQAAnswerChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: "SET_NEW_QA_ANSWER", payload: e.target.value });
  }, [dispatch]);

  const handleAddQAPair = useCallback(() => {
    if (state.newQA.question.trim() && state.newQA.answer.trim()) {
      dispatch({ type: "ADD_QA_PAIR", payload: state.newQA });
    }
  }, [dispatch, state.newQA]);

  const handleRemoveQAPair = useCallback((id: string) => {
    dispatch({ type: "REMOVE_QA_PAIR", payload: id });
  }, [dispatch]);

  // Source management
  const addSource = useCallback(() => {
    const newSource = {
      id: Date.now().toString(),
      name: "",
      url: "",
      isActive: true
    };
    dispatch({ type: "ADD_SOURCE", payload: newSource });
  }, [dispatch]);

  const removeSource = useCallback((id: string) => {
    dispatch({ type: "REMOVE_SOURCE", payload: id });
  }, [dispatch]);

  const updateSource = useCallback((id: string, field: string, value: string | boolean) => {
    dispatch({ 
      type: "UPDATE_SOURCE", 
      payload: { id, field, value } 
    });
  }, [dispatch]);

  return {
    // File handlers
    handleFileChange,
    handleRemoveFile,
    
    // Website handlers
    handleWebsiteInputChange,
    handleAddWebsite,
    handleRemoveWebsite,
    
    // QA Pair handlers
    handleNewQAQuestionChange,
    handleNewQAAnswerChange,
    handleAddQAPair,
    handleRemoveQAPair,
    
    // Source handlers
    addSource,
    removeSource,
    updateSource
  };
}
