import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

import { RecipientsController } from '../../infra/controllers/RecipientsController';

const recipientsController = new RecipientsController();

const recipientAddHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: any) => {
  
  await recipientsController.insertRecipient(event.body);

  return formatJSONResponse({
    statusCode: 201,
    body: {
      message: "Item successfully inserted"
    }
  });

}

export const main = middyfy(recipientAddHandler);