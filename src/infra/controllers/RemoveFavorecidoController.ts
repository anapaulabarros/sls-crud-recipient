import { RemoveFavorecidoUseCase } from '../../domains/favorecidos/usecases/remove-favorecido-usecase';
import { makeProcessUseCase } from '../factories/usecases/remove-favorecido-factory';

export class RemoveFavorecidoController {

  readonly RemoveFavorecidoUseCase: RemoveFavorecidoUseCase;

  async execute(id: string) {
    const usecase = makeProcessUseCase();
    return usecase.execute(id);
  }
}