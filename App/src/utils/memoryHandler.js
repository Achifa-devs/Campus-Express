import AsyncStorage from "@react-native-async-storage/async-storage";

class Memory {
  static async store(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  static async get(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value); // return stored value
      } else {
        return false; // return false if null
      }
    } catch (e) {
      console.error("Failed to fetch data", e);
      return false;
    }
  }

  static async clear() {
    try {
      await AsyncStorage.clear();
      console.log("All data cleared!");
      return true;
    } catch (e) {
      console.error("Failed to clear data", e);
      return false;
    }
  }

 

}

export default Memory;
