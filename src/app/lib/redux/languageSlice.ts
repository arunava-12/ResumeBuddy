import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { SupportedLanguage } from "./types";

// Determine if running in a browser environment
const isBrowser = typeof window !== "undefined";

// Get initial language - always English now
function getInitialLanguage(): SupportedLanguage {
  return "en";
}

interface LanguageState {
  current: SupportedLanguage;
}

const initialState: LanguageState = {
  current: "en",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<SupportedLanguage>) => {
      state.current = action.payload;

      // Save to localStorage and update <html lang>
      if (isBrowser) {
        try {
          localStorage.setItem("language", action.payload);
          document.documentElement.lang = "en";
        } catch (error) {
          console.error("Failed to set language in localStorage", error);
        }
      }
    },
    initializeLanguage: (state) => {
      if (isBrowser) {
        state.current = getInitialLanguage();
      }
    },
  },
});

export const { setLanguage, initializeLanguage } = languageSlice.actions;

// Selector
export const selectLanguage = (state: RootState) => state.language.current;

export default languageSlice.reducer;
