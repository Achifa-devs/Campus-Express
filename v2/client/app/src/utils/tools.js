import DeviceInfo from 'react-native-device-info';
import { Product } from '../api';
import Memory from './memory';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';

// Constants
const CHARACTER_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const TIME_UNITS = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
};
const ORDINAL_SUFFIXES = ['th', 'st', 'nd', 'rd'];
const DEFAULT_DURATION_HOURS = 6;
const GEOLOCATION_CONFIG = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 10000,
};

/**
 * Utility functions for device, formatting, permissions, and data operations
 */

// ============================================================================
// DEVICE OPERATIONS
// ============================================================================

/**
 * Retrieves the unique device identifier
 * @returns {Promise<string>} Unique device ID
 */
export const fetchDeviceIdentifier = async () => {
  try {
    const identifier = await DeviceInfo.getUniqueId();
    console.log('Device Unique ID:', identifier);
    return identifier;
  } catch (error) {
    console.error('Error fetching device ID:', error);
    throw error;
  }
};

// ============================================================================
// ID GENERATION
// ============================================================================

/**
 * Creates a random alphanumeric identifier of specified length
 * @param {number} size - Length of the identifier to generate
 * @returns {string} Random identifier
 */
export const createRandomIdentifier = (size) => {
  if (!size || size <= 0) return '';
  
  const identifier = Array.from({ length: size }, () => {
    const randomIndex = Math.floor(Math.random() * CHARACTER_SET.length);
    return CHARACTER_SET[randomIndex];
  }).join('');

  return identifier;
};

/**
 * Generates a conversation identifier from two user IDs
 * @param {string} userId1 - First user ID
 * @param {string} userId2 - Second user ID
 * @returns {string} Sorted and joined conversation ID
 * @throws {Error} If both user IDs are the same
 */
export const buildConversationIdentifier = (userId1, userId2) => {
  if (userId1 === userId2) {
    throw new Error("Conversation requires two different users");
  }
  
  const sortedIds = [userId1, userId2].sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  
  return sortedIds.join('_');
};

// ============================================================================
// PRODUCT VIEW TRACKING
// ============================================================================

/**
 * Records a product view and updates browsing history
 * @param {Object} params - View parameters
 * @param {Object} params.data - Product data
 * @param {string} params.user_id - User identifier
 */
export const recordProductView = async ({ data, user_id }) => {
  try {
    const apiResponse = await Product.createView({
      product_id: data?.product_id,
      user_id,
    });

    if (apiResponse?.success) {
      const viewRecord = {
        date: new Date(),
        data: data,
      };

      const existingHistory = await Memory.get('history');

      if (existingHistory && Array.isArray(existingHistory)) {
        const hasDuplicate = existingHistory.some(
          item => item.data?.product_id === data?.product_id
        );

        if (!hasDuplicate) {
          await Memory.store('history', [...existingHistory, viewRecord]);
        }
      } else {
        await Memory.store('history', [viewRecord]);
      }
    }
  } catch (error) {
    console.error('Error recording product view:', error);
  }
};

// ============================================================================
// STRING MANIPULATION
// ============================================================================

/**
 * Capitalizes the first character of a string
 * @param {string} text - String to capitalize
 * @returns {string} Capitalized string
 */
export const toTitleCase = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Converts first character to lowercase
 * @param {string} text - String to convert
 * @returns {string} String with lowercase first character
 */
export const toCamelCaseStart = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text.charAt(0).toLowerCase() + text.slice(1);
};

// ============================================================================
// NUMBER FORMATTING
// ============================================================================

/**
 * Formats large numbers with k, m, b suffixes
 * @param {number} value - Number to format
 * @returns {string} Formatted number string
 */
