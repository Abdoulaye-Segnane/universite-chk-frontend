import express from 'express';
import { CommonEngine } from '@angular/ssr/node';

const app = express();
const commonEngine = new CommonEngine();

app.get('*', async (req, res) => {
  const pathname = req.path;

  console.log(`Requête reçue pour : ${pathname}`);

  // 🔁 Ignore toutes les requêtes API
  if (pathname.startsWith('/api/')) {
    console.log('Requête API ignorée.');
    res.status(404).send();
    return;
  }

  try {
    // 🌐 Rendu SSR standard
    const html = await commonEngine.render({
      url: req.url,
      document: '<app-root></app-root>',
    });
    res.send(html);
  } catch (error) {
    console.error('Erreur lors du rendu SSR :', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

export const reqHandler = app;