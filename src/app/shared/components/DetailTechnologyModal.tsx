// app/shared/components/DetailTechnologyModal.tsx
'use client';
import { Technology } from '@/app/types/Technology';

interface DetailModalProps {
  technology: Technology | null;
  onClose: () => void;
}

export default function DetailTechnologyModal({ technology, onClose }: DetailModalProps) {
  if (!technology) return null;

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-CO', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg p-8 max-w-lg w-full text-white border border-gray-700 shadow-xl"
        onClick={(e) => e.stopPropagation()} // Evita que el modal se cierre al hacer clic dentro
      >
        <h2 className="text-3xl font-bold text-indigo-400 mb-4">{technology.name}</h2>
        <p className="bg-gray-700 p-3 rounded-md mb-4">{technology.description || 'Sin descripción.'}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-900 p-2 rounded">
            <span className="font-semibold text-gray-400">Categoría: </span>
            <span className="capitalize font-bold text-indigo-300">{technology.category}</span>
          </div>
          <div className="bg-gray-900 p-2 rounded truncate">
            <span className="font-semibold text-gray-400">Sitio Web: </span>
            <a
              href={technology.website || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {technology.website || 'No disponible'}
            </a>
          </div>
          <div className="bg-gray-900 p-2 rounded">
            <span className="font-semibold text-gray-400">Creado el: </span>
            <span>{formatDateTime(technology.created_at)}</span>
          </div>
          <div className="bg-gray-900 p-2 rounded">
            <span className="font-semibold text-gray-400">Actualizado el: </span>
            <span>{formatDateTime(technology.updated_at)}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}