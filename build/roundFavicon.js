// This script will replace the square favicon with a circular one
window.addEventListener('load', function() {
  // Create a new canvas element
  const canvas = document.createElement('canvas');
  const size = 64;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Load the existing favicon
  const img = new Image();
  img.crossOrigin = 'anonymous';
  
  // Use the full path to the image to avoid relative path issues
  const currentUrl = window.location.href;
  const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
  img.src = baseUrl + 'HeroImage.jpg';
  
  img.onload = function() {
    // Create circular clipping area
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
    
    // Draw the image with a circular clip
    ctx.drawImage(img, 0, 0, size, size);
    
    // Add a white border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2 - 1, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Create favicon links with the new circular image
    const faviconLink = document.querySelector('link[rel="icon"]');
    const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
    
    // Update the favicon links with PNG data URL
    const dataUrl = canvas.toDataURL('image/png');
    if (faviconLink) faviconLink.href = dataUrl;
    if (appleTouchIcon) appleTouchIcon.href = dataUrl;
    
    // Create a link for iOS devices (which are pickier about favicons)
    if (!document.querySelector('link[rel="mask-icon"]')) {
      const maskIcon = document.createElement('link');
      maskIcon.rel = 'mask-icon';
      maskIcon.href = dataUrl;
      maskIcon.color = '#000000';
      document.head.appendChild(maskIcon);
    }
  };
});
