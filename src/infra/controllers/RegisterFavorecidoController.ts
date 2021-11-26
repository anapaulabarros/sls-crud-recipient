import { RegisterFavorecidoUseCase } from 'src/domains/favorecidos/usecases/register-favorecido-usecase';
import { makeProcessUseCase } from '../factories/usecases/register-favorecido-handler';

export class RegisterFavorecidoController {

  readonly RegisterFavorecidoUseCase: RegisterFavorecidoUseCase;

  async execute(favorecido: any) {
    const usecase = makeProcessUseCase();
    return await usecase.execute(favorecido);
  }
}