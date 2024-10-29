# Task Manager App - React + TypeScript + Vite

[Previous content remains the same until Scripts section]

## Testing

### Unit & Component Testing

The app uses Jest and React Testing Library for unit and component testing. The test suite covers:

- Component rendering
- User interactions
- Task management operations
- Filter functionality
- i18n implementation

### Test Coverage

Currently, the test suite covers the following functionality:

- Initial component rendering
- Task fetching and display
- Adding new tasks
- Task filtering capabilities

### Running Tests

1. **Run all tests**:

   ```bash
   npm test
   ```

2. **Run tests in watch mode** (for development):

   ```bash
   npm run test:watch
   ```

3. **Generate test coverage report**:
   ```bash
   npm run test:coverage
   ```

### Writing Tests

Tests are located alongside their components with the `.test.tsx` extension. Example:

```typescript
// TaskSection.test.tsx
import { render, screen } from "@testing-library/react";
import TaskSection from "./TaskSection";

test("renders task section", async () => {
  render(<TaskSection />);
  expect(await screen.findByText("workspace")).toBeInTheDocument();
});
```

### Test Configuration

- Tests use Jest as the test runner
- React Testing Library for component testing
- Custom test utilities for common operations
- Mock implementations for API calls and i18n

## Scripts

- **`npm run dev`** - Starts the app in development mode with hot reloading.
- **`npm run build`** - Builds the app for production.
- **`npm run lint`** - Lints the code using ESLint.
- **`npm test`** - Runs all tests.
- **`npm run test:watch`** - Runs tests in watch mode.
- **`npm run test:coverage`** - Generates test coverage report.

[Rest of the README remains the same]
