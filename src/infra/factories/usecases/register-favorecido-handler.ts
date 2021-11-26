import { FavorecidoDynamoRepository } from '../../repositories/favorecido-dynamo-repository';
import { SimplesLogger } from "../../utils/simples-logger";
import { RegisterFavorecidoUseCase } from 'src/domains/favorecidos/usecases/register-favorecido-usecase';

const makeProcessUseCase = () => {

  const FavorecidoRespository = new FavorecidoDynamoRepository();
  return new RegisterFavorecidoUseCase(
    FavorecidoRespository,
    SimplesLogger.getInstance()
  )
};

export { makeProcessUseCase };