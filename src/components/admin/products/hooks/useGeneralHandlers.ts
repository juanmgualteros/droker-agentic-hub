import { useCallback } from "react";

/**
 * Custom hook to handle general product settings
 */
interface UseGeneralHandlersProps {
  dispatch: React.Dispatch<any>;
}

export function useGeneralHandlers({ dispatch }: UseGeneralHandlersProps) {
  const handleProductNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_PRODUCT_NAME", payload: e.target.value });
  }, [dispatch]);

  const handleProductDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: "SET_PRODUCT_DESCRIPTION", payload: e.target.value });
  }, [dispatch]);

  const handleProductTypeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_PRODUCT_TYPE", payload: e.target.value });
  }, [dispatch]);

  const handleProductCategoryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_PRODUCT_CATEGORY", payload: e.target.value });
  }, [dispatch]);

  const handleProductIndustryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_PRODUCT_INDUSTRY", payload: e.target.value });
  }, [dispatch]);

  const handleProductTargetAudienceChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: "SET_PRODUCT_TARGET_AUDIENCE", payload: e.target.value });
  }, [dispatch]);

  const handleProductPricingChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_PRODUCT_PRICING", payload: e.target.value });
  }, [dispatch]);

  const handleProductFeaturesChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: "SET_PRODUCT_FEATURES", payload: e.target.value });
  }, [dispatch]);

  const handleProductBenefitsChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: "SET_PRODUCT_BENEFITS", payload: e.target.value });
  }, [dispatch]);

  const handleProductValuePropositionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: "SET_PRODUCT_VALUE_PROPOSITION", payload: e.target.value });
  }, [dispatch]);

  const handleProductToneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_PRODUCT_TONE", payload: e.target.value });
  }, [dispatch]);

  const handleProductKeywordsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_PRODUCT_KEYWORDS", payload: e.target.value });
  }, [dispatch]);

  const handleIsActiveChange = useCallback((checked: boolean) => {
    dispatch({ type: "SET_IS_ACTIVE", payload: checked });
  }, [dispatch]);

  const handleSave = useCallback(() => {
    // Here you would typically dispatch an action to save the product
    // This could involve an API call or other persistence logic
    dispatch({ type: "SAVE_PRODUCT" });
  }, [dispatch]);

  return {
    handleProductNameChange,
    handleProductDescriptionChange,
    handleProductTypeChange,
    handleProductCategoryChange,
    handleProductIndustryChange,
    handleProductTargetAudienceChange,
    handleProductPricingChange,
    handleProductFeaturesChange,
    handleProductBenefitsChange,
    handleProductValuePropositionChange,
    handleProductToneChange,
    handleProductKeywordsChange,
    handleIsActiveChange,
    handleSave
  };
}
