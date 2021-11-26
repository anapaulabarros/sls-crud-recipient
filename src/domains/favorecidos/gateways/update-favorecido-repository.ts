import { Favorecido } from "../entities/favorecido";

export interface UpdateFavorecidoRepository {
  updateItem(id: string, favorecido: Favorecido): Promise<void>;
}