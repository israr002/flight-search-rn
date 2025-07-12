export const getAuthErrorMessage = (error: any): string => {
  if (!error) return 'An unknown error occurred';

  const errorCode = error.code || error.message;

  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/weak-password':
      return 'Password is too weak';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection';
    case 'auth/user-disabled':
      return 'This account has been disabled';
    case 'auth/invalid-credential':
      return 'Invalid credentials';
    case 'auth/operation-not-allowed':
      return 'This operation is not allowed';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email but different sign-in credentials';
    case 'auth/requires-recent-login':
      return 'Please sign in again to complete this operation';
    case 'auth/invalid-verification-code':
      return 'Invalid verification code';
    case 'auth/invalid-verification-id':
      return 'Invalid verification ID';
    case 'auth/quota-exceeded':
      return 'Quota exceeded. Please try again later';
    case 'auth/operation-canceled':
      return 'Operation was canceled';
    case 'auth/popup-closed-by-user':
      return 'Sign-in was canceled';
    case 'auth/popup-blocked':
      return 'Sign-in popup was blocked';
    case 'auth/cancelled-popup-request':
      return 'Sign-in was canceled';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed';
    default:
      return error.message || 'An unknown error occurred';
  }
}; 
