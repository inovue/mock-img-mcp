# Mock Image MCP Server

A Model Context Protocol (MCP) server that provides image generation capabilities using Google's Gemini 2.0 Flash Preview model.

## Features

- 🎨 Image generation using Gemini 2.0 Flash Preview
- 📐 Multiple aspect ratio support (1:1, 16:9, 9:16, 4:3, 3:4)
- 🎭 Various artistic styles and categories
- 🏗️ Clean architecture with design patterns
- 🛠️ TypeScript with strict typing
- 📦 pnpm package management
- 🔧 Biome for linting and formatting
- 🧪 Vitest for testing with comprehensive coverage

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env and add your GOOGLE_API_KEY
```

3. Build the project:
```bash
pnpm build
```

4. Run in development mode:
```bash
pnpm dev
```

## Architecture

The project follows clean architecture principles with clear separation of concerns:

```
src/
├── config/          # Configuration management (Singleton pattern)
├── services/        # Business logic services (Strategy pattern)
├── tools/           # MCP tool implementations (Adapter pattern)
├── types/           # TypeScript type definitions
├── utils/           # Utility classes and server management
└── index.ts         # Application entry point
```

### Design Patterns Used

- **Singleton Pattern**: `ConfigManager` for centralized configuration
- **Strategy Pattern**: `ImageGenerationService` interface for different AI providers
- **Adapter Pattern**: Tool classes adapt services to MCP interface
- **Dependency Injection**: Services injected into tools for testability

### Testing

The project includes comprehensive testing with Vitest:

- **Unit Tests**: Individual component testing for services, tools, and utilities
- **Integration Tests**: End-to-end workflow testing
- **Mocking**: External dependencies mocked for isolated testing
- **Coverage**: Code coverage reporting to ensure quality

Test structure mirrors the source code organization:
```
test/
├── config/          # Configuration tests
├── services/        # Service layer tests
├── tools/           # Tool implementation tests
├── utils/           # Utility class tests
├── integration/     # Integration tests
└── setup.ts         # Test environment setup
```

## Available Tools

### `generate_image`
Generate images using text prompts.

**Parameters:**
- `prompt` (string): The text description for image generation
- `aspect_ratio` (optional): Image aspect ratio (1:1, 16:9, 9:16, 4:3, 3:4)
- `style` (optional): Artistic style modifier

### `list_image_styles`
Get available styles, aspect ratios, and generation tips.

## Development Commands

- `pnpm build` - Build TypeScript to JavaScript
- `pnpm dev` - Run in development mode with hot reload
- `pnpm start` - Run built application
- `pnpm test` - Run tests in watch mode
- `pnpm test:run` - Run tests once
- `pnpm test:ui` - Run tests with UI interface
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm lint` - Check code with Biome
- `pnpm format` - Format code with Biome
- `pnpm check` - Run Biome lint and format check
- `pnpm typecheck` - Run TypeScript type checking

## Environment Variables

- `GOOGLE_API_KEY` - Required. Your Google AI API key for Gemini access

## License

MIT