import { useForm } from "react-hook-form";
import OAuthButtons from "@features/auth/components/OAuthButtons";
import Button from "@components/Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "@services/api.routes";
import CustomLink from "@components/CustomLink";
import { useToast } from "@components/ToastProvider";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { addToast } = useToast();

  const { mutateAsync } = useMutation({
    mutationFn: login,
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      await mutateAsync(data);
      addToast("Login bem-sucedido");
      window.location.href = "/";
    } catch (error: any) {
      addToast(error.response?.data?.message, "error");
    }
  };

  return (
    <div className='w flex items-center justify-center bg-card p-10 rounded-xl shadow-lg border border-secondary-200'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-md space-y-4'
      >
        <h2 className='text-2xl font-bold text-center text-app'>
          Bem-vindo de volta ao Financio!
        </h2>
        <p className='text-sm text-secondary-500 text-center'>
          Controle suas finanças de forma simples. Cadastre carteiras e registre
          suas movimentações com o Financio.
        </p>

        <input
          type='email'
          placeholder='E-mail'
          {...register("email", { required: "E-mail obrigatório" })}
          className='w-full p-3 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white'
        />
        {errors.email && (
          <p className='text-red-500 text-sm'>{errors.email.message}</p>
        )}

        <div className='relative'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Senha'
            {...register("password", { required: "Senha obrigatória" })}
            className='w-full p-3 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary pr-10 bg-white'
          />
          <span
            role='button'
            tabIndex={0}
            className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors duration-200 hover:text-primary focus:text-primary'
            onClick={() => setShowPassword((prev) => !prev)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setShowPassword((prev) => !prev);
              }
            }}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={26} />
            ) : (
              <AiOutlineEye size={26} />
            )}
          </span>
        </div>
        {errors.password && (
          <p className='text-red-500 text-sm'>{errors.password.message}</p>
        )}

        <div className='flex items-center justify-between text-sm'>
          <label className='flex items-center gap-2 cursor-pointer text-app'>
            <input
              type='checkbox'
              className='accent-primary cursor-pointer'
              {...register("rememberMe")}
            />
            Lembrar meu dados
          </label>
          <CustomLink href='/forget-password'> Esqueceu sua senha?</CustomLink>
        </div>

        <Button className='w-full bg-primary hover:bg-primary-dark text-white p-3 rounded-md'>
          Entrar
        </Button>

        <div className='flex items-center my-4 '>
          <div className='flex-grow h-px bg-secondary-200 border border-secondary-200' />
          <span className='mx-4 text-sm text-secondary-500'>OU</span>
          <div className='flex-grow h-px bg-secondary-200 border border-secondary-200' />
        </div>

        <OAuthButtons />

        <p className='text-center text-sm text-secondary-600'>
          Não tem uma conta?{" "}
          <CustomLink href='/signin'> Cadastrar-se</CustomLink>
        </p>
      </form>
    </div>
  );
}
