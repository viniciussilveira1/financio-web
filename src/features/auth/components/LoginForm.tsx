import { useForm } from "react-hook-form";
import OAuthButtons from "@features/auth/components/OAuthButtons";
import Button from "@components/Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "@services/api.routes";
import CustomLink from "@components/CustomLink";

interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutateAsync } = useMutation({
    mutationFn: login,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await mutateAsync(data);
      console.log("Login bem-sucedido", response);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className='w flex items-center justify-center bg-white p-10 rounded-xl shadow-lg'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-md space-y-4'
      >
        <h2 className='text-2xl font-bold text-center'>
          Bem-vindo de volta ao Financio!
        </h2>
        <p className='text-sm text-gray-500 text-center'>
          Controle suas finanças de forma simples. Cadastre carteiras e registre
          suas movimentações com o Financio.
        </p>

        <input
          type='email'
          placeholder='E-mail'
          {...register("email", { required: "E-mail obrigatório" })}
          className='w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        {errors.email && (
          <p className='text-red-500 text-sm'>{errors.email.message}</p>
        )}

        <input
          type='password'
          placeholder='Senha'
          {...register("password", { required: "Senha obrigatória" })}
          className='w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        {errors.password && (
          <p className='text-red-500 text-sm'>{errors.password.message}</p>
        )}

        <div className='flex items-center justify-between text-sm'>
          <label className='flex items-center gap-2'>
            <input type='checkbox' className='accent-blue-500' />
            Lembrar meu dados
          </label>
          <CustomLink href='/login'> Esqueceu sua senha?</CustomLink>
        </div>

        <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md'>
          Entrar
        </Button>

        <div className='flex items-center my-4'>
          <div className='flex-grow h-px bg-gray-300' />
          <span className='mx-4 text-sm text-gray-500'>OU</span>
          <div className='flex-grow h-px bg-gray-300' />
        </div>

        <OAuthButtons />

        <p className='text-center text-sm text-gray-600'>
          Não tem uma conta?{" "}
          <CustomLink href='/signin'> Cadastrar-se</CustomLink>
        </p>
      </form>
    </div>
  );
}
