import { Recipients } from 'src/model/Recipients';
import { DynamoDBRepository } from '../../libs/dynamodb-client';


export class RecipientDynamoRepository extends DynamoDBRepository {

  constructor() {
    super("RECIPENTS");
  }

  async findAll(): Promise<Array<Recipients>> {
    const result = await this.scanPage();
    return result;
  }

  async findById(id: string): Promise<any> {
    const result = await this.getItem(id);
    return result;
  }
  
  async remove(id: string): Promise<void> {
    await this.removeItem(id);
  }

  async update(id: string, data: Recipients): Promise<any> {
    await this.updateItem(id, data);
  }


  async add(data: Recipients): Promise<any | undefined> {
    await this.addItem(data);
  }
}