# Shopping List App Development Rules

## Architecture & Structure
- Use React Native with TypeScript for type safety
- Implement Redux Toolkit for state management
- Use React Navigation v6 for navigation
- Follow feature-based folder structure: `/src/features/[feature-name]`
- Keep components small and focused (max 150 lines)
- Use custom hooks for business logic

## Code Standards
- Use functional components with hooks only
- Implement proper error boundaries
- Use React.memo for performance optimization on list items
- Follow naming convention: PascalCase for components, camelCase for functions/variables
- Maximum function length: 20 lines
- Use absolute imports with path mapping

## Data Management
- Use AsyncStorage for offline persistence
- Implement optimistic updates for better UX
- Cache frequently accessed data
- Use React Query for server state management
- Implement proper data validation with Yup or Zod

## UI/UX Rules
- Design mobile-first with thumb-friendly touch targets (44px minimum)
- Use consistent spacing system (8px grid)
- Implement haptic feedback for interactions
- Support both light and dark themes
- Ensure accessibility with proper labels and contrast ratios
- Use skeleton loading states

## Performance
- Implement FlatList for large item lists with proper keyExtractor
- Use lazy loading for images and heavy components
- Debounce search inputs (300ms)
- Implement proper memoization for expensive calculations
- Keep bundle size under 50MB

## Testing
- Write unit tests for all utility functions
- Test custom hooks with React Testing Library
- Mock external dependencies (camera, storage)
- Maintain 80%+ code coverage
- Test offline scenarios

## Security & Privacy
- Never store sensitive data in plain text
- Implement proper input sanitization
- Use secure storage for authentication tokens
- Follow OWASP mobile security guidelines
- Implement proper deep linking validation

## Offline Support
- All core features must work offline
- Implement conflict resolution for sync
- Show clear offline/online status
- Queue actions when offline, sync when online
- Cache essential data locally

## API Integration
- Use RESTful API design
- Implement proper error handling with retry logic
- Use request/response interceptors
- Implement rate limiting awareness
- Handle network timeouts gracefully

## Development Workflow
- Use conventional commits for version control
- Implement pre-commit hooks with linting
- Use feature branches with descriptive names
- Require code reviews for all changes
- Maintain changelog for releases

## Deployment
- Use CodePush for over-the-air updates
- Implement staged rollouts (10% → 50% → 100%)
- Monitor crash reports and performance metrics
- Maintain separate staging and production environments
- Use semantic versioning