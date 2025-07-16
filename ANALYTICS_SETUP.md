# Google Analytics Setup Guide

## 🎯 **Quick Setup (5 minutes)**

### 1. Create Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Create a new property for your webapp
4. Get your **Measurement ID** (starts with `G-`)

### 2. Update Configuration

Replace `G-XXXXXXXXXX` in these files with your actual Measurement ID:

**In `index.html`:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ACTUAL-ID"></script>
<script>
    gtag('config', 'G-YOUR-ACTUAL-ID');
</script>
```

**In `config.js`:**
```javascript
GA_MEASUREMENT_ID: 'G-YOUR-ACTUAL-ID',
```

### 3. Test Your Setup

1. Open your webapp in a browser
2. Open Developer Tools → Console
3. Type: `gtag('event', 'test', {test: true})`
4. Check Google Analytics → Real-time reports

## 📊 **Events Being Tracked**

### **Button Clicks**
- `button_click` with `button_name` parameter:
  - `convert` - When user converts URLs
  - `copy_output` - When user copies results
  - `download_file` - When user downloads file
  - `clear_input` - When user clears input
  - `paste_from_clipboard` - When user pastes URLs
  - `upload_file` - When user uploads file

### **Conversion Events**
- `url_conversion` with parameters:
  - `total_urls` - Number of URLs processed
  - `unique_domains` - Number of unique domains
  - `duplicates_removed` - Number of duplicates removed
  - `duplicate_percentage` - Percentage of duplicates

### **File Uploads**
- `file_upload` with parameters:
  - `file_name` - Name of uploaded file
  - `file_size` - Size of uploaded file

### **User Progress**
- `url_input_progress` - Tracks when user adds URLs (every 10 URLs)

## 🔍 **Analytics Dashboard Setup**

### **Recommended Reports**

1. **User Engagement**
   - Page views
   - Session duration
   - Bounce rate

2. **Event Analysis**
   - Most clicked buttons
   - Conversion rates
   - File upload patterns

3. **User Behavior**
   - URL input patterns
   - Most common file types
   - Peak usage times

### **Custom Dimensions to Create**

1. **Button Name** - Track which buttons are most popular
2. **File Type** - Analyze uploaded file types
3. **URL Count Range** - Group users by URL volume

## 🛠 **Advanced Configuration**

### **Disable Analytics (Development)**
In `config.js`:
```javascript
ENABLE_ANALYTICS: false,
```

### **Custom Event Tracking**
Add custom events in `script.js`:
```javascript
trackEvent('custom_event', {
    custom_parameter: 'value'
});
```

### **Debug Mode**
In `config.js`:
```javascript
ENABLE_DEBUG_LOGGING: true,
```

## 📈 **Key Metrics to Monitor**

### **Usage Metrics**
- Daily/Monthly active users
- Session duration
- Pages per session

### **Feature Usage**
- Conversion button clicks
- File upload frequency
- Copy/Download actions

### **Performance Metrics**
- Average URLs processed per session
- Duplicate percentage trends
- Most common domain patterns

## 🔒 **Privacy Considerations**

### **GDPR Compliance**
- No personal data is tracked
- Only anonymous usage statistics
- Consider adding cookie consent banner

### **Data Retention**
- Google Analytics default: 26 months
- Consider shorter retention for privacy

## 🚀 **Deployment Checklist**

- [ ] Replace `G-XXXXXXXXXX` with your Measurement ID
- [ ] Test events in development
- [ ] Verify real-time tracking
- [ ] Set up custom reports
- [ ] Configure data retention settings
- [ ] Add privacy policy if needed

## 📞 **Troubleshooting**

### **Events Not Showing**
1. Check Measurement ID is correct
2. Verify gtag is loaded (check console)
3. Test with `gtag('event', 'test')`
4. Check ad blockers

### **Real-time Data Missing**
1. Wait 24-48 hours for data
2. Check property settings
3. Verify tracking code placement
4. Test in incognito mode

### **Custom Events Not Working**
1. Check event name spelling
2. Verify parameter format
3. Check browser console for errors
4. Test with simple event first 