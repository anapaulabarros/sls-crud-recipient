import { Favorecido } from "../entities/Favorecido";

export interface GetFavorecidoRepository {
  findById(id: string): Promise<Favorecido>;
}