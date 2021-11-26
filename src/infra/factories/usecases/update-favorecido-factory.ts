import { SimplesLogger } from 'src/infra/utils/simples-logger';
import { UpdateFavorecidoUseCase } from 'src/domains/favorecidos/usecases/update-favorecido-usecase';
import { FavorecidoDynamoRepository } from 'src/infra/repositories/favorecido-dynamo-repository';

const makeProcessUseCase = () => {
  const favorecidoDynamoRepository = new FavorecidoDynamoRepository();
  return new UpdateFavorecidoUseCase(
    favorecidoDynamoRepository,
    SimplesLogger.getInstance()
  )
}

export { makeProcessUseCase };