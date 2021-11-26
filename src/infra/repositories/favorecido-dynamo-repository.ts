import { Favorecido } from '../../domains/favorecidos/entities/favorecido';
import { DynamoDBRepository } from '../../libs/dynamodb-client';


export class FavorecidoDynamoRepository extends DynamoDBRepository {

  constructor() {
    super("RECIPENTS");
  }

  async findAll(): Promise<Array<Favorecido>> {
    const result = await this.scanPage();
    return result.Items;
  }

  async findById(id: string): Promise<any> {
    const result = await this.getItem(id);
    return result;
  }
  
  async remove(id: string): Promise<void> {
    await this.removeItem(id);
  }

  async update(id: string, data: Favorecido): Promise<any> {
    await this.updateItem(id, data);
  }


  async register(data: Favorecido): Promise<any | undefined> {
    await this.addItem(data);
  }
}