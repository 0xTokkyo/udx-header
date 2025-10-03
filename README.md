# UDX Header

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/0xTokkyo.udx-header)](https://marketplace.visualstudio.com/items?itemName=0xTokkyo.udx-header)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/0xTokkyo.udx-header)](https://marketplace.visualstudio.com/items?itemName=0xTokkyo.udx-header)

Automatically insert and maintain custom ASCII headers in your code files with project information, author details, and timestamps. Perfect for Uxon Dynamics projects and beyond.

![UDX Header Logo](src/u-udx-logo-multisize/u-udx-logo-128.png)

## Features

- **🎨 Custom ASCII Headers**: Insert beautiful ASCII art headers in your code files
- **🔄 Auto-Update**: Automatically updates timestamps and project information
- **⚙️ Configurable**: Set your GitHub username and customize header content
- **⌨️ Keyboard Shortcuts**: Quick insertion with `Ctrl+Alt+H` (or `Cmd+Alt+H` on Mac)
- **📁 Multi-language Support**: Works with various file types and programming languages

## Installation

1. Open Visual Studio Code
2. Press `Ctrl+P` (or `Cmd+P` on Mac) to open the Quick Open dialog
3. Type `ext install 0xTokkyo.udx-header`
4. Press Enter and reload VS Code

## Usage

### Insert Header

There are several ways to insert a header:

1. **Command Palette**: 
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "UDX Header: Insert Header"
   - Press Enter

2. **Keyboard Shortcut**: 
   - Press `Ctrl+Alt+H` (or `Cmd+Alt+H` on Mac)

3. **Menu**: 
   - Right-click in the editor and select the header insertion option

### Configure GitHub Username

To personalize your headers with your GitHub username:

1. Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Type "UDX Header: Set GitHub username"
3. Enter your GitHub username

Alternatively, you can set it in VS Code settings:
- Open Settings (`Ctrl+,` or `Cmd+,`)
- Search for "UDX Header"
- Set your GitHub username in the `udxHeader.githubUser` field

## Configuration

The extension provides the following configuration options:

| Setting                | Type   | Default     | Description                    |
|------------------------|--------|-------------|--------------------------------|
| `udxHeader.githubUser` | string | "0xTokkyo"  | Your GitHub username for headers |

## Example Header Output

```
/**
 * ╔═══════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                                        UDX PROJECT                                            ║
 * ╠═══════════════════════════════════════════════════════════════════════════════════════════════╣
 * ║  Author: YourGitHubUsername                                                                   ║
 * ║  Created: 2025-10-04                                                                          ║
 * ║  Modified: 2025-10-04                                                                         ║
 * ║  Project: udx-header                                                                          ║
 * ╚═══════════════════════════════════════════════════════════════════════════════════════════════╝
 */
```

## Requirements

- Visual Studio Code version 1.60.0 or higher

## Known Issues

None at this time. If you encounter any issues, please report them on the [GitHub repository](https://github.com/0xTokkyo/udx-header/issues).

## Release Notes

### 1.0.13

- Initial release with header insertion functionality
- Configurable GitHub username
- Keyboard shortcuts support
- Multi-language file support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this extension useful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📝 Contributing to the code

---

**Enjoy coding with UDX Header!** 🚀