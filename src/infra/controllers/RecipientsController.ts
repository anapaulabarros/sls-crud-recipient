import { ValidatorEmptyFields } from 'src/utils/ValidatorEmptyField';
import { Recipients } from '../../model/Recipients';
import { ValidatorInterface } from '../interfaces/ValidatorInterface';
import { RecipientDynamoRepository } from '../repositories/recipient-dynamo-repository';
import { FormatResponse } from '../../utils/FormatResponse';

export class RecipientsController {

  protected listValidators: Array<ValidatorInterface>;
  protected recipientDynamoRepository: RecipientDynamoRepository;
  protected formatResponse: FormatResponse;

  constructor() {
    
    this.listValidators = [
      new ValidatorEmptyFields()
    ]; 

    this.recipientDynamoRepository = new RecipientDynamoRepository();
    this.formatResponse = new FormatResponse();
  }

  async listRecipients(): Promise<Array<Recipients>> {

    try {

      const data = await this.recipientDynamoRepository.findAll();
  
      return data;
      
    } catch (err) {
      console.log("Error read data: ", err);
      this.formatResponse.formatResponseError(500,err);
    }
      
  } 


  async getRecipient(id: string): Promise<Recipients> {
    try {

      this.listValidators.forEach(item => {
        item.validator(id);
      });

      const data = await this.recipientDynamoRepository.findById(id);
      return data;

    } catch (err) {
      console.log("Error get data: ", err);
      this.formatResponse.formatResponseError(500,err);
    }
  }

  async removeRecipient(id: string): Promise<void> {

    try {
      this.listValidators.forEach(item => {
        item.validator(id);
      });

      await this.recipientDynamoRepository.remove(id);
      
    } catch (err) {
      console.log("Error remove data: ", err);
      this.formatResponse.formatResponseError(500,err);
    }
  }

  async updateRecipient(id: string, data: Recipients): Promise<void> {
    try {
      this.listValidators.forEach(item => {
        item.validator(id);
      });
      await this.recipientDynamoRepository.update(id, data);
    } catch (err) {
      console.log("Error update data: ", err);
      this.formatResponse.formatResponseError(500,err);
    }
  }

  async insertRecipient(data: any): Promise<void> {
    try {
      this.listValidators.forEach(item => {
        item.validator(data);
      });

      let itemRecipient = {
        cnpj_cpf: data.cnpj_cpf,
        accountId: data.accountId,
        name_recipient: data.name_recipient,
        bank: data.bank,
        agencyId: data.agencyId,
        type: data.type
      };

      await this.recipientDynamoRepository.add(new Recipients(itemRecipient));

    } catch (err) {
      console.log("Error insert data: ", err);
      this.formatResponse.formatResponseError(500,err);
    }
  }

}