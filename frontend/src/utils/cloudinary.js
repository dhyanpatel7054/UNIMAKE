// In utils/cloudinary.js
export const cloudinaryOptimize = (url, width, height) => {
    if (!url) return `/api/placeholder/${width}/${height}`;
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes('cloudinary') || parsed.hostname.includes('res.cloudinary.com')) {
        parsed.pathname = parsed.pathname.replace(
          /\/upload\//,
          `/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`
        );
        return parsed.toString();
      }
      return url;
    } catch (error) {
      return `/api/placeholder/${width}/${height}`;
    }
  };
  