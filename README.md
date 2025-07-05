# discourse-url-copier

This plugin adds a button to topic pages in specified categories. When clicked, it copies the topic's URL to the clipboard, replacing the hostname and appending a query string.

## Configuration

In the Discourse admin settings panel:

- `url_copier_domain`: The domain to use instead of the forum's domain.
- `url_copier_append`: The string to append to the end of the copied URL.

## Installation

1. Clone into your plugins folder:
   ```bash
   git clone https://github.com/your-org/discourse-url-copier.git
   ```

2. Rebuild Discourse:
   ```bash
   ./launcher rebuild app
   ```
