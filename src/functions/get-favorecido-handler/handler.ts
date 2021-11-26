import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { GetFavorecidoController } from '../../infra/controllers/GetFornecedorController';


const getFavorecidoHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: any) => {

  const id = event.pathParameters.cnpj_cpf;
  const result = await new GetFavorecidoController().execute(id);

  return formatJSONResponse({
    statusCode: 200,
    fornecedor: result || undefined
  });

}

export const main = middyfy(getFavorecidoHandler);