export const abbreviateNumber = (value) => {
  if (typeof value !== 'number' || isNaN(value)) return '0';
  
  if (value < 1000) {
    return value.toString();
  }
  
  if (value < 1_000_000) {
    const thousands = value / 1000;
    const isWhole = value % 1000 === 0;
    return thousands.toFixed(isWhole ? 0 : 1) + 'k';
  }
  
  if (value < 1_000_000_000) {
    const millions = value / 1_000_000;
    const isWhole = value % 1_000_000 === 0;
    return millions.toFixed(isWhole ? 0 : 1) + 'm';
  }
  
  const billions = value / 1_000_000_000;
  const isWhole = value % 1_000_000_000 === 0;
  return billions.toFixed(isWhole ? 0 : 1) + 'b';
};

// ============================================================================
// DEAL STATUS MANAGEMENT
// ============================================================================

/**
 * Creates initial deal status structure after purchase
 * @returns {Object} Deal status object with all states
 */
export const initializeDealStatus = () => {
  const baseStatus = {
    outcome: null,
    completed: false,
    completedAt: null,
  };

  return {
    refunded: { ...baseStatus },
    shipping: { ...baseStatus },
    cancelled: { ...baseStatus },
    completed: {
      ...baseStatus,
      buyer: false,
      vendor: false,
    },
    confirmed: { ...baseStatus },
    delivered: { ...baseStatus },
    purchased: {
      outcome: 'success',
      completed: true,
      completedAt: new Date(),
    },
  };
};

// ============================================================================
// PERMISSIONS
// ============================================================================

/**
 * Requests camera permission from the user
 * @returns {Promise<boolean>} True if permission granted
 */
export const requestCameraAccess = async () => {
  if (Platform.OS === 'android') {
    try {
      const permissionResult = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera access to take photos.',
          buttonPositive: 'OK',
        }
      );
      return permissionResult === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Camera permission error:', error);
      return false;
    }
  }
  return true; // iOS handles via Info.plist
};

/**
 * Requests location permission from the user
 * @returns {Promise<boolean>} True if permission granted
 */
export const requestLocationAccess = async () => {
  if (Platform.OS === 'ios') {
    return true;
  }

  try {
    const permissionResult = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    return permissionResult === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.warn('Location permission error:', error);
    return false;
  }
};

// ============================================================================
// LOCATION SERVICES
// ============================================================================

/**
 * Retrieves current user location coordinates
 * @returns {Promise<Object|null>} Object with latitude and longitude, or null on error
 */
export const fetchCurrentLocation = async () => {
  try {
    // const locationData = await new Promise((resolve, reject) => {
    //   Geolocation.getCurrentPosition(
    //     (position) => resolve(position),
    //     (error) => reject(error),
    //     GEOLOCATION_CONFIG
    //   );
    // });

    // const { latitude, longitude } = locationData.coords;
    // console.log('Coordinates:', latitude, longitude);

    return null; 

    // return { latitude, longitude };
  } catch (error) {
    console.log('Location retrieval error:', error.message);
    return null;
  }
};

/**
 * Converts coordinates to human-readable address
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @returns {Promise<Object|null>} Address data or null on error
 */
