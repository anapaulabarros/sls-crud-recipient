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
  required: ['cnpj_cpf', 'accountId', 'name_recipient', 'bank', 'agencyId', 'type']
} as const;