import Link from 'next/link';

export default function Navbar(){
  
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link className="text-white text-lg font-bold" href="/">
          Cinema Booking
        </Link>
        <div className='flex gap-3'>
          <Link className="text-white text-lg font-bold" href="/register">
            Register
          </Link>
          <Link className="text-white text-lg font-bold" href="/login">
            Login
          </Link>
          <Link className="text-white text-lg font-bold" href="/logout">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}