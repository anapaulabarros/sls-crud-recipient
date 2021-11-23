import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

import { RecipientsController } from '../../infra/controllers/RecipientsController';

const recipientsController = new RecipientsController();

const recipientUpdateHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: any) => {
  
  await recipientsController.updateRecipient(event.pathParameters.cnpj_cpf, event.body);

  return formatJSONResponse({
    statusCode: 204
  });

}

export const main = middyfy(recipientUpdateHandler);