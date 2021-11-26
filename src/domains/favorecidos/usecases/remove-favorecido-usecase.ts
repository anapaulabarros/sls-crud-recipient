import { SimplesLogger } from 'src/infra/utils/simples-logger';
import { RemoveFavorecidoRepository } from '../gateways/remove-favorecido-repository';

export class RemoveFavorecidoUseCase {

  constructor(
    private removeFavorecidoRepository: RemoveFavorecidoRepository,
    private log: SimplesLogger
  ){};

  async execute(id: string): Promise<void> {
    try {
      if(!id) {
        this.log.error("Campo ID inválido");
        throw Error("Campo ID não pode ser vazio");
      }

      return await this.removeFavorecidoRepository.removeItem(id);

    } catch (error) {
      this.log.error("Erro ao obter favorecido", error);
      throw error;
    }
  }
}