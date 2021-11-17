import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import * as AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const recipientRemoveHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  try {

    if(!event.pathParameters.cnpj_cpf) {
      return formatJSONResponse({
        statusCode: 403,
        body: "The param accountId don't be empty"
      });
    }

    await dynamoDb.delete({
      TableName: 'RECIPENTS',
      Key: {
        cnpj_cpf: event.pathParameters.cnpj_cpf
      },
      ConditionExpression: 'attribute_exists(cnpj_cpf)'
    }).promise();

    return formatJSONResponse({
      statusCode: 204,
      body: {
        message: "Item removed with Successful"
      }
    });

    
  } catch (err) {
    console.log("Error delete data: ", err);
    return formatJSONResponse({
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknow error"
      })
    }) 
  }

}

export const main = middyfy(recipientRemoveHandler);