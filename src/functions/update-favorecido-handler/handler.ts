import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { UpdateFavorecidoUseController } from 'src/infra/controllers/UpdateFavorecidoController';

const updateFavorecidoHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: any) => {
  
  const data = event.body;
  const id = event.pathParameters.cnpj_cpf;

  await new UpdateFavorecidoUseController().execute(id, data);

  return formatJSONResponse({
    statusCode: 204
  });

}

export const main = middyfy(updateFavorecidoHandler);