import { Link } from "react-router-dom";

export default function CustomLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link to={href} className='text-blue-600 hover:underline'>
      {children}
    </Link>
  );
}
