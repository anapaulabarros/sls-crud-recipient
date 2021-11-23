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

const recipientRemoveHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  try {

    validatorEmptyFields.validator(event.pathParameters.cnpj_cpf);
    
    recipientRepository.remove(event.pathParameters.cnpj_cpf);

    return formatJSONResponse({
      statusCode: 204,
      body: {
        message: "Item removed with Successful"
      }
    });

    
  } catch (err) {
    console.log("Error delete data: ", err);
    formatResponse.formatResponseError(500, err); 
  }

}

export const main = middyfy(recipientRemoveHandler);