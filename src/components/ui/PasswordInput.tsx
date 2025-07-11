import type { UseFormRegister } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface PasswordInputProps {
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
  register: UseFormRegister<T>;
}

export default function PasswordInput({
  showPassword,
  setShowPassword,
  register,
}: PasswordInputProps) {
  return (
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
        onClick={() => setShowPassword(!showPassword)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setShowPassword(!showPassword);
          }
        }}
      >
        {showPassword ? (
          <AiOutlineEyeInvisible size={26} />
        ) : (
          <AiOutlineEye size={26} />
        )}
      </span>
    </div>
  );
}
