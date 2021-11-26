import { Favorecido } from "../entities/Favorecido";

export interface RegisterFavorecidoRepository {
  register(favorecido: Favorecido): Promise<void>;
}