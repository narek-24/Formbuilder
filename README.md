# FormBuilder

FormBuilder is a modern form creation platform built with React. It enables users to build, publish, and manage customizable forms with drag-and-drop ease, conditional logic, validation, and response export.

![Screenshot](./public/Screenshot.webp)

## Features

- **Visual form builder**
  - Drag and drop fields into place
  - Reorder fields with smooth drag-and-drop interactions
  - Add, edit, and remove fields intuitively
  - Various field types, more coming later

- **Conditional logic**
  - Show fields dynamically when another field matches a chosen value
  - Build smarter forms with dependent questions

- **Form management**
  - Publish and unpublish forms
  - Delete forms and their responses
  - Share form links for public submission

- **Responses & exports**
  - Collect submissions from published forms
  - Export responses as CSV for reporting and analysis

## Technology Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- Zustand for state management
- DnD Kit for drag-and-drop support
- React Hook Form + Zod for validation
- Drizzle ORM + PostgreSQL for data storage
- Better Auth for user authentication
- Vitest for testing

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- Docker (recommended for local database setup)

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Database Setup

This project uses PostgreSQL and Drizzle ORM.

### Start PostgreSQL with Docker

```bash
docker compose up -d
```

### Configure environment variables

Create a `.env` file with:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/myapp

BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_URL=http://localhost:3000
```

### Database commands

```bash
npm run db:push
npm run db:studio
```
