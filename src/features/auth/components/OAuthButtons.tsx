import { FcGoogle } from "react-icons/fc";

export default function OAuthButtons({ className }: { className?: string }) {
  return (
    <div>
      <button
        type='button'
        className={`w-full relative shadow-md flex items-center justify-center gap-2 ${className}`}
        onClick={() => {
          window.location.href = `${import.meta.env.VITE_API_URL}${
            import.meta.env.VITE_GOOGLE_API_URL
          }`;
        }}
      >
        <div className='absolute left-4'>
          <FcGoogle size={24} />
        </div>

        <span className='font-medium'>Continuar com Google</span>
      </button>
    </div>
  );
}
