// app/common/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4 mt-auto">
      <div className="container mx-auto px-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} TechCatalog. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}