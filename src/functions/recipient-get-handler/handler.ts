import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { RecipientDynamoRepository } from '../../infra/repositories/recipient-dynamo-repository';
import { ValidatorEmptyFields } from '../../utils/ValidatorEmptyField';
import { FormatResponse } from '../../utils/FormatResponse';


// instance
const recipientRepository = new RecipientDynamoRepository();
const validatorEmptyFields = new ValidatorEmptyFields();
const formatResponse = new FormatResponse();

const recipientGetHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  try {

    validatorEmptyFields.validator(event.pathParameters.cnpj_cpf);

    const data = await recipientRepository.findById(event.pathParameters.cnpj_cpf);

    if(Object.keys(data).length === 0) {
      return formatJSONResponse({
        statusCode: 404,
        body: "Data doesn’t exists"
      })
    } 

    return formatJSONResponse({
      statusCode: 200,
      body: data.Item
    });
    
  } catch (err) {
    console.log("Error find data: ", err);
    formatResponse.formatResponseError(500,err); 
  }

}

export const main = middyfy(recipientGetHandler);