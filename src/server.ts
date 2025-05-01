import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine';

const commonEngine = new CommonEngine();

export const reqHandler = async (request: Request, context: any): Promise<Response> => {
  const pathname = new URL(request.url).pathname;

  // 🔁 Ignore toutes les requêtes API
  if (pathname.startsWith('/api/')) {
    return new Response(null, { status: 404 });
  }

  // 🌐 Rendu SSR standard
  return await render(commonEngine);
};
