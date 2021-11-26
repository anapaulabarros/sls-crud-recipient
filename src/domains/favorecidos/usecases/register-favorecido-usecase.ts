import { RegisterFavorecidoRepository } from '../gateways/register-favorecido-repository';
import { SimplesLogger } from "src/infra/utils/simples-logger";
import { v4 as uuidv4 } from 'uuid';
import { Favorecido } from '../entities/Favorecido';

export class RegisterFavorecidoUseCase {

  constructor(
    private registerFavorecidoRepository: RegisterFavorecidoRepository,
    private log: SimplesLogger
  ){}

  async execute(item: any): Promise<void> {
    try {
      const newFavorecido = this.builderFavorecido(item);
      await this.registerFavorecidoRepository.register(newFavorecido);
    } catch (error) {
      this.log.error("Erro ao registrar novo favorecido", error);
      throw error;
    }
  }


  private builderFavorecido(data: any): Favorecido {

    let itemRecipient = {
      id: uuidv4(),
      cnpj_cpf: data.cnpj_cpf,
      accountId: data.accountId,
      name_recipient: data.name_recipient,
      bank: data.bank,
      agencyId: data.agencyId,
      type: data.type
    };
    return new Favorecido(itemRecipient);
  }
}
