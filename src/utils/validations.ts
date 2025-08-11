import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

export const signUpSchema = z
  .object({
    name: z.string().nonempty("Nome obrigatório"),
    email: z.string().email("E-mail inválido").nonempty("E-mail obrigatório"),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || /^[0-9]{10,11}$/.test(val), "Telefone inválido"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(passwordRegex, {
        message:
          "A senha deve conter pelo menos uma letra maiúscula, um número e um símbolo",
      }),
    confirmPassword: z.string().nonempty("Confirmação de senha obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
