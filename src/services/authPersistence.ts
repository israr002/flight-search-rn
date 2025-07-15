import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'firebase/auth';

const AUTH_USER_KEY = '@auth_user';

export const saveUserToStorage = async (user: User | null) => {
  try {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
    } else {
      await AsyncStorage.removeItem(AUTH_USER_KEY);
    }
  } catch (error) {
    console.error('AuthPersistence: Error saving user to storage:', error);
  }
};

export const getUserFromStorage = async () => {
  try {
    const userData = await AsyncStorage.getItem(AUTH_USER_KEY);
    if (userData) {
      const user = JSON.parse(userData);
      return user;
    }
    return null;
  } catch (error) {
    console.error('AuthPersistence: Error loading user from storage:', error);
    return null;
  }
};

export const clearUserFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_USER_KEY);
  } catch (error) {
    console.error('AuthPersistence: Error clearing user from storage:', error);
  }
}; 
 