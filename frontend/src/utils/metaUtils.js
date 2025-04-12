/**
 * Sets the document title and meta description
 * @param {string} title - The page title
 * @param {string} description - The page description
 */
export const setDocumentMeta = (title, description) => {
  // Set the document title
  document.title = title ? `${title} | E-Commerce` : 'E-Commerce - Tu tienda online de confianza';
  
  // Find the meta description tag
  let metaDescription = document.querySelector('meta[name="description"]');
  
  // If it doesn't exist, create it
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  
  // Set the content
  metaDescription.content = description || 'Tu tienda online de confianza con los mejores productos al mejor precio.';
};
