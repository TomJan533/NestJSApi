# StarWarsNest API

Nest JS API that handles Star Wars data from https://swapi.dev

![CI](https://github.com/TomJan533/StarWarsNest/actions/workflows/ci.yml/badge.svg)


## Project Structure

```bash
.
├── .github # CI workflow
├── api
│ ├── src # Source code for the NestJS backend
│ ├── tests
│ └── Dockerfile # Nest JS Api docker definition
├── frontend
├── docker-compose.yml
├── .env
└── README.md
```

## Tools and Technologies Used

- **NestJS**: Backend framework for building scalable server-side applications
- **Docker**: Containerization platform to ensure a consistent development environment.
- **Jest**: Testing framework
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
