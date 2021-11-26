import { SimplesLogger } from "../../utils/simples-logger";
import { FavorecidoListUsecase } from '../../../domains/favorecidos/usecases/favorecido-list-all-usecase';
import { FavorecidoDynamoRepository } from '../../repositories/favorecido-dynamo-repository';


const makeProcessUseCase = () => {

  const FavorecidoRespository = new FavorecidoDynamoRepository();
  return new FavorecidoListUsecase(
    FavorecidoRespository,
    SimplesLogger.getInstance()
  );
}

export { makeProcessUseCase };