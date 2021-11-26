import { FavorecidoDynamoRepository } from '../../repositories/favorecido-dynamo-repository';
import { SimplesLogger } from "../../utils/simples-logger";
import { RemoveFavorecidoUseCase } from '../../../domains/favorecidos/usecases/remove-favorecido-usecase';

const makeProcessUseCase = () => {

  const FavorecidoRespository = new FavorecidoDynamoRepository();

  return new RemoveFavorecidoUseCase(
    FavorecidoRespository,
    SimplesLogger.getInstance()
  );
}

export { makeProcessUseCase };