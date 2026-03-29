import { createRoot } from "react-dom/client";
import App from "./App";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/outfit";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Remove static SEO content once React has mounted
document.getElementById("static-content")?.remove();
