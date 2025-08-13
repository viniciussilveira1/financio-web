import { FcGoogle } from "react-icons/fc";

export default function OAuthButtons({ className }: { className?: string }) {
  const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
  const googlePath = import.meta.env.VITE_GOOGLE_API_URL?.replace(/^\//, "");
  const url = `${baseUrl}/${googlePath}`;

  return (
    <div>
      <button
        type='button'
        className={`
          w-full
          relative
          shadow-md
          flex
          items-center
          justify-center
          border
          oauth-button
          rounded-md
          py-3
          ${className}
        `}
        onClick={() => {
          window.location.href = url;
        }}
      >
        <div className='absolute left-4'>
          <FcGoogle size={28} />
        </div>

        <span className='font-medium'>Continuar com Google</span>
      </button>
    </div>
  );
}
