# Bank User Management - Angular CRUD

An Angular 13 application for managing bank users with full CRUD operations.

## Features

- List all users
- View user details
- Create new users
- Edit existing users
- Delete users
- Error handling with user feedback
- Loading states

## Tech Stack

- **Framework**: Angular 13
- **Language**: TypeScript
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router

## Prerequisites

- Node.js 14+
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

## Installation

```bash
# Clone the repository
git clone https://github.com/asafarviv55/angular-api.git
cd angular-api

# Install dependencies
npm install

# Start development server
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload on source changes.

## Environment Configuration

Configure the API URL in `src/environments/`:

**Development** (`environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

**Production** (`environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com/api'
};
```

## Project Structure

```
src/app/
├── user/
│   ├── create/          # Create user component
│   ├── edit/            # Edit user component
│   ├── index/           # User list component
│   ├── view/            # View user component
│   ├── user.service.ts  # User API service
│   ├── user.ts          # User interface
│   ├── user.module.ts   # User feature module
│   └── user-routing.module.ts
├── app.component.ts
├── app.module.ts
└── app-routing.module.ts
```

## API Endpoints

The app expects these backend endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/list` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

## Build

```bash
# Development build
ng build

# Production build
ng build --configuration production
```

Build artifacts are stored in the `dist/` directory.

## Testing

```bash
# Unit tests
ng test

# End-to-end tests
ng e2e
```

## License

MIT
