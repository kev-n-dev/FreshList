# Shopping List App

A React Native shopping list application built with TypeScript, Redux Toolkit, and React Navigation.

## Phase 1 Setup Complete ✅

### Features Implemented
- React Native with TypeScript
- Redux Toolkit for state management
- Feature-based folder structure
- Absolute imports configuration
- ESLint and Prettier setup
- AsyncStorage for persistence
- React Query for server state
- Basic type definitions

### Project Structure
```
src/
├── components/     # Reusable UI components
├── features/       # Feature-based modules
├── hooks/          # Custom hooks
├── store/          # Redux store configuration
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── App.tsx         # Main application component
```

## Getting Started

### Prerequisites
- Node.js >= 16
- React Native development environment
- Android Studio (for Android)
- Xcode (for iOS)

### Installation
```bash
cd ShoppingListApp
npm install
```

### Running the App
```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Development Commands
```bash
# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Testing
npm test
```

## Next Steps (Phase 2)
- Set up React Navigation
- Create basic list management screens
- Implement CRUD operations for lists and items
- Add offline support with AsyncStorage persistence