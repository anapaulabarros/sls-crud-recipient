import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { RecipientDynamoRepository } from '../../infra/repositories/recipient-dynamo-repository';
import { FormatResponse } from '../../utils/FormatResponse';


const recipientRepository = new RecipientDynamoRepository();
const formatResponse = new FormatResponse();

const recipientListHandler: ValidatedEventAPIGatewayProxyEvent<any> = async () => {

  try {

    const data = await recipientRepository.findAll();

    return formatJSONResponse({
      statusCode: 200,
      body: data
    });
    
  } catch (err) {
    console.log("Error read data: ", err);
    formatResponse.formatResponseError(500,err);
  }
}

export const main = middyfy(recipientListHandler);