export const reverseGeocodeCoordinates = async (latitude, longitude) => {
  console.log('Reverse geocoding:', latitude, longitude);
  
  try {
    const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    
    const geocodeResponse = await fetch(geocodeUrl, {
      headers: {
        'User-Agent': 'campussphere/1.0 (akpulufabian@gmail.com)',
      },
    });

    const addressData = await geocodeResponse.json();
    console.log('Geocoding response:', addressData);

    if (addressData && addressData.display_name) {
      return addressData;
    } else {
      console.log('No address data in response');
      return null;
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
};

// ============================================================================
// TIME FORMATTING
// ============================================================================

/**
 * Calculates and formats time elapsed since a past date
 * @param {Date|string} previousDate - Past date to compare
 * @returns {string} Formatted time string
 */
export const calculateTimeElapsed = (previousDate) => {
  if (!previousDate) return '';

  const currentTime = new Date();
  const pastTime = new Date(previousDate);
  const timeDifference = currentTime - pastTime;

  const totalSeconds = Math.floor(timeDifference / TIME_UNITS.SECOND);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  if (totalDays >= 1) {
    return `${totalDays} day${totalDays > 1 ? 's' : ''} & Counting`;
  }
  
  if (totalHours >= 1) {
    return `${totalHours} hour${totalHours > 1 ? 's' : ''} & Counting`;
  }
  
  if (totalMinutes >= 1) {
    return `${totalMinutes} minute${totalMinutes > 1 ? 's' : ''} & Counting`;
  }
  
  return `${totalSeconds} second${totalSeconds !== 1 ? 's' : ''} & Counting`;
};

/**
 * Formats a date string into a detailed readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDetailedDate = (dateString) => {
  if (!dateString) return '';

  const dateObj = new Date(dateString);
  if (isNaN(dateObj.getTime())) return '';

  const day = dateObj.getDate();
  const monthName = dateObj.toLocaleString('default', { month: 'long' });
  const year = dateObj.getFullYear();

  const getOrdinalSuffix = (dayNumber) => {
    const remainder = dayNumber % 100;
    return ORDINAL_SUFFIXES[(remainder - 20) % 10] || ORDINAL_SUFFIXES[remainder] || ORDINAL_SUFFIXES[0];
  };

  const hours24 = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;

  return `${day}${getOrdinalSuffix(day)} ${monthName} ${year} by ${hours12}:${minutes}${period}`;
};

/**
 * Monitors elapsed and remaining time for a cyclic duration
 * @param {Date|string} startDate - Start date of the cycle
 * @param {number} durationHours - Duration in hours (default: 6)
 * @returns {Object} Time tracking object with elapsed and remaining time
 */
export const trackCyclicDuration = (startDate, durationHours = DEFAULT_DURATION_HOURS) => {
  const startTime = new Date(startDate);
  const currentTime = new Date();
  const elapsedMilliseconds = currentTime - startTime;
  const totalDurationMilliseconds = durationHours * TIME_UNITS.HOUR;
  const remainingMilliseconds = Math.max(totalDurationMilliseconds - elapsedMilliseconds, 0);

  const elapsedHours = Math.floor(elapsedMilliseconds / TIME_UNITS.HOUR);
  const elapsedMinutes = Math.floor((elapsedMilliseconds % TIME_UNITS.HOUR) / TIME_UNITS.MINUTE);
  
  const remainingHours = Math.floor(remainingMilliseconds / TIME_UNITS.HOUR);
  const remainingMinutes = Math.floor((remainingMilliseconds % TIME_UNITS.HOUR) / TIME_UNITS.MINUTE);
  const remainingSeconds = Math.floor((remainingMilliseconds % TIME_UNITS.MINUTE) / TIME_UNITS.SECOND);

  return {
    elapsedHours,
    elapsedMinutes,
    remaining: `${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`,
    expired: remainingMilliseconds <= 0,
  };
};

// ============================================================================
// LEGACY COMPATIBILITY (Maintains backward compatibility)
// ============================================================================

// Export as default object for backward compatibility
const UtilityFunctions = {
  getDeviceId: fetchDeviceIdentifier,
  generateId: createRandomIdentifier,
  createView: recordProductView,
  capitalize: toTitleCase,
  lower_case: toCamelCaseStart,
  formatNumber: abbreviateNumber,
  generateConversationId: buildConversationIdentifier,
  generateDealStatusAfterPurchase: initializeDealStatus,
  requestCameraPermission: requestCameraAccess,
  requestLocationPermission: requestLocationAccess,
  getUserLocation: fetchCurrentLocation,
  getAddressFromCoordinates: reverseGeocodeCoordinates,
  getTimeAgo: calculateTimeElapsed,
  formatDealDate: formatDetailedDate,
  cyclicTimeWatch: trackCyclicDuration,
};

export default UtilityFunctions;
