// app/common/components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-400 hover:text-indigo-300">
          TechCatalog
        </Link>
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-indigo-300 transition">
            Listado
          </Link>
          <Link href="/technology/new" className="hover:text-indigo-300 transition">
            Nuevo
          </Link>
        </div>
      </nav>
    </header>
  );
}