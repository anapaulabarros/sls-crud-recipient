export default {
  type: "object",
  properties: {
    cnpj_cpf: { type: 'string' }
  },
  required: ['cnpj_cpf']
} as const;
