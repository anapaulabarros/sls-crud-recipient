import { GetFavorecidoUseCase } from '../../domains/favorecidos/usecases/get-favorecido-usecase';
import { makeProcessUseCase } from '../factories/usecases/get-favorecido-factory';

export class GetFavorecidoController {

  readonly GetFavorecidoUseCase: GetFavorecidoUseCase;

  async execute(id: string) {
    const usecase = makeProcessUseCase();
    return usecase.execute(id);
  }
}