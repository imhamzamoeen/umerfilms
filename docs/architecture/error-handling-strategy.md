# Error Handling Strategy

## Error Flow

```mermaid
sequenceDiagram
    participant C as Component
    participant S as Service
    participant A as API Route
    participant E as External Service

    C->>S: Call service function
    S->>A: HTTP request
    A->>A: Validate input
    alt Validation error
        A-->>S: 400 { success: false, message }
        S-->>C: { error: message }
        C->>C: Display error to user
    end
    A->>E: Call external service
    alt External error
        E-->>A: Error
        A->>A: Log error details
        A-->>S: 500 { success: false, message: "User-friendly" }
        S-->>C: { error: message }
        C->>C: Display error to user
    end
    E-->>A: Success
    A-->>S: 200 { success: true, data }
    S-->>C: { data }
    C->>C: Update UI
```

## Error Response Format

```typescript
// Consistent API error response format

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Example error responses:
// 400: { success: false, message: "Name is required" }
// 500: { success: false, message: "Failed to send message. Please try again." }
// 200: { success: true, message: "Message sent successfully" }
```

## Frontend Error Handling

```typescript
// lib/error-handler.ts

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
}

// Usage in components
try {
  await submitContactForm(data);
} catch (error) {
  setError(getErrorMessage(error));
}
```

## Backend Error Handling

```typescript
// lib/api-error.ts

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Usage in API routes
export async function POST(request: NextRequest) {
  try {
    // ... handle request
  } catch (error) {
    console.error('API Error:', error);

    if (error instanceof ApiError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
```

---
