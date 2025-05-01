import 'zone.js/node';
import { renderApplication } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { bootstrapApplication } from '@angular/platform-browser';

export default async function(req: Request): Promise<Response> {
  const url = new URL(req.url);

  // 📝 Chemin du index.html (fichier généré côté browser)
  const distFolder = join(process.cwd(), 'dist/frontend/browser');
  const indexHtml = readFileSync(join(distFolder, 'index.html')).toString();

  try {
    const html = await renderApplication(() => bootstrapApplication(AppComponent, config), {
      document: indexHtml,
      url: url.pathname
    });
    return new Response(html, {
      headers: { 'content-type': 'text/html' }
    });
  } catch (error) {
    console.error('Erreur SSR :', error);
    return new Response('Erreur serveur', { status: 500 });
  }
}
