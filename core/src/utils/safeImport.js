export async function safeImport(importPromise, fallback) {
  try {
    const module = await importPromise();
    // Devuelve un objeto con la forma { default: Componente }
    // Por convención, Vite/ES modules exponen default como module.default
    return module;  
  } catch (error) {
    console.error('Error loading microfrontend:', error);
    // Devuelve un objeto con la forma { default: fallback }
    return { default: fallback };
  }
}
