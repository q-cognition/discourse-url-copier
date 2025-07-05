import Component from "@ember/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { next } from "@ember/runloop";

export default Component.extend({
  tagName: "div",
  classNames: ["url-copier-button-container"],
  
  toast: service(),
  
  @action
  async copyModifiedUrl() {
    try {
      const currentUrl = window.location.href;
      const targetDomain = this.siteSettings.discourse_url_copier_target_domain;
      const appendParams = this.siteSettings.discourse_url_copier_append_params;
      
      // Create URL object to parse the current URL
      const url = new URL(currentUrl);
      
      // Replace the hostname
      url.hostname = targetDomain;
      
      // Get the modified URL as string
      let modifiedUrl = url.toString();
      
      // Append the extra parameters
      if (appendParams && appendParams.trim() !== '') {
        // Check if URL already has query parameters
        const separator = modifiedUrl.includes('?') ? '&' : '?';
        // Remove leading ? if it exists in appendParams
        const cleanParams = appendParams.startsWith('?') ? appendParams.substring(1) : appendParams;
        modifiedUrl += separator + cleanParams;
      }
      
      // Copy to clipboard
      await navigator.clipboard.writeText(modifiedUrl);
      
      // Show toast notification
      const toastMessage = this.siteSettings.discourse_url_copier_toast_message;
      this.toast.success(toastMessage);
      
    } catch (error) {
      console.error('Failed to copy URL:', error);
      
      // Fallback for older browsers
      this.fallbackCopyToClipboard(modifiedUrl);
    }
  },
  
  fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      const toastMessage = this.siteSettings.discourse_url_copier_toast_message;
      this.toast.success(toastMessage);
    } catch (err) {
      console.error('Fallback copy failed:', err);
      this.toast.error('Failed to copy URL');
    } finally {
      document.body.removeChild(textArea);
    }
  }
});
