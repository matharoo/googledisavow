# URL to Disavow Converter

A simple web application that converts a list of URLs into Google Search Console disavow format.

## Features

- **URL Input**: Paste URLs directly or upload a text file
- **Domain Extraction**: Automatically extracts main domains from URLs
- **Disavow Format**: Converts to `domain:example.com` format
- **Duplicate Removal**: Automatically removes duplicate domains
- **File Download**: Download the result as a text file
- **Copy to Clipboard**: Easy copying of results
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

1. **Open the Application**: Open `index.html` in your web browser
2. **Input URLs**: 
   - Paste URLs directly into the text area, one per line
   - Or click "Upload File" to load a text file with URLs
3. **Convert**: Click "Convert to Disavow Format" button
4. **Get Results**: The converted format will appear in the output section
5. **Copy/Download**: Use the copy or download buttons to save your results

## Supported URL Formats

The application can handle various URL formats:

```
https://www.example.com/page1
http://subdomain.example.com/blog
example.com/contact
www.example.co.uk
192.168.1.1
localhost:3000
```

## Output Format

The application converts URLs to Google Search Console disavow format:

```
domain:example.com
domain:example.co.uk
domain:192.168.1.1
```

## Features

- **Smart Domain Extraction**: Handles subdomains, www prefixes, and complex TLDs
- **Error Handling**: Warns about invalid URLs that couldn't be parsed
- **Keyboard Shortcuts**: 
  - `Ctrl/Cmd + Enter`: Convert URLs
  - `Ctrl/Cmd + V`: Paste from clipboard
- **Real-time Counting**: Shows number of URLs detected and domains extracted
- **Modern UI**: Clean, responsive design with smooth animations

## Technical Details

- **Pure JavaScript**: No external dependencies required
- **Client-side Processing**: All processing happens in your browser
- **File Support**: Accepts .txt and .csv files
- **Cross-browser Compatible**: Works in all modern browsers

## Getting Started

1. Download all files to a folder
2. Open `index.html` in your web browser
3. Start converting URLs!

## Example Usage

**Input:**
```
https://www.example.com/page1
http://subdomain.example.com/blog/post
https://example.co.uk/contact
http://www.example.com/about
```

**Output:**
```
domain:example.com
domain:example.co.uk
```

The application automatically removes duplicates and extracts only the main domain names. 