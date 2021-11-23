import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';


import { RecipientsController } from '../../infra/controllers/RecipientsController';
const recipientsController = new RecipientsController();

const recipientRemoveHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  await recipientsController.removeRecipient(event.pathParameters.cnpj_cpf);

  return formatJSONResponse({
    statusCode: 204,
    body: {
      message: "Item removed with Successful"
    }
  });

}

export const main = middyfy(recipientRemoveHandler);