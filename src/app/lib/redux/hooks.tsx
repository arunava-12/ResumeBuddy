import { useEffect } from "react";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { store, type RootState, type AppDispatch } from "lib/redux/store";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "lib/redux/local-storage";
import { initialResumeState, setResume } from "lib/redux/resumeSlice";
import {
  initialSettings,
  setSettings,
  formHeadings,
  type Settings,
  type ShowForm,
} from "lib/redux/settingsSlice";
import { deepMerge } from "lib/deep-merge";
import type { Resume } from "lib/redux/types";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Debounce wrapper for a function
 */
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * Hook: Save Redux state to localStorage on change (with debounce)
 */
export const useSaveStateToLocalStorageOnChange = () => {
  useEffect(() => {
    console.info("Initializing Redux state sync with localStorage");

    const initialState = loadStateFromLocalStorage();
    if (initialState) {
      console.info("Restored state from localStorage");
    } else {
      console.info("No saved state found, using defaults");
    }

    const debouncedSave = debounce((state: RootState) => {
      saveStateToLocalStorage(state);
    }, 500);

    const unsubscribe = store.subscribe(() => {
      debouncedSave(store.getState());
    });

    return () => {
      unsubscribe();
      console.info("Unsubscribed from Redux state changes");
    };
  }, []);
};

let storeInitialized = false;

/**
 * Hook: Initialize Redux store from localStorage (only once)
 */
export const useSetInitialStore = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (storeInitialized) {
      console.info("Redux store already initialized, skipping");
      return;
    }

    console.info("Initializing Redux store from localStorage");
    storeInitialized = true;

    const state = loadStateFromLocalStorage();

    const getCurrentLanguage = (): "en" => {
      return "en";
    };

    const currentLanguage = getCurrentLanguage();
    const languageHeadings = formHeadings[currentLanguage];

    if (!state) {
      dispatch(
        setSettings({
          ...initialSettings,
          formToHeading: languageHeadings,
        })
      );
      return;
    }

    if (state.resume) {
      const mergedResumeState = deepMerge(
        initialResumeState,
        state.resume
      ) as Resume;
      dispatch(setResume(mergedResumeState));
    }

    if (state.settings) {
      const updatedFormToHeading = { ...languageHeadings };

      if (state.settings.customizedHeadings && state.settings.formToHeading) {
        (Object.keys(state.settings.customizedHeadings) as ShowForm[]).forEach(
          (formKey) => {
            if (
              state.settings.customizedHeadings[formKey] &&
              state.settings.formToHeading[formKey]
            ) {
              updatedFormToHeading[formKey] =
                state.settings.formToHeading[formKey];
            }
          }
        );
      }

      const settingsWithLanguage = {
        ...state.settings,
        formToHeading: updatedFormToHeading,
      };

      const mergedSettingsState = deepMerge(
        initialSettings,
        settingsWithLanguage
      ) as Settings;
      dispatch(setSettings(mergedSettingsState));
    }
  }, [dispatch]);
};
