
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// Font imports are managed in fontUtils.ts

createRoot(document.getElementById("root")!).render(<App />);
