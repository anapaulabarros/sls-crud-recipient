import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { RemoveFavorecidoController } from '../../infra/controllers/RemoveFavorecidoController';

const removeFornecedorHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: any) => {

  const id = event.pathParameters.cnpj_cpf;
  await new RemoveFavorecidoController().execute(id);

  return formatJSONResponse({
    statusCode: 204,
    body: {
      message: "Item removed with Successful"
    }
  });

}

export const main = middyfy(removeFornecedorHandler);