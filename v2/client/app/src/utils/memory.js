import AsyncStorage from "@react-native-async-storage/async-storage";

// Constants
const STORAGE_ERROR_MESSAGES = {
  SAVE_SUCCESS: "Data saved successfully!",
  SAVE_ERROR: "Error saving data:",
  FETCH_ERROR: "Failed to fetch data",
  CLEAR_SUCCESS: "All data cleared!",
  CLEAR_ERROR: "Failed to clear data",
};

/**
 * Storage utility functions for persistent data management
 * Provides async storage operations with error handling
 */

// ============================================================================
// STORAGE OPERATIONS
// ============================================================================

/**
 * Saves data to persistent storage
 * @param {string} storageKey - Key to store data under
 * @param {*} dataValue - Value to store (will be JSON stringified)
 * @returns {Promise<void>}
 */
export const saveToStorage = async (storageKey, dataValue) => {
  if (!storageKey || typeof storageKey !== 'string') {
    console.warn('Invalid storage key provided');
    return;
  }

  try {
    const serializedValue = JSON.stringify(dataValue);
    await AsyncStorage.setItem(storageKey, serializedValue);
    console.log(STORAGE_ERROR_MESSAGES.SAVE_SUCCESS);
  } catch (error) {
    console.error(STORAGE_ERROR_MESSAGES.SAVE_ERROR, error);
    throw error;
  }
};

/**
 * Retrieves data from persistent storage
 * @param {string} storageKey - Key to retrieve data from
 * @returns {Promise<*>} Parsed data or false if not found/error
 */
export const retrieveFromStorage = async (storageKey) => {
  if (!storageKey || typeof storageKey !== 'string') {
    console.warn('Invalid storage key provided');
    return false;
  }

  try {
    const storedValue = await AsyncStorage.getItem(storageKey);
    
    if (storedValue === null || storedValue === undefined) {
      return false;
    }

    try {
      return JSON.parse(storedValue);
    } catch (parseError) {
      console.error('Error parsing stored data:', parseError);
      return false;
    }
  } catch (error) {
    console.error(STORAGE_ERROR_MESSAGES.FETCH_ERROR, error);
    return false;
  }
};

/**
 * Clears all data from persistent storage
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log(STORAGE_ERROR_MESSAGES.CLEAR_SUCCESS);
    return true;
  } catch (error) {
    console.error(STORAGE_ERROR_MESSAGES.CLEAR_ERROR, error);
    return false;
  }
};

/**
 * Removes a specific item from storage
 * @param {string} storageKey - Key to remove
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export const removeStorageItem = async (storageKey) => {
  if (!storageKey || typeof storageKey !== 'string') {
    console.warn('Invalid storage key provided');
    return false;
  }

  try {
    await AsyncStorage.removeItem(storageKey);
    return true;
  } catch (error) {
    console.error('Error removing storage item:', error);
    return false;
  }
};

/**
 * Retrieves all keys from storage
 * @returns {Promise<string[]>} Array of storage keys
 */
export const getAllStorageKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    console.error('Error retrieving storage keys:', error);
    return [];
  }
};

/**
 * Retrieves multiple items from storage
 * @param {string[]} keys - Array of keys to retrieve
 * @returns {Promise<Object>} Object with key-value pairs
 */
export const getMultipleStorageItems = async (keys) => {
  if (!Array.isArray(keys)) {
    console.warn('Keys must be an array');
    return {};
  }

  try {
    const items = await AsyncStorage.multiGet(keys);
    const result = {};
    
    items.forEach(([key, value]) => {
      try {
        result[key] = value ? JSON.parse(value) : null;
      } catch (parseError) {
        result[key] = value;
      }
    });
    
    return result;
  } catch (error) {
    console.error('Error retrieving multiple storage items:', error);
    return {};
  }
};

// ============================================================================
// LEGACY COMPATIBILITY (Maintains backward compatibility)
// ============================================================================

// Export as default object for backward compatibility
const StorageManager = {
  store: saveToStorage,
  get: retrieveFromStorage,
  clear: clearAllStorage,
  remove: removeStorageItem,
  getAllKeys: getAllStorageKeys,
  getMultiple: getMultipleStorageItems,
};

export default StorageManager;
