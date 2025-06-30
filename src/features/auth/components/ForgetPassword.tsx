import { useForm } from "react-hook-form";
import Button from "@components/Button";
import { useMutation } from "@tanstack/react-query";
import { sendResetPasswordEmail } from "@services/api.routes";
import CustomLink from "@components/CustomLink";

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
    <div className='w flex items-center justify-center bg-white p-10 rounded-xl shadow-lg'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-md space-y-4'
      >
        <h2 className='text-2xl font-bold text-center'>Esqueceu sua senha?</h2>
        <p className='text-sm text-gray-500 text-center'>
          Informe seu e-mail cadastrado e enviaremos um link para redefinir sua
          senha.
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

        <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md'>
          Enviar link de redefinição
        </Button>

        <p className='text-center text-sm text-gray-600'>
          Lembrou sua senha?{" "}
          <CustomLink href='/login'>Voltar para login</CustomLink>
        </p>
      </form>
    </div>
  );
}
