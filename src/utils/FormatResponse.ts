import { formatJSONResponse } from '@libs/apiGateway';

export class FormatResponse {

  formatResponseAlert(statusCode: number, msg: string): Record<number, string> {
    return formatJSONResponse({
      statusCode,
      body: msg
    })
  }

  formatResponseSuccess(statusCode: number, data: any): Record<number, Object> {
    return formatJSONResponse({
      statusCode,
      body: data.Item
    })
  }

  formatResponseError(statusCode: number, err: Error): Record<number, Object> {
    return formatJSONResponse({
      statusCode,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknow error"
      })
    })
  }
}