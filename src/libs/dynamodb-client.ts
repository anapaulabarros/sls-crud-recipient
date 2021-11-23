import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Recipients } from '../model/Recipients';
import { v4 as uuidv4 } from 'uuid';

export abstract class DynamoDBRepository {

  private ddb: DocumentClient;

  constructor(
    protected tableName: string
  ) {
    this.ddb = new AWS.DynamoDB.DocumentClient();
  }

  async scanPage(): Promise<any | undefined> {
    try {
      const response = await this.ddb.scan({
        TableName: this.tableName
      }).promise();
      return response;  

    } catch (error) {
      return error;
    }
  }

  async getItem(id: string): Promise<any | undefined> {
    try {
      
      const response = await this.ddb.get({
        TableName: this.tableName,
        Key: {
          cnpj_cpf: id
        }
      }).promise();

      return response;

    } catch (error) {
      return error;
    }
  }

  async removeItem(id: string): Promise<void> {
    try {
      await this.ddb.delete({
        TableName: this.tableName,
        Key: {
          cnpj_cpf: id
        },
        ConditionExpression: 'attribute_exists(cnpj_cpf)'
      }).promise();

    } catch (error) {
      return error;
    }
  }

  async updateItem(id: string, data: Recipients): Promise<any | undefined> {
    try {
      const timestamp = new Date().getTime();
      await this.ddb
        .update({
          TableName: this.tableName,
          Key: {
            cnpj_cpf: id
          },
          UpdateExpression:
            'SET name_recipient = :name_recipient, accountId = :accountId,' 
            + ' agencyId = :agencyId, updated_at = :updated_at,'
            + ' type = :type',
          ConditionExpression: 'attribute_exists(cnpj_cpf)',
          ExpressionAttributeValues: {
            ':name_recipient': data.name_recipient,
            ':agencyId': data.agencyId,
            ':accountId': data.accountId,
            ':type': data.type,
            ':bank': data.bank,
            ':updated_at': timestamp
          }
        })
        .promise()
    } catch (error) {
      return error;
    }
  }

  async addItem(data: Recipients): Promise<any> {
    try {
      const timestamp = new Date().getTime();

      const newRecipient = {
        recipient_id: uuidv4(),
        name_recipient: data.name_recipient,
        cnpj_cpf: data.cnpj_cpf,
        accountId: data.accountId,
        type: data.type,
        agencyId: data.agencyId,
        bank: data.bank,
        status: true,
        created_at: timestamp,
        updated_at: timestamp
      };

      const itemsPut = {
        TableName: this.tableName,
        Item: newRecipient
      };

      await this.ddb.put(itemsPut).promise();

    } catch (error) {
      return error;
    }
  }
}