#!/bin/bash

echo "Installing Phase 4 dependencies..."

# Barcode Scanner
npm install react-native-camera react-native-permissions

# Voice Input
npm install @react-native-voice/voice

# Collaboration Features
npm install socket.io-client @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore

# Additional utilities
npm install react-native-device-info

echo "Phase 4 dependencies installed successfully!"
echo "Don't forget to:"
echo "1. Configure camera permissions in android/app/src/main/AndroidManifest.xml"
echo "2. Configure iOS permissions in ios/ShoppingListApp/Info.plist"
echo "3. Set up Firebase configuration"
echo "4. Run 'cd ios && pod install' for iOS"