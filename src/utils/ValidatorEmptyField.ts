import { formatJSONResponse } from '@libs/apiGateway';
import { ValidatorInterface } from '../infra/interfaces/ValidatorInterface';

export class ValidatorEmptyFields implements ValidatorInterface {

  validator(field: any): Object {

    if(!field) {
      return formatJSONResponse({
        statusCode: 403,
        body: `The param ${field} don't be empty`
      });
    }
  }
}