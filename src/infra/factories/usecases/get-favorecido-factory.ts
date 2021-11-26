import { SimplesLogger } from '../../utils/simples-logger';
import { GetFavorecidoUseCase } from '../../../domains/favorecidos/usecases/get-favorecido-usecase';
import { FavorecidoDynamoRepository } from '../../repositories/favorecido-dynamo-repository';

const makeProcessUseCase = () => {

  const favorecidoRespository = new FavorecidoDynamoRepository();
  return new GetFavorecidoUseCase(
    favorecidoRespository,
    SimplesLogger.getInstance()
  );
}

export {makeProcessUseCase}