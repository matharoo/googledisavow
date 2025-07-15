document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const urlInput = document.getElementById('urlInput');
    const disavowOutput = document.getElementById('disavowOutput');
    const outputSection = document.getElementById('outputSection');
    const summarySection = document.getElementById('summarySection');
    const convertBtn = document.getElementById('convertBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');
    const pasteBtn = document.getElementById('pasteBtn');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    const urlCount = document.getElementById('urlCount');
    const domainCount = document.getElementById('domainCount');
    const totalUrls = document.getElementById('totalUrls');
    const uniqueDomains = document.getElementById('uniqueDomains');
    const duplicates = document.getElementById('duplicates');
    const topDomains = document.getElementById('topDomains');

    // Event listeners
    convertBtn.addEventListener('click', convertUrls);
    copyBtn.addEventListener('click', copyToClipboard);
    downloadBtn.addEventListener('click', downloadFile);
    clearBtn.addEventListener('click', clearInput);
    pasteBtn.addEventListener('click', pasteFromClipboard);
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);
    urlInput.addEventListener('input', updateUrlCount);

    // Initialize
    updateUrlCount();

    function extractDomain(url) {
        try {
            // Remove protocol if present
            let cleanUrl = url.trim();
            if (!cleanUrl) return null;

            // Add protocol if missing
            if (!cleanUrl.match(/^https?:\/\//)) {
                cleanUrl = 'http://' + cleanUrl;
            }

            // Create URL object to extract domain
            const urlObj = new URL(cleanUrl);
            let domain = urlObj.hostname;

            // Remove www. prefix if present
            domain = domain.replace(/^www\./, '');

            // Handle IP addresses (keep as is)
            if (domain.match(/^\d+\.\d+\.\d+\.\d+$/)) {
                return domain;
            }

            // Handle localhost
            if (domain === 'localhost') {
                return domain;
            }

            // Extract main domain (e.g., example.com from sub.example.com)
            const parts = domain.split('.');
            if (parts.length >= 2) {
                // For domains like sub.example.com, return example.com
                // For domains like example.co.uk, return example.co.uk
                if (parts.length === 2) {
                    return domain;
                } else {
                    // Check for common TLDs that might have multiple parts
                    const commonMultiTLDs = ['co.uk', 'com.au', 'co.nz', 'co.za', 'com.br', 'com.mx', 'org.uk', 'net.uk'];
                    const lastTwoParts = parts.slice(-2).join('.');
                    
                    if (commonMultiTLDs.includes(lastTwoParts)) {
                        return parts.slice(-3).join('.');
                    } else {
                        return parts.slice(-2).join('.');
                    }
                }
            }

            return domain;
        } catch (error) {
            console.warn('Could not parse URL:', url, error);
            return null;
        }
    }

    function convertUrls() {
        const urls = urlInput.value.split('\n').filter(url => url.trim());
        
        if (urls.length === 0) {
            alert('Please enter some URLs to convert.');
            return;
        }

        const domainCounts = {};
        const invalidUrls = [];
        const allDomains = [];

        urls.forEach(url => {
            const domain = extractDomain(url);
            if (domain) {
                allDomains.push(domain);
                domainCounts[domain] = (domainCounts[domain] || 0) + 1;
            } else {
                invalidUrls.push(url);
            }
        });

        // Get unique domains
        const uniqueDomains = Object.keys(domainCounts);
        const totalUrlCount = allDomains.length;
        const duplicateCount = totalUrlCount - uniqueDomains.length;

        // Update summary section
        updateSummary(domainCounts, totalUrlCount, duplicateCount);

        // Convert to disavow format
        const disavowFormat = uniqueDomains
            .sort()
            .map(domain => `domain:${domain}`)
            .join('\n');

        // Update output (clean disavow format only)
        disavowOutput.value = disavowFormat;
        domainCount.textContent = `${uniqueDomains.length} unique domains extracted (${duplicateCount} duplicates removed)`;
        
        // Show output and summary sections
        outputSection.style.display = 'block';
        summarySection.style.display = 'block';
        outputSection.classList.add('success');

        // Show warnings for invalid URLs
        if (invalidUrls.length > 0) {
            const warningMsg = `Warning: ${invalidUrls.length} URLs could not be parsed:\n${invalidUrls.join('\n')}`;
            console.warn(warningMsg);
            alert(`Warning: ${invalidUrls.length} URLs could not be parsed and were skipped.`);
        }

        // Scroll to output
        outputSection.scrollIntoView({ behavior: 'smooth' });
    }

    function updateSummary(domainCounts, totalUrlCount, duplicateCount) {
        const uniqueDomainsList = Object.keys(domainCounts);
        
        // Update stats
        totalUrls.textContent = totalUrlCount;
        uniqueDomains.textContent = uniqueDomainsList.length;
        duplicates.textContent = duplicateCount;
        
        // Sort domains by frequency (highest first)
        const sortedDomains = uniqueDomainsList.sort((a, b) => domainCounts[b] - domainCounts[a]);
        
        // Get top 5 domains with most URLs
        const top5Domains = sortedDomains.slice(0, 5);
        
        // Update top domains display
        if (top5Domains.length > 0) {
            topDomains.innerHTML = '<strong>Top domains:</strong><br>' + 
                top5Domains.map((domain, index) => {
                    const count = domainCounts[domain];
                    const percentage = ((count / totalUrlCount) * 100).toFixed(1);
                    return `<div class="domain-item">
                        <span class="domain-name">${domain}</span>
                        <span class="domain-count">${count} URLs (${percentage}%)</span>
                    </div>`;
                }).join('');
        } else {
            topDomains.innerHTML = '';
        }
    }

    function copyToClipboard() {
        if (!disavowOutput.value) {
            alert('No content to copy.');
            return;
        }

        disavowOutput.select();
        disavowOutput.setSelectionRange(0, 99999); // For mobile devices

        try {
            document.execCommand('copy');
            showNotification('Copied to clipboard!', 'success');
        } catch (err) {
            // Fallback for modern browsers
            navigator.clipboard.writeText(disavowOutput.value).then(() => {
                showNotification('Copied to clipboard!', 'success');
            }).catch(() => {
                alert('Failed to copy to clipboard. Please select and copy manually.');
            });
        }
    }

    function downloadFile() {
        if (!disavowOutput.value) {
            alert('No content to download.');
            return;
        }

        const blob = new Blob([disavowOutput.value], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'disavow.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('File downloaded!', 'success');
    }

    function clearInput() {
        urlInput.value = '';
        disavowOutput.value = '';
        outputSection.style.display = 'none';
        summarySection.style.display = 'none';
        updateUrlCount();
        domainCount.textContent = '0 domains extracted';
    }

    async function pasteFromClipboard() {
        try {
            const text = await navigator.clipboard.readText();
            urlInput.value = text;
            updateUrlCount();
            showNotification('URLs pasted from clipboard!', 'success');
        } catch (err) {
            alert('Could not access clipboard. Please paste manually (Ctrl+V / Cmd+V).');
        }
    }

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            urlInput.value = e.target.result;
            updateUrlCount();
            showNotification(`File "${file.name}" loaded!`, 'success');
        };
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
    }

    function updateUrlCount() {
        const urls = urlInput.value.split('\n').filter(url => url.trim());
        urlCount.textContent = `${urls.length} URLs detected`;
    }

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#48bb78' : '#4299e1'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to convert
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            convertUrls();
        }
        
        // Ctrl/Cmd + V to paste (when input is focused)
        if ((e.ctrlKey || e.metaKey) && e.key === 'v' && document.activeElement === urlInput) {
            setTimeout(updateUrlCount, 100);
        }
    });
}); 