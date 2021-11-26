import { Favorecido } from "../entities/Favorecido";

export interface FindAllFavorecidosRepository {
  findAll(): Promise<Array<Favorecido>>;
}