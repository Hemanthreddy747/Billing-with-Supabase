// Application configuration settings
const appConfig = {
  // App information
  app: {
    name: "Pro",
    version: "1.0.0",
  },
  
  // API endpoints and services
  services: {
    supabase: {
      url: "https://ckwawleazhqdnzctjuag.supabase.co",
      anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrd2F3bGVhemhxZG56Y3RqdWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NzEzNTEsImV4cCI6MjA1NzQ0NzM1MX0.C8FzGGx1d8cD8cRtxDcEqfYdH42qv7BJxYb3G_-OEZA",
    },
  },
  
  // Feature flags
  features: {
    enableGoogleAuth: true,
    enableEmailAuth: true,
    enableDarkMode: true,
  },
  
  // Navigation
  navigation: {
    mainMenu: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Invoices", path: "/invoices" },
      { name: "Clients", path: "/clients" },
      { name: "Reports", path: "/reports" },
    ],
  },
};

export default appConfig;