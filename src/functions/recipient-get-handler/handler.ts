import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import * as AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const recipientGetHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  try {

    if(!event.pathParameters.cnpj_cpf) {
      return formatJSONResponse({
        statusCode: 403,
        body: "The param cnpj_cpf don't be empty"
      });
    }

    const data = await dynamoDb.get({
      TableName: 'RECIPENTS',
      Key: {
        cnpj_cpf: event.pathParameters.cnpj_cpf
      }
    })
    .promise();


    if(!data.Item) {
      return formatJSONResponse({
        statusCode: 404,
        body: "Data doesn’t exists"
      });
    }

    return formatJSONResponse({
      statusCode: 200,
      body: data.Item
    });

    
  } catch (err) {
    console.log("Error find data: ", err);
    return formatJSONResponse({
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknow error"
      })
    }) 
  }

}

export const main = middyfy(recipientGetHandler);