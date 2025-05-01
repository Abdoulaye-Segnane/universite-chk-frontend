import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine.mjs';

const commonEngine = new CommonEngine();

export async function netlifyCommonEngineHandler(request: Request, context: any): Promise<Response> {
  // Ignore toutes les requêtes API vers Spring Boot backend
  const pathname = new URL(request.url).pathname;
  if (pathname.startsWith('/api/')) {
    return new Response(null, { status: 404 });
  }

  // Rendu SSR standard pour Angular
  return await render(commonEngine);
}
