import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

import { RecipientsController } from '../../infra/controllers/RecipientsController';

const recipientsController = new RecipientsController();

const recipientGetHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const data = await recipientsController.getRecipient(event.pathParameters.cnpj_cpf);

  return formatJSONResponse({
    statusCode: 200,
    body: data
  });

}

export const main = middyfy(recipientGetHandler);