import { SimplesLogger } from "src/infra/utils/simples-logger";
import { Favorecido } from "../entities/Favorecido";
import { GetFavorecidoRepository } from "../gateways/get-favorecido-repository";

export class GetFavorecidoUseCase {

  constructor(
    private getFavorecidoRepository: GetFavorecidoRepository,
    private log: SimplesLogger
  ) {};

  async execute(id: string): Promise<Favorecido | undefined> {
    try {
      
      if(!id) {
        this.log.error("Campo ID inválido");
        throw Error("Campo ID não pode ser vazio");
      }

      return await this.getFavorecidoRepository.findById(id);
      
    } catch (error) {
      this.log.error("Erro ao obter favorecido", error);
      throw error;
    }
  }
}