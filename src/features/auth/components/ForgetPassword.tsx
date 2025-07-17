import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { sendResetPasswordEmail } from "@services/api.routes";
import CustomLink from "@components/ui/CustomLink";
import Button from "@components/ui/LoginButton";

interface FormValues {
  email: string;
}

export default function ForgetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const { mutateAsync } = useMutation({
    mutationFn: sendResetPasswordEmail,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await mutateAsync(data.email);
      reset();
    } catch (error) {
      console.error("Erro ao enviar email de redefinição:", error);
    }
  };

  return (
    <div className='w flex items-center justify-center bg-card p-10 rounded-xl shadow-lg border border-secondary-200'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-md space-y-4'
      >
        <h2 className='text-2xl font-bold text-center text-app'>
          Esqueceu sua senha?
        </h2>
        <p className='text-sm text-secondary-500 text-center'>
          Informe seu e-mail cadastrado e enviaremos um link para redefinir sua
          senha.
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

        <Button className='w-full bg-primary hover:bg-primary-dark text-white p-3 rounded-md'>
          Enviar link de redefinição
        </Button>

        <p className='text-center text-sm text-secondary-600'>
          Lembrou sua senha?{" "}
          <CustomLink href='/login'>Voltar para login</CustomLink>
        </p>
      </form>
    </div>
  );
}
