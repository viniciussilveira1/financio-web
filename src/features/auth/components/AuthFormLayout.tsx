export const AuthFormLayout = ({ children }: { children: React.ReactNode }) => (
  <div className='w flex items-center justify-center bg-card p-10 rounded-xl shadow-lg border border-secondary-200'>
    <form className='w-full max-w-md space-y-4'>{children}</form>
  </div>
);
