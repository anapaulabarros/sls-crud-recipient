import { UpdateFavorecidoUseCase } from 'src/domains/favorecidos/usecases/update-favorecido-usecase';
import { makeProcessUseCase } from 'src/infra/factories/usecases/update-favorecido-factory';

export class UpdateFavorecidoUseController {
  readonly UpdateFavorecidoUseCase: UpdateFavorecidoUseCase;

  async execute(id: string, data: any) {
    const usecase = makeProcessUseCase();
    return usecase.execute(id, data);
  }
}