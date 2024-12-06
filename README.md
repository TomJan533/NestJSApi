# StarWarsNest API

Nest JS API that handles Star Wars data from https://swapi.dev

![CI](https://github.com/TomJan533/StarWarsNest/actions/workflows/ci.yml/badge.svg)


## Project Structure

```bash
.
├── .github # CI workflow
├── api
│ ├── src # Source code for the NestJS backend
│ │ ├── features # Feature-specific modules (e.g., films, species, vehicles)
│ │ ├── shared # Shared modules, services, or utilities
│ │ ├── main.ts # Application entry point
│ │ └── app.module.ts # Root application module
│ ├── test # Tests for unit, integration, and e2e
│ │ ├── unit # Unit tests
│ │ │ ├── jest.config.json # Jest configuration for unit tests
│ │ │ └── feature-specific test files
│ │ ├── integration # Integration tests
│ │ │ ├── jest.config.json # Jest configuration for integration tests
│ │ │ └── module-specific test files
│ │ ├── e2e # End-to-end tests
│ │ │ ├── jest.config.json # Jest configuration for e2e tests
│ │ │ └── e2e-specific test files
│ └── Dockerfile # NestJS API Docker definition
├── docker-compose.yml # Docker Compose configuration
├── schema.gql # Auto-generated GraphQL schema
└── README.md
```

## Tools and Technologies Used

- **NestJS**: Backend framework for building scalable server-side applications
- **GraphQL**: API query language for efficient data fetching and flexible client-server interactions
- **Docker**: Containerization platform to ensure a consistent development environment.
- **Jest**: Testing framework
- **Github Actions**: Running tests on github
- **Swagger**: API documentation


## Running locally with docker:

```bash
$ docker compose up
```

## Testing Structure

## Unit Tests

### Scope
- Test individual components (e.g., controllers, services, guards, etc.) in isolation.

### Purpose
- Ensure each component behaves correctly without relying on external dependencies.

### Examples
- Test a **Controller** with mocked services.
- Test a **Service** with mocked dependencies (e.g., repositories or other services).

---

## Integration Tests

### Scope
- Test multiple components working together within a specific module or feature (e.g., `FilmsModule`).

### Purpose
- Ensure that the module's components (controllers, services, repositories) are wired correctly and interact as expected.

### Examples
- Test endpoints in a module by bootstrapping only the specific module and mocking any external dependencies.

---

## End-to-End (E2E) Tests

### Scope
- Test the entire application, including routes, middleware, guards, and modules.

### Purpose
- Validate the system's behavior as a whole, including external integrations (e.g., database, external APIs).

### Examples
- Test endpoints via HTTP requests using tools like `Supertest`.
