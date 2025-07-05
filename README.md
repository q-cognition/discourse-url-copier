# Discourse URL Copier Plugin

A Discourse plugin that adds a customizable button to copy modified URLs from topics in specified categories.

## Features

- 🎯 **Category-specific**: Only shows the button on topics in configured categories
- 🔧 **Configurable**: All settings can be customized through the admin panel
- 📋 **Smart copying**: Modifies URLs by changing the hostname and appending parameters
- 🎨 **Responsive design**: Works on desktop and mobile devices
- 🌙 **Dark mode support**: Adapts to your Discourse theme
- 📱 **Toast notifications**: Shows user-friendly feedback when URLs are copied

## Installation

1. Navigate to your Discourse installation directory
2. Copy this entire `discourse-url-copier` folder to your `plugins/` directory
3. Rebuild your Discourse installation:
   ```bash
   ./launcher rebuild app
   ```

## Configuration

After installation, configure the plugin through your Discourse admin panel:

1. Go to **Admin** → **Settings** → **Plugins** → **discourse-url-copier**
2. Configure the settings as needed

### Available Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Enable Plugin** | Turn the plugin on/off | `true` |
| **Target Domain** | The domain to replace in URLs | `replace-with-this-domain.com` |
| **Append Parameters** | Query parameters to append to URLs | `?extra=param` |
| **Target Categories** | Categories where the button appears | (empty - configure required) |
| **Button Text** | Text displayed on the button | `Copy Modified URL` |
| **Toast Message** | Success message when URL is copied | `Copied to clipboard` |

## Usage

1. Configure the target categories in admin settings
2. Visit any topic in those categories
3. Click the "Copy Modified URL" button
4. The modified URL will be copied to your clipboard

For more details, see the full documentation in this README.
