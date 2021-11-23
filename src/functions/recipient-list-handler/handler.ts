import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { RecipientsController } from '../../infra/controllers/RecipientsController';

const recipientsController = new RecipientsController();

const recipientListHandler: ValidatedEventAPIGatewayProxyEvent<any> = async () => {

  const data = await recipientsController.listRecipients();

  return formatJSONResponse({
    statusCode: 200,
    body: data
  });

}

export const main = middyfy(recipientListHandler);
