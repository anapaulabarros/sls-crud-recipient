export interface FindAllFavorecidoesService {
  findAll(): Promise<FindAllFavorecidosService.FavorecidoResponse>;
}

export namespace FindAllFavorecidosService {

  export interface FavorecidoResponse {
    id: number;
    cnpj_cpf: string;
    accountId: string;
    name_recipient: string;
    bank: string;
    agencyId: string;
    type: string;
  }
}