import { useCallback } from "react";

/**
 * Custom hook to handle prompt-related settings
 */
interface UsePromptHandlersProps {
  dispatch: React.Dispatch<any>;
}

export function usePromptHandlers({ dispatch }: UsePromptHandlersProps) {
  const handleSystemPromptChange = useCallback((value: string) => {
    dispatch({ type: "SET_SYSTEM_PROMPT", payload: value });
  }, [dispatch]);

  const handleUserPromptChange = useCallback((value: string) => {
    dispatch({ type: "SET_USER_PROMPT", payload: value });
  }, [dispatch]);

  const handleQaModeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_QA_MODE", payload: e.target.value });
  }, [dispatch]);

  const handlePromptTemplateChange = useCallback((templateId: string) => {
    dispatch({ type: "SET_SELECTED_PROMPT_TEMPLATE", payload: templateId });
  }, [dispatch]);

  const handleAddPromptTemplate = useCallback((template: { name: string; content: string }) => {
    dispatch({ 
      type: "ADD_PROMPT_TEMPLATE", 
      payload: {
        id: Date.now().toString(),
        ...template
      }
    });
  }, [dispatch]);

  const handleRemovePromptTemplate = useCallback((id: string) => {
    dispatch({ type: "REMOVE_PROMPT_TEMPLATE", payload: id });
  }, [dispatch]);

  const handleUpdatePromptTemplate = useCallback((id: string, field: string, value: string) => {
    dispatch({ 
      type: "UPDATE_PROMPT_TEMPLATE", 
      payload: { id, field, value } 
    });
  }, [dispatch]);

  return {
    handleSystemPromptChange,
    handleUserPromptChange,
    handleQaModeChange,
    handlePromptTemplateChange,
    handleAddPromptTemplate,
    handleRemovePromptTemplate,
    handleUpdatePromptTemplate
  };
}
