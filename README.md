# Talleres Dosban Motor — web corporativa

Landing corporativa de una sola página para **Talleres Dosban Motor** (Avenida del Ferrocarril, 33 · 24400 Ponferrada, León).

Stack: React 19 + TypeScript + Vite + Tailwind CSS 4. Fuentes Archivo e Inter servidas desde el propio sitio
(sin conexión a Google Fonts). Sin backend y sin reservas simuladas: todo el contacto se hace por teléfono, WhatsApp
o Google Maps. El formulario de la sección de contacto no envía nada por sí mismo: compone el mensaje y abre
WhatsApp con él ya escrito, y el cliente lo envía desde allí. Hay además un botón flotante de WhatsApp siempre visible.

## Comandos

```bash
npm install       # instalar dependencias
npm run dev       # desarrollo en http://localhost:5173
npm run build     # comprobación de tipos + build de producción en /dist
npm run preview   # servir el build en http://localhost:4173
npm run lint      # oxlint
```

## Despliegue en Vercel

Importar el repositorio en Vercel: detecta Vite automáticamente (build `npm run build`, salida `dist`).

**Indexación:** mientras sea una demo, `.env` contiene `VITE_ROBOTS="noindex, nofollow"`. Al publicar en el dominio
definitivo, cambiarlo a `"index, follow"` (o definir la variable en Vercel) y volver a desplegar.

## Dónde se edita cada cosa

| Qué                                                     | Archivo                   |
| ------------------------------------------------------- | ------------------------- |
| Nombre, teléfono, dirección, valoración, horario, legal | `src/content/business.ts` |
| Servicios                                               | `src/content/services.ts` |
| Fotografías (hero, servicios, taller, galería)          | `src/content/images.ts`   |
| Temas de reseñas y citas literales                      | `src/content/reviews.ts`  |
| Title, description, Open Graph, datos estructurados     | `index.html`              |
| Colores y tipografías                                   | `src/index.css` (`@theme`) |

Cada sección es un componente en `src/components/`.

### Sustituir las fotos provisionales

Las imágenes actuales son fotos de referencia de Unsplash (licencia Unsplash) y se muestran con la etiqueta
"Imagen provisional". Para cada foto real: copiarla en `public/fotos/`, cambiar `src` en `src/content/images.ts`
por la ruta (`'/fotos/fachada.jpg'`), poner `provisional: false` y revisar `alt` y `position`. Cuando ninguna foto
sea provisional desaparecen también el aviso de la galería y el crédito de Unsplash del pie.

### Pendiente de confirmar con el cliente

- Horario de apertura → `hours` en `business.ts` (mientras sea `null`, la web invita a consultarlo).
- Logotipo oficial → `src/components/Wordmark.tsx` y `public/favicon.svg`.
- Fotografías reales del taller, el equipo y trabajos.
- Fragmentos literales de reseñas con su autor público → `reviewQuotes` en `reviews.ts`.
- Textos legales reales (aviso legal, privacidad, cookies) → `legal` en `business.ts`.
- Dominio definitivo → añadir `url`, `image` y horario al JSON-LD de `index.html`, y `og:image` / `og:url`.
- Revisar periódicamente la valoración de Google (4,3 / 71 reseñas a la entrega).
