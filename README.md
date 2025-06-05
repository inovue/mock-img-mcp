# Mock Image MCP Server

A Model Context Protocol (MCP) server that provides AI-powered image generation capabilities using Google's Gemini 2.0 Flash Preview model.

## Features

- 🎨 High-quality image generation using Gemini 2.0 Flash Preview
- 📐 Multiple aspect ratios (1:1, 16:9, 9:16, 4:3, 3:4)
- 🎭 Various artistic styles and categories
- 🔌 MCP-compatible for seamless integration with Claude and other clients

## Installation

### Prerequisites

- Node.js 18+ and pnpm
- Google AI API key

### Setup

1. **Clone and install:**
```bash
git clone <repository-url>
cd mock-img-mcp
pnpm install
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env and add your GOOGLE_API_KEY
```

3. **Build the server:**
```bash
pnpm build
```

## Usage

### Running the MCP Server

```bash
pnpm start
```

The server will start and listen for MCP connections on stdio.

### Integration with Claude Desktop

Add to your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "mock-img-mcp": {
      "command": "node",
      "args": ["/path/to/mock-img-mcp/dist/index.js"],
      "env": {
        "GOOGLE_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Available Tools

#### `generate_image`
Generate images from text descriptions.

**Parameters:**
- `prompt` (string, required): Detailed description of the image to generate
- `aspect_ratio` (string, optional): Image dimensions
  - Options: `1:1`, `16:9`, `9:16`, `4:3`, `3:4`
  - Default: `1:1`
- `style` (string, optional): Artistic style modifier
  - See available styles with `list_image_styles`

**Example:**
```json
{
  "prompt": "A serene mountain landscape at sunset",
  "aspect_ratio": "16:9",
  "style": "photorealistic"
}
```

#### `list_image_styles`
Retrieve available styles, aspect ratios, and generation tips.

**Returns:**
- Available artistic styles
- Supported aspect ratios
- Best practices for prompt writing

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_API_KEY` | Yes | Your Google AI API key for Gemini model access |

## Getting Your Google API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file

## Troubleshooting

### Common Issues

**"Invalid API key" error:**
- Verify your `GOOGLE_API_KEY` is correct
- Ensure the API key has access to Gemini models

**"Model not available" error:**
- Check if Gemini 2.0 Flash Preview is available in your region
- Verify your Google Cloud project has the necessary quotas

**Connection issues:**
- Ensure the server is running (`pnpm start`)
- Check Claude Desktop configuration path and syntax

### Getting Help

- Check the error logs in your MCP client
- Verify environment variable configuration
- Ensure network connectivity to Google AI services

## License

MIT