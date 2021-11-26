import { FavorecidoListUsecase } from '../../domains/favorecidos/usecases/favorecido-list-all-usecase';
import { makeProcessUseCase } from '../factories/usecases/find-all-favorecidos-factory';


export class FindAllFavorecidosController {

  readonly FavorecidoListUseCase: FavorecidoListUsecase;

  async execute() {
    const usecase = makeProcessUseCase();
    return await usecase.execute();
  }
}