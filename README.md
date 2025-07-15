# SkyBook - Flight Booking App

A modern React Native application for searching and booking flights with real-time pricing and comprehensive travel management features.

🎥 Demo Video
Watch the application in action: [View Demo](https://www.loom.com/share/652e577c0ec842d8bdf742daa8fc6d89?sid=05527493-39ab-493a-ba0b-6cf603a69110)

## 🚀 Features

### Core Flight Search
- **Real-time Flight Search**: Search flights using live SkyScrapper API integration
- **Smart Autocomplete**: Airport and city search with intelligent suggestions
- **Multi-city Support**: Search for one-way and round-trip flights
- **Live Pricing**: Real-time flight prices in INR currency

### User Experience
- **Modern UI/UX**: Beautiful, intuitive interface with smooth animations
- **Persistent Authentication**: Secure login with Firebase Authentication
- **Responsive Design**: Optimized for both iOS and Android

### Travel Management
- **Passenger Configuration**: Add adults, children, and infants
- **Cabin Class Selection**: Economy, Premium Economy, Business, First Class
- **Date Range Picker**: Intuitive calendar for departure and return dates
- **Flight Details**: Comprehensive flight information with duration and pricing

### Search Features
- **Location Swap**: Easy origin-destination swapping
- **Edit Search**: Modify search parameters without starting over

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript development
- **Expo Router** - File-based navigation system
- **Firebase Authentication** - Secure user authentication
- **SkyScrapper API** - Real-time flight data and pricing
- **React Query** - Server state management and caching
- **React Hook Form** - Form validation and management
- **AsyncStorage** - Local data persistence
- **Lottie** - Smooth animations and loading states

## 📱 Prerequisites

- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)
- Firebase project setup
- SkyScrapper API key

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd google-flights-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:
```env
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# SkyScrapper API Configuration
EXPO_PUBLIC_SKY_SCRAPPER_API_KEY=your_skyscrapper_api_key
EXPO_PUBLIC_SKY_SCRAPPER_API_HOST=skyscanner-api.p.rapidapi.com
EXPO_PUBLIC_SKY_SCRAPPER_BASE_URL=https://skyscanner-api.p.rapidapi.com/v1
EXPO_PUBLIC_SKY_SCRAPPER_BASE_URL_V2=https://skyscanner-api.p.rapidapi.com/v2
```

### 4. Platform Setup

#### iOS Setup
```bash
npx expo run:ios
```

#### Android Setup
```bash
npx expo run:android
```

## 🚀 Running the Application

### Development Mode
```bash
# Start the development server
npm start

# Run on iOS
npx expo run:ios

# Run on Android
npx expo run:android
```

### Building for Production
```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## 📖 Usage Guide

### Getting Started

1. **Authentication**
   - Launch the app and create an account or sign in
   - Secure authentication with email/password
   - Persistent login state

2. **Flight Search**
   - Enter departure and destination cities/airports
   - Select travel dates (one-way or round-trip)
   - Configure passengers (adults, children, infants)
   - Choose cabin class preference

3. **Search Results**
   - View comprehensive flight options
   - View detailed flight information

4. **Edit Search**
   - Modify search parameters without starting over
   - Update dates, passengers, or cabin class
   - Real-time search updates with loading indicators

## 📱 Platform Support

- **iOS**: 13.0+
- **Android**: API 21+ (Android 5.0+)
- **Expo SDK**: 49+

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**SkyBook** - Making flight booking simple and enjoyable! ✈️ 
