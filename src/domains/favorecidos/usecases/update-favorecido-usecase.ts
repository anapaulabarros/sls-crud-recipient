import { Favorecido } from '../entities/favorecido';
import { SimplesLogger } from 'src/infra/utils/simples-logger';
import { UpdateFavorecidoRepository } from '../gateways/update-favorecido-repository';

export class UpdateFavorecidoUseCase {

  constructor(
    private updateFavorecidoRepository: UpdateFavorecidoRepository,
    private log: SimplesLogger
  ){}

  async execute(id: string, data: Favorecido): Promise<void> {
    try {
      if(!id) {
        this.log.error("Campo ID inválido");
        throw Error("Campo ID não pode ser vazio");
      }
      return await this.updateFavorecidoRepository.updateItem(id, data);
    } catch (error) {
      this.log.error("Erro ao atualizar favorecido", error);
      throw error;
    }
  }
}