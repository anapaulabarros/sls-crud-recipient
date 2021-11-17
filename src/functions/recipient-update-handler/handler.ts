import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import * as AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const recipientUpdateHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  try {

    const timestamp = new Date().getTime();

    if(!event.pathParameters.cnpj_cpf) {
      return formatJSONResponse({
        statusCode: 403,
        body: "The param accountId don't be empty"
      });
    }

    await dynamoDb
      .update({
        TableName: 'RECIPENTS',
        Key: {
          cnpj_cpf: event.pathParameters.cnpj_cpf
        },
        UpdateExpression:
          'SET name_recipient = :name_recipient, accountId = :accountId,' 
          + ' agencyId = :agencyId, updated_at = :updated_at,'
          + ' type = :type',
        ConditionExpression: 'attribute_exists(cnpj_cpf)',
        ExpressionAttributeValues: {
          ':name_recipient': event.body.name_recipient,
          ':agencyId': event.body.agencyId,
          ':accountId': event.body.accountId,
          ':type': event.body.type,
          ':bank': event.body.bank,
          ':updated_at': timestamp
        }
      })
      .promise()

    return formatJSONResponse({
      statusCode: 204
    });

    
  } catch (err) {
    console.log("Error uodate data: ", err);
    return formatJSONResponse({
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknow error"
      })
    }) 
  }

}

export const main = middyfy(recipientUpdateHandler);