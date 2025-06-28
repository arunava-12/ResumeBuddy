import type { RootState } from "lib/redux/store";

// Reference: https://dev.to/igorovic/simplest-way-to-persist-redux-state-to-localstorage-e67

export const LOCAL_STORAGE_KEY = "resume-to-job-state";

const isLocalStorageAvailable = () => {
  try {
    if (typeof window === "undefined") return false;

    const testKey = "__test_key__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

export const loadStateFromLocalStorage = () => {
  try {
    if (!isLocalStorageAvailable()) {
      if (process.env.NODE_ENV === "development") {
        console.warn("localStorage is not available. Cannot load state.");
      }
      return undefined;
    }

    const stringifiedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stringifiedState) {
      if (process.env.NODE_ENV === "development") {
        console.info("No saved state found in localStorage.");
      }
      return undefined;
    }

    const parsedState = JSON.parse(stringifiedState);
    if (process.env.NODE_ENV === "development") {
      console.info("Successfully loaded state from localStorage.");
    }
    return parsedState;
  } catch (e) {
    console.error("Failed to load state from localStorage:", e);
    return undefined;
  }
};

export const saveStateToLocalStorage = (state: RootState) => {
  try {
    if (!isLocalStorageAvailable()) {
      if (process.env.NODE_ENV === "development") {
        console.warn("localStorage is not available. Cannot save state.");
      }
      return;
    }

    if (!state || Object.keys(state).length === 0) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Attempted to save an empty state. Operation skipped.");
      }
      return;
    }

    const stringifiedState = JSON.stringify(state);
    const stateSize = new Blob([stringifiedState]).size;

    if (stateSize > 4 * 1024 * 1024) {
      // Warn at 4MB threshold
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `State size (${Math.round(
            stateSize / 1024 / 1024
          )}MB) is approaching localStorage limit, which may cause save failure.`
        );
      }
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedState);

    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!savedData) {
      console.error("Failed to verify data after saving to localStorage.");
    } else if (process.env.NODE_ENV === "development") {
      console.info(
        `Successfully saved state to localStorage. Size: ${Math.round(stateSize / 1024)}KB`
      );
    }
  } catch (e) {
    console.error("Failed to save state to localStorage:", e);
    if (e instanceof DOMException && e.name === "QuotaExceededError") {
      console.error("localStorage quota exceeded. Consider reducing the state size.");
    }
  }
};

export const getHasUsedAppBefore = () => Boolean(loadStateFromLocalStorage());
