import { 
  signInWithCredential, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile,
  reload
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Platform, Alert } from 'react-native';
import { SignupFormData } from '@/schemas/authSchema';
import { APP_CONSTANTS } from '@/constants/appConstants';
import { getAuthErrorMessage } from '@/utils/authErrors';
import { auth, storage } from '@/firebaseConfig';

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: any }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: userCredential.user,
    };
  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, error: getAuthErrorMessage(error) };
  }
};

export const signUp = async (
    data: SignupFormData,
  profilePhotoUri?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
    console.log('Attempting to create user with email:', data.email);
    
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

    console.log('User created successfully:', userCredential.user.uid);

      const user = userCredential.user;
      if (!user) {
        return { success: false, error: 'User creation failed' };
      }

      let uploadedPhotoURL = profilePhotoUri;

      // If a profile photo is provided, upload it to Firebase Storage
      if (profilePhotoUri) {
      try {
        console.log('Uploading profile photo...');
        const response = await fetch(profilePhotoUri);
        const blob = await response.blob();
        const storageRef = ref(storage, `profile_photos/${user.uid}`);
        await uploadBytes(storageRef, blob);
        uploadedPhotoURL = await getDownloadURL(storageRef);
        console.log('Profile photo uploaded successfully');
      } catch (uploadError) {
        console.warn('Profile photo upload failed:', uploadError);
        // Continue without photo if upload fails
        uploadedPhotoURL = undefined;
      }
      }

      // Update the Firebase user's profile with name and photo URL
    console.log('Updating user profile...');
    await updateProfile(user, {
        displayName: data.displayName,
        ...(uploadedPhotoURL && { photoURL: uploadedPhotoURL }),
      });

      // Reload the user to ensure profile changes are applied
    await reload(user);

    console.log('Sign up completed successfully');
      return { success: true };
    } catch (error: any) {
    console.error('Sign up error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack,
    });
      return {
        success: false,
        error: getAuthErrorMessage(error),
      };
    }
  };

export const handleSignOut = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error('Sign out error:', error);
    return { success: false, error: getAuthErrorMessage(error) };
  }
};

