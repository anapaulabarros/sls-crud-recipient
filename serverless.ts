import type { AWS } from '@serverless/typescript';

import listAllFavorecidoHandler from '@functions/list-all-favorecido-handler';
import getFavorecidoHandler from '@functions/get-favorecido-handler';
import removeFornecedorHandler from '@functions/remove-fornecedor-handler';
import registerFavorecidoHandler from '@functions/register-favorecido-handler';
import updateFavorecidoHandler from '@functions/update-favorecido-handler';

const serverlessConfiguration: AWS = {
  service: 'recipient-service',
  resources: {
    Resources: {
      RecipientsTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "RECIPENTS",
          AttributeDefinitions: [
            {
              AttributeName: "cnpj_cpf",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "cnpj_cpf",
              KeyType: "HASH"
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      }
    }
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      STAGE: "${opt:stage, 'dev'}",
      RECIPIENTS_TABLE: 'RECIPENTS',
      REGION: "${self:provider.region}",
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:Query", 
          "dynamodb:scan", 
          "dynamodb:PutItem", 
          "dynamodb:DeleteItem", 
          "dynamodb:GetItem", 
          "dynamodb:UpdateItem"
        ],
        Resource: [
          "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.RECIPIENTS_TABLE}"
        ],
      },
    ],
    lambdaHashingVersion: '20201221',
  },
  functions: { 
    listAllFavorecidoHandler,
    getFavorecidoHandler,
    removeFornecedorHandler,
    registerFavorecidoHandler,
    updateFavorecidoHandler
  },
};

module.exports = serverlessConfiguration;
