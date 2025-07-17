import Button from "@components/ui/Button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-center'>
      <h1 className='text-4xl font-bold mb-4'>404</h1>
      <p className='text-lg text-gray-600'>Página não encontrada</p>

      <Link to='/' className='mt-4'>
        <Button variant='primary'>Voltar para a página inicial</Button>
      </Link>
    </div>
  );
}
