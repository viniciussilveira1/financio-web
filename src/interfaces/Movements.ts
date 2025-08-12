export interface CreateMovement {
  description: string;
  category: MovementCategory;
  amount: number;
  type: MovementType;
  date: string;
  walletId: number;
}

export interface MovementResponse {
  id: number;
  amount: string;
  type: MovementType;
  category: string;
  description: string;
  date: string;
  walletId: number;
  createdAt: string;
  updatedAt: string;
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

export const MovementCategoryFriendly = {
  // Income
  [MovementCategory.SALARIO]: "Salário",
  [MovementCategory.INVESTIMENTOS]: "Investimentos",

  // Expense
  [MovementCategory.ALIMENTACAO]: "Alimentação",
  [MovementCategory.TRANSPORTE]: "Transporte",
  [MovementCategory.LAZER]: "Lazer",
  [MovementCategory.SAUDE]: "Saúde",
  [MovementCategory.MORADIA]: "Moradia",
  [MovementCategory.EDUCACAO]: "Educação",

  // Ambos
  [MovementCategory.OUTROS]: "Outros",
};
