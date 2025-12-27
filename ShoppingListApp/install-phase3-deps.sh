#!/bin/bash

echo "Installing Phase 3 dependencies..."

# Install offline support
npm install @react-native-community/netinfo

# Install haptic feedback
npm install react-native-haptic-feedback

# Install additional UI dependencies
npm install react-native-reanimated

echo "Phase 3 dependencies installed successfully!"
echo ""
echo "Next steps:"
echo "1. Run 'cd ios && pod install' for iOS"
echo "2. Follow react-native-reanimated setup guide for your platform"
echo "3. Add camera permissions to Info.plist/AndroidManifest.xml for future barcode scanning"