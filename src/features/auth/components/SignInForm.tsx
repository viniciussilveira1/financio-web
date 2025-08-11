import { useForm } from "react-hook-form";
import OAuthButtons from "@features/auth/components/OAuthButtons";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@services/api.routes";
import CustomLink from "@components/ui/CustomLink";
import Button from "@components/ui/LoginButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@utils/validations";
import { z } from "zod";
import { useToast } from "@components/Provider/ToastProvider";
import { useNavigate } from "react-router-dom";

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const { addToast } = useToast();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: registerUser,
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await mutateAsync(data);
      addToast("Cadastro bem-sucedido");
      navigate("/login");
    } catch (error: any) {
      const backendMessage =
        error.response?.data?.message ||
        error.message ||
        "Erro ao fazer cadastro";
      addToast(backendMessage, "error");
    }
  };

  return (
    <div className='w flex items-center justify-center bg-card p-10 rounded-xl shadow-lg border border-secondary-200'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-md space-y-4'
      >
        <h2 className='text-2xl font-bold text-center text-app'>
          Crie sua conta no <span className='text-green-500'>Financio!</span>
        </h2>
        <p className='text-sm text-secondary-500 text-center'>
          Controle suas finanças de forma simples. Cadastre carteiras e registre
          suas movimentações com o Financio.
        </p>

        <input
          type='text'
          placeholder='Nome completo'
          {...register("name", { required: "Nome obrigatório" })}
          className='w-full p-3 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white'
        />
        {errors.name && (
          <p className='text-red-500 text-sm'>{errors.name.message}</p>
        )}

        <input
          type='email'
          placeholder='E-mail'
          {...register("email", { required: "E-mail obrigatório" })}
          className='w-full p-3 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white'
        />
        {errors.email && (
          <p className='text-red-500 text-sm'>{errors.email.message}</p>
        )}

        <input
          type='tel'
          placeholder='Telefone'
          {...register("phone", {
            pattern: {
              value: /^[0-9]{10,11}$/,
              message: "Telefone inválido",
            },
          })}
          className='w-full p-3 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white'
        />

        <input
          type='password'
          placeholder='Senha'
          {...register("password", { required: "Senha obrigatória" })}
          className='w-full p-3 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white'
        />
        {errors.password && (
          <p className='text-red-500 text-sm'>{errors.password.message}</p>
        )}

        <input
          type='password'
          placeholder='Confirmar Senha'
          {...register("confirmPassword", {
            required: "Confirmação de senha obrigatória",
          })}
          className='w-full p-3 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white'
        />
        {errors.confirmPassword && (
          <p className='text-red-500 text-sm'>
            {errors.confirmPassword.message}
          </p>
        )}

        {errors.phone && (
          <p className='text-red-500 text-sm'>{errors.phone.message}</p>
        )}

        <Button className='w-full bg-primary hover:bg-primary-dark text-white p-3 rounded-md'>
          Cadastrar
        </Button>

        <div className='flex items-center my-4'>
          <div className='flex-grow h-px border border-b-gray-600' />
          <span className='mx-4 text-sm text-secondary-500'>OU</span>
          <div className='flex-grow h-px border border-b-gray-600' />
        </div>

        <OAuthButtons />

        <p className='text-center text-sm text-secondary-600'>
          Já tem uma conta? <CustomLink href='/login'>Entrar</CustomLink>
        </p>
      </form>
    </div>
  );
}
