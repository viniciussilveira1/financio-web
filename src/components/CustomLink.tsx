import { Link } from "react-router-dom";

export default function CustomLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={href}
      className='text-primary hover:text-primary-dark hover:underline transition-colors'
    >
      {children}
    </Link>
  );
}
