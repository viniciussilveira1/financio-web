export interface CreateMovement {
  description: string;
  category: MovementCategory;
  amount: number;
  type: MovementType;
  date: string;
  walletId: number;
}

export enum MovementType {
  RENDA = "RENDA",
  DESPESA = "DESPESA",
}

export const MovementTypeOptions = {
  [MovementType.RENDA]: "Renda",
  [MovementType.DESPESA]: "Despesa",
};

export enum MovementCategory {
  // Income
  SALARIO = "SALARIO",
  INVESTIMENTOS = "INVESTIMENTOS",

  // Expense
  ALIMENTACAO = "ALIMENTACAO",
  TRANSPORTE = "TRANSPORTE",
  LAZER = "LAZER",
  SAUDE = "SAUDE",
  MORADIA = "MORADIA",
  EDUCACAO = "EDUCACAO",

  // Ambos
  OUTROS = "OUTROS",
}
