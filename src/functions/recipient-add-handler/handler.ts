import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { v4 as uuidv4 } from 'uuid';

import schema from './schema';
import * as AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const recipientAddHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  
  
  try {
    
    const timestamp = new Date().getTime();

    if(!event.body) {
      throw new Error('The body is empty');
    }

    const newRecipient = {
      recipient_id: uuidv4(),
      name_recipient: event.body.name_recipient,
      cnpj_cpf: event.body.cnpj_cpf,
      accountId: event.body.accountId,
      type: event.body.type,
      agencyId: event.body.agencyId,
      bank: event.body.bank,
      status: true,
      created_at: timestamp,
      updated_at: timestamp
    };

    const itemsPut = {
      TableName: 'RECIPENTS',
      Item: newRecipient
    };

    await dynamoDb.put(itemsPut).promise();

    return formatJSONResponse({
      statusCode: 201,
      body: {
        message: "Item successfully inserted"
      }
    });

  } catch (err) {
    console.log("Error add data: ", err);
    return formatJSONResponse({
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknow error"
      })
    }) 
  }

}

export const main = middyfy(recipientAddHandler);