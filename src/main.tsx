import { createRoot } from 'react-dom/client';

import 'react-toastify/dist/ReactToastify.css';
import './styles/toast.css';
import { App } from './app';

createRoot(document.getElementById('root')!).render(<App />);
