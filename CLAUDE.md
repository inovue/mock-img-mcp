# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Model Context Protocol (MCP) server that provides image generation capabilities using Google's Gemini 2.0 Flash Preview model. The project uses TypeScript with a clean architecture pattern and modern tooling.

## Development Setup

1. **Install dependencies**: `pnpm install`
2. **Environment setup**: Copy `.env.example` to `.env` and add your `GOOGLE_API_KEY`
3. **Development**: `pnpm dev`
4. **Build**: `pnpm build`

## Essential Commands

- `pnpm build` - Build TypeScript to JavaScript
- `pnpm dev` - Run in development mode with tsx
- `pnpm start` - Run built application  
- `pnpm test` - Run tests in watch mode
- `pnpm test:run` - Run tests once
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm lint` - Check code with Biome
- `pnpm format` - Format code with Biome
- `pnpm check` - Run Biome lint and format check
- `pnpm typecheck` - Run TypeScript type checking

## Architecture

The codebase follows clean architecture with these key patterns:

### Directory Structure
```
src/
├── config/          # Configuration management (Singleton)
├── services/        # Business logic services (Strategy pattern)
├── tools/           # MCP tool implementations (Adapter pattern)
├── types/           # TypeScript type definitions
├── utils/           # Utility classes and server management
└── index.ts         # Application entry point
```

### Design Patterns Used
- **Singleton**: `ConfigManager` for centralized configuration
- **Strategy**: `ImageGenerationService` interface for extensibility
- **Adapter**: Tool classes adapt services to MCP interface
- **Dependency Injection**: Services injected into tools

### Key Services
- `GeminiImageService`: Handles Gemini API integration
- `StyleCatalogService`: Manages available styles and configurations
- `ServerManager`: Manages FastMCP server lifecycle

## Code Conventions

- Use Biome for formatting and linting
- Strict TypeScript with proper typing
- Interface-driven design for testability
- Separate concerns into distinct layers
- Use dependency injection for loose coupling

## Environment Variables

- `GOOGLE_API_KEY` (required): Google AI API key for Gemini access