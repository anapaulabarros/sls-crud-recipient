import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { ReportCSVService } from '../../infra/services/ReportCSVService';

const reportCSVService = new ReportCSVService();

const recipientReportHandler: ValidatedEventAPIGatewayProxyEvent<any> = async () => {

  await reportCSVService.exportReport();

  return formatJSONResponse({
    statusCode: 200,
    body: 'export data'
  });

}

export const main = middyfy(recipientReportHandler);