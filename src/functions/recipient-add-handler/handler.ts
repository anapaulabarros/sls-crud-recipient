import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

import { RecipientDynamoRepository } from '../../infra/repositories/recipient-dynamo-repository';
import { ValidatorEmptyFields } from '../../utils/ValidatorEmptyField';
import { FormatResponse } from '../../utils/FormatResponse';


const recipientRepository = new RecipientDynamoRepository();
const formatResponse = new FormatResponse();
const validatorEmptyFields = new ValidatorEmptyFields();

const recipientAddHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: any) => {
  
  
  try {
    
    validatorEmptyFields.validator(event.body);

    await recipientRepository.add(event.body);

    return formatJSONResponse({
      statusCode: 201,
      body: {
        message: "Item successfully inserted"
      }
    });

  } catch (err) {
    console.log("Error add data: ", err);
    formatResponse.formatResponseError(500, err);
  }

}

export const main = middyfy(recipientAddHandler);