import { SimplesLogger } from '../../../infra/utils/simples-logger';
import { Favorecido } from '../entities/Favorecido';
import { FindAllFavorecidosRepository } from '../gateways/find-all-favorecidos-repository';

export class FavorecidoListUsecase {
  
  constructor(
    private findAllFavorecidosRepository: FindAllFavorecidosRepository,
    private log: SimplesLogger,
  ){}

  async execute(): Promise<Array<Favorecido>> {
    try {

      return await this.findAllFavorecidosRepository.findAll();
      
    } catch (error) {
      this.log.error("Erro ao listar dados", error);
      throw error;
    }
  }
}