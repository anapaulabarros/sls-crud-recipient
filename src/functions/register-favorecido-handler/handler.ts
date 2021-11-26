import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { RegisterFavorecidoController } from 'src/infra/controllers/RegisterFavorecidoController';

const registerFavorecidoHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: any) => {
  
  await new RegisterFavorecidoController().execute(event.body);

  return formatJSONResponse({
    statusCode: 201,
    body: {
      message: "Favorecido inserido com sucesso"
    }
  });

}

export const main = middyfy(registerFavorecidoHandler);