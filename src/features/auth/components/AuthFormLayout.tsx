export const AuthFormLayout = ({ children }: { children: React.ReactNode }) => (
  <div className='w flex items-center justify-center bg-white p-10 rounded-xl shadow-lg'>
    <form className='w-full max-w-md space-y-4'>{children}</form>
  </div>
);
