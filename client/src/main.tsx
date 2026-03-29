import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Remove static SEO content once React has mounted
document.getElementById("static-content")?.remove();
