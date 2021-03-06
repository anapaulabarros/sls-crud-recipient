import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'recipients/{cnpj_cpf}',
        request: {
          schemas: {
            'application/json': schema
          }
        }
      }
    }
  ]
}