# Environment Setup

Setting up your development environment for NativeScript-Angular development.

## System Requirements

### macOS
- macOS 10.15 or later
- Xcode 12 or later (for iOS development)
- Android Studio (for Android development)

### Windows
- Windows 10 or later
- Android Studio (for Android development)
- Visual Studio with C++ tools

### Linux
- Ubuntu 18.04 or later (or equivalent)
- Android Studio (for Android development)

## Required Software

### 1. Node.js
Install Node.js version 16 or later:

```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Or download from nodejs.org
```

### 2. NativeScript CLI
Install the NativeScript CLI globally:

```bash
npm install -g @nativescript/cli
```

Verify installation:
```bash
ns --version
```

### 3. Android Development Setup

#### Install Android Studio
1. Download Android Studio from [developer.android.com](https://developer.android.com/studio)
2. Install Android Studio with default settings
3. Open Android Studio and install required SDK components

#### Configure Android SDK
1. Open Android Studio
2. Go to Tools → SDK Manager
3. Install the following:
   - Android SDK Platform 33 (or latest)
   - Android SDK Build-Tools
   - Android SDK Platform-Tools
   - Android Emulator

#### Set Environment Variables
Add to your shell profile (`~/.bashrc`, `~/.zshrc`, etc.):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
# export ANDROID_HOME=$HOME/Android/Sdk        # Linux
# export ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk  # Windows

export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 4. iOS Development Setup (macOS only)

#### Install Xcode
1. Install Xcode from the Mac App Store
2. Launch Xcode and accept the license agreement
3. Install additional components when prompted

#### Install iOS Simulator
iOS Simulator is included with Xcode. You can also install additional simulator versions:

1. Open Xcode
2. Go to Xcode → Preferences → Components
3. Download desired iOS Simulator versions

#### Install CocoaPods
```bash
sudo gem install cocoapods
```

## Verify Your Setup

Run the NativeScript doctor command to verify your setup:

```bash
ns doctor
```

This will check:
- Node.js version
- NativeScript CLI version
- Android SDK setup
- iOS development setup (macOS only)
- Java version
- Connected devices

## IDE Setup

### Visual Studio Code (Recommended)
1. Install [Visual Studio Code](https://code.visualstudio.com/)
2. Install the NativeScript extension
3. Install Angular Language Service extension

### WebStorm/IntelliJ IDEA
1. Install NativeScript plugin
2. Configure TypeScript support

## Create Your First Project

Test your setup by creating a new project:

```bash
ns create my-first-app --ng
cd my-first-app
ns run android  # or ns run ios
```

## Troubleshooting

### Common Issues

#### Android SDK not found
- Ensure ANDROID_HOME is set correctly
- Restart your terminal/IDE after setting environment variables

#### iOS build fails
- Make sure Xcode is installed and updated
- Run `sudo xcode-select --install` to install command line tools

#### Permission errors
- On macOS/Linux, avoid using `sudo` with npm
- Use nvm to manage Node.js versions

### Getting Help
- Run `ns doctor` to diagnose issues
- Check the [troubleshooting guide](/guide/troubleshooting)
- Ask for help in our [community forums](/community)