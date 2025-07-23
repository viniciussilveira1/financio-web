import type { Login } from "interfaces/User";
import { apiInstance } from "./config";
import type { Register } from "react-router-dom";
import type { CreateWallet } from "interfaces/Wallets";
import type { CreateMovement } from "interfaces/Movements";

export const login = async (loginData: Login) =>
  apiInstance.post(`/auth/login`, loginData).then((res) => res.data);

export const me = async () =>
  apiInstance.get(`/users/me`).then((res) => res.data);

export const registerUser = async (registerData: Register) =>
  apiInstance.post(`/users`, registerData).then((res) => res.data);

export const sendResetPasswordEmail = async (email: string) =>
  apiInstance.post(`/auth/reset-password`, { email }).then((res) => res.data);

export const getWalletsList = async () =>
  apiInstance.get(`/wallets`).then((res) => res.data);

export const getMovementsByWalletId = async (walletId: number) =>
  apiInstance.get(`/movements/wallet/${walletId}`).then((res) => res.data);

export const createWallet = async (walletData: CreateWallet) =>
  apiInstance.post(`/wallets`, walletData).then((res) => res.data);

export const createMovement = async (movementData: CreateMovement) =>
  apiInstance.post(`/movements`, movementData).then((res) => res.data);
