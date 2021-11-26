 type FavorecidoConstructor = Omit<
  Favorecido,
  "isActive"  |
  "identifierFavorecido"
>;
export class Favorecido {

  id?: string;
  cnpj_cpf: string;
  accountId: string;
  name_recipient: string;
  bank: string;
  agencyId: string;
  type: string;
  status?: boolean;
  created_at?: Date;
  updated_at?: Date;


  constructor(init: FavorecidoConstructor) {
    this.id = init.id;
    this.cnpj_cpf = init.cnpj_cpf;
    this.accountId = init.accountId;
    this.name_recipient = init.name_recipient;
    this.bank = init.bank;
    this.agencyId = init.agencyId;
    this.type = init.type;
    this.status = true;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  get isActive(): boolean {
    return this.status;
  }

  get identifierFavorecido(): string {
    return this.cnpj_cpf;
  }
}