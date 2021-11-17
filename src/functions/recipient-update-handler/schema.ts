export default {
  type: "object",
  properties: {
    cnpj_cpf: { type: 'string' },
    accountId: { type: 'string' },
    name_recipient: {type:  'string'},
    bank: {type: 'string'},
    agencyId: {type: 'string'},
    type: {type: 'string'}

  },
  required: ['cnpj_cpf']
} as const;