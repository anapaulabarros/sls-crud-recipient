// this a value object
export class UniqueEntityID {

  cnpj_cpf: string;

  constructor(cnpj_cpf: string) {

    const isCNPJCPF = this.isValidIdentifier(cnpj_cpf);
    if(!isCNPJCPF) {
      throw new Error('This invalid CNPJ or CPF');
    }
    this.cnpj_cpf = cnpj_cpf;
  }

  isValidIdentifier(value: string): boolean {

    const re = /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/;
    return re.test(String(value));
  }

  get getCNPJCPF(): string {
    return this.cnpj_cpf;
  }
}