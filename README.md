![](https://github.com/salbert11/pinescript/blob/main/images/pineicon.png?raw=true)

# PineScript V5 Helper
## Language support for Pine Script V5 with Syntax Highlighting & Snippets

## Release Notes
#### **3.3.1**

*18.04.2024 **Update***
- Snippets for built-in variables, functions and constants updated to Pinescript release March 2024.
- Hover popup descriptions for overloaded functions added.
- Theme color minor fixed.

---

## Introduction
**Note: This is a forked project from JeylaniB's [Pine Script](https://marketplace.visualstudio.com/items?itemName=JeylaniB.pinescript) extension.**

PineScript Helper provides language support for PineScript, the scripting language used in TradingView. This extension enhances the coding experience by offering syntax highlighting, snippets, and hovers to provide reference manual information for PineScript scripts.

### What is PineScript?
PineScript is a domain-specific scripting language developed by TradingView. It is primarily used to create custom technical indicators, strategies, and alerts within the TradingView platform. PineScript is specifically designed for financial market analysis and allows traders to create their own indicators and strategies to automate trading decisions.

---

## Features 
- **Syntax Highlighting** : The extension provides syntax highlighting for PineScript V5, making your code more readable and easier to navigate. 

  ![](https://github.com/salbert11/pinescript/blob/pinescript-helper/images/highlight.png?raw=true)

---

- **Snippets** : Easily insert commonly used PineScript code blocks using snippets. Save time and increase productivity by leveraging the provided snippets. 

  ![](https://github.com/salbert11/pinescript/blob/pinescript-helper/images/snippet.png?raw=true)

---

- **Hovers** : Hover over variables, functions, or keywords to view relevant reference manual information directly in the editor. Get quick access to documentation without leaving your code.

  ![](https://github.com/salbert11/pinescript/blob/pinescript-helper/images/hover.png?raw=true)

---

- ***PineScript Color Themes** : The extension provides a collection of editor themes tailored for PineScript development, offering a visually pleasing environment for writing PineScript code.
  - Pine Theme Original Dark
  - Pine Theme Dark Pro
  - Pine Theme Dark Pro Bold
  - Pine Theme Monokai Dark
  - Pine Theme Monokai Dark Bold
  - Pine Theme Blue
  - Pine Theme Blue Bold
  - Pine Theme Dark Low Contrast
  - Pine Theme Dark Low Contrast Bold
  - Pine Theme Grey
  - Pine Theme Grey Bold
  - Pine Theme Grey Candy
  - Pine Theme Light
  - Pine Theme Light Bold

*Note: If you prefer a different theme, you are free to use any other themes of your choice. PineScript Helper is compatible with most themes.*

  ![](https://github.com/salbert11/pinethemes/raw/pinescript-color-themes/images/pine-themes.gif?raw=true)


---

## Installation
### Method 1: Install from VS Code Command Palette

Launch VS Code Command Palette (Ctrl+P), paste the following command, and press enter.
```
ext install salbert11.pinescript-helper
```

---

### Method 2: Install from VSIX
1. Download the latest release of the extension from the [GitHub releases page](https://github.com/salbert11/pinescript/releases).
2. Launch Visual Studio Code.
3. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
4. Click on the "..." (More Actions) icon in the top-right corner of the Extensions view and select "Install from VSIX..."
5. In the file dialog, select the downloaded VSIX file (`pinescript-helper.vsix`) and click "Open."
6. Once installed, the PineScript Helper extension will be enabled automatically.

---

### Method 3: Clone and Compile in Visual Studio Code 
1. Clone the PineScript Helper repository to your local machine using the following command:

```bash
  git clone https://github.com/salbert11/pinescript.git
```
2. Open Visual Studio Code and navigate to the extension's directory by selecting **File > Open Folder**  and choosing the cloned "pinescript-helper" folder. 
3. Install the required dependencies by running the following command in the integrated terminal of Visual Studio Code:

```bash
  npm install
```   
4. Once the dependencies are installed, build the extension by running the following command in the integrated terminal:

```bash
  vsce package
``` 
5. After a successful build, the compiled extension file (`pinescript-helper.vsix`) will be created in the root directory of the extension.
6. To install the extension, run the following command in the integrated terminal:
```bash
  code --install-extension pinescript-helper.vsix
```
7. Once installed, the PineScript Helper extension will be enabled automatically.

---

## Supported File Extensions

The PineScript Helper extension supports the following file extensions:

| Supported File Extension |
| :----------------------- |
| `.ps`                    |
| `.pine`                  |
| `.pinecode`              |
| `.script`                |
| `.tdps`                  |
| `.trading`               |
| `.tradingview`           |

---

## Usage 
1. Open a `.pine` or `.pinescript` file in Visual Studio Code.
2. The PineScript Helper extension will automatically detect the file type and apply syntax highlighting accordingly.
3. Use the available snippets to quickly insert commonly used PineScript code blocks.
4. Hover over variables, functions, or keywords to view relevant reference manual information.

---

## Contribution
Contributions are welcome! Please feel free to submit a [pull request](https://github.com/salbert11/pinescript/pulls) in the GitHub repository.

---

## Feedback and Support
If you encounter any issues, have suggestions, or need support, please feel free to [open an issue](https://github.com/salbert11/pinescript/issues) in the GitHub repository.

---

## License
This extension is released under the [MIT License](./LICENSE.md).

---

*Version 3.3.1*
