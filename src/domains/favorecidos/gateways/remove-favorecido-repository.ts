
export interface RemoveFavorecidoRepository {
  removeItem(id: string): Promise<void>;
}