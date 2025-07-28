import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
       resolve: name => {
           const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
           return pages[`./Pages/${name}.jsx`];
       },
       setup({ el, App, props }) {
           createRoot(el).render(<App {...props} />);
       },
   });