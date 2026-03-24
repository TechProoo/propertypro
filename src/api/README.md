# API Integration

This directory contains the API client setup for PropertyLoop, connecting the React frontend to the NestJS backend.

## Structure

```
src/api/
├── client.ts           # Axios instance with interceptors
├── types.ts            # TypeScript interfaces and enums
├── index.ts            # API service exports
├── hooks.ts            # React hooks for API calls
├── utils.ts            # Error handling utilities
└── services/
    └── waitlistService.ts  # Waitlist API endpoints
```

## Setup

### Environment Variables

Create a `.env` file in the project root:

```bash
VITE_API_URL=http://localhost:3000/api
VITE_APP_ENV=development
```

### Configuration

The API client is configured in `src/api/client.ts`:

- **Base URL**: Configured from `VITE_API_URL` environment variable
- **Timeout**: 15 seconds
- **Default Headers**: Content-Type and Accept set to application/json
- **Interceptors**:
  - Request: Adds Bearer token from localStorage
  - Response: Handles 401 errors and logs development errors

## Usage

### Basic API Call

```typescript
import { api } from '@/api'

// Get all waitlist entries
const entries = await api.waitlist.getAll()

// Get single entry
const entry = await api.waitlist.getById('entry-id')

// Create entry
const newEntry = await api.waitlist.create({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  phone: '+234 801 234 5678',
  type: UserType.REAL_ESTATE_AGENT
})

// Update entry
await api.waitlist.update('entry-id', {
  email: 'newemail@example.com'
})

// Delete entry
await api.waitlist.delete('entry-id')
```

### Using Hooks in Components

```typescript
import { useApi, useMutation } from '@/api/hooks'
import { api } from '@/api'
import { getErrorMessage } from '@/api/utils'

function MyComponent() {
  // For fetching data
  const { data, loading, error, execute } = useApi(
    () => api.waitlist.getAll()
  )

  // For mutations (create, update, delete)
  const { execute: deleteEntry, isLoading } = useMutation(
    (id: string) => api.waitlist.delete(id)
  )

  useEffect(() => {
    execute()
  }, [execute])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {getErrorMessage(error)}</div>

  return (
    <div>
      {data?.map(entry => (
        <div key={entry.id}>
          <h3>{entry.first_name} {entry.last_name}</h3>
          <button
            onClick={() => deleteEntry(entry.id)}
            disabled={isLoading}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
```

## Error Handling

The `utils.ts` file provides utilities for consistent error handling:

```typescript
import { getErrorMessage, isNetworkError, isValidationError } from '@/api/utils'

try {
  await api.waitlist.create(payload)
} catch (error) {
  // User-friendly message
  console.log(getErrorMessage(error))

  // Check error type
  if (isNetworkError(error)) {
    // Handle network error
  } else if (isValidationError(error)) {
    // Handle validation error
  }
}
```

## Service Methods

### Waitlist Service

All methods in `waitlistService.ts`:

- `getAll()` - Get all waitlist entries
- `getById(id)` - Get a single entry
- `create(payload)` - Create a new entry
- `update(id, payload)` - Update an entry
- `delete(id)` - Delete an entry
- `bulkDelete(ids)` - Delete multiple entries
- `export()` - Export entries as CSV

## Adding New Services

1. Create a new file in `src/api/services/`:

```typescript
// src/api/services/authService.ts
import apiClient from '../client'

const authService = {
  login: async (email: string, password: string) => {
    const { data } = await apiClient.post('/auth/login', {
      email,
      password
    })
    return data
  }
}

export default authService
```

2. Export from `src/api/index.ts`:

```typescript
import authService from './services/authService'

export const api = {
  waitlist: waitlistService,
  auth: authService  // Add here
}
```

3. Use in components:

```typescript
import { api } from '@/api'

const result = await api.auth.login(email, password)
```

## Backend Requirements

The NestJS backend should:

1. Run on `http://localhost:3000`
2. Provide API endpoints at `/api/*`
3. Support CORS for `http://localhost:5173` (Vite dev server)
4. Handle Bearer token authentication

Example CORS configuration in NestJS:

```typescript
// main.ts
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
})
```

## Best Practices

1. **Use hooks for data fetching** - Prefer `useApi` over direct axios calls
2. **Error handling** - Always use `getErrorMessage()` for user-facing errors
3. **Loading states** - Show loading UI while `isLoading` is true
4. **Type safety** - Leverage TypeScript types from `types.ts`
5. **Environment variables** - Never hardcode API URLs
6. **Logging** - Errors are automatically logged in development mode
