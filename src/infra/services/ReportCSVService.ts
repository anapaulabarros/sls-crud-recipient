import { RecipientDynamoRepository } from '../repositories/recipient-dynamo-repository';
import { FormatResponse } from '../../utils/FormatResponse';
import { Recipients } from 'src/model/Recipients';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


export class ReportCSVService {

  protected recipientDynamoRepository: RecipientDynamoRepository;
  protected formatResponse: FormatResponse;

  constructor() {
    
    this.recipientDynamoRepository = new RecipientDynamoRepository();
    this.formatResponse = new FormatResponse();
  }

  async exportReport(): Promise<any> {
    try {
      
      const data = await this.recipientDynamoRepository.findAll();
      await this.fromCSV(data);

    } catch (err) {
      console.log("Error export csv: ", err);
      this.formatResponse.formatResponseError(500,err);
    }
  }

  async fromCSV(rows: any): Promise<any> {
    
    const csvWriter = createCsvWriter({
      path: `${__dirname}/files/report.csv`,
      header: [
        {id: 'favorecido', title: 'FAVORECIDO'},
        {id: 'cnpj_cpf', title: 'CNPJ_CPF'},
        {id: 'banco', title: 'BANCO'},
        {id: 'accountId', title: 'ACCOUNT_ID'},
        {id: 'agencia', title: 'AGENCIA'},
        {id: 'tipo', title: 'TIPO_CONTA'},
        {id: 'status', title: 'STATUS'}
      ]
    });

    const records = rows.Items.map((item: Recipients) => ({
      favorecido: item.name_recipient,
      cnpj_cpf: item.cnpj_cpf,
      banco: item.bank,
      accountId: item.accountId,
      agencia: item.agencyId,
      tipo: item.type === 'CURRENT' ? 'conta corrente' : 'conta poupanca',
      status: item.status === true ? 'ativo' : 'inativo'
    }));

    csvWriter.writeRecords(records)
      .then(() => {
        console.log('exporting data');
      });

  }
}