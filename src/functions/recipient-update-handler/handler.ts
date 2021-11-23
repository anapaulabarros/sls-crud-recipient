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

const recipientUpdateHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: any) => {

  try {

    validatorEmptyFields.validator(event.pathParameters.cnpj_cpf);
    await recipientRepository.update(event.pathParameters.cnpj_cpf, event.body);

    return formatJSONResponse({
      statusCode: 204
    });

    
  } catch (err) {
    console.log("Error uodate data: ", err);
    formatResponse.formatResponseError(500, err);
  }

}

export const main = middyfy(recipientUpdateHandler);