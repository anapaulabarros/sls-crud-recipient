import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { FindAllFavorecidosController } from '../../infra/controllers/FindAllFavorecidosController';
import { Handler } from 'aws-lambda';

const listAllFavorecidoHandler: Handler = async () => {

  const result = await new FindAllFavorecidosController().execute();

  return formatJSONResponse({
    statusCode: 200,
    Favorecidoes: result
  })
  
}

export const main = middyfy(listAllFavorecidoHandler);
