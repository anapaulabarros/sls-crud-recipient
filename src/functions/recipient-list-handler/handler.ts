import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';

const params = {
  TableName: 'RECIPENTS'
};
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const recipientListHandler: ValidatedEventAPIGatewayProxyEvent<any> = async () => {

  try {

    let data = await dynamoDb.scan(params).promise();

    return formatJSONResponse({
      statusCode: 200,
      body: data
    });
    
  } catch (err) {
    console.log("Error read data: ", err);
    return formatJSONResponse({
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknow error"
      })
    }) 
  }
}

export const main = middyfy(recipientListHandler);
