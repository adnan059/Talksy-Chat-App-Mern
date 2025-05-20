export const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
  "abyss",
];

export const App_Name = import.meta.env.VITE_App_Name;

export const Base_Url =
  import.meta.env.VITE_MODE === "development"
    ? import.meta.env.VITE_BASE_URL_BACKEND_DEV
    : import.meta.env.VITE_BASE_URL_BACKEND_PROD;
