// app/page.tsx
'use client';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Technology } from '@/app/types/Technology';
import DetailTechnologyModal from '@/app/shared/components/DetailTechnologyModal';

export default function ListadoPage() {
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
    const router = useRouter();

    const fetchTechnologies = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/technologies');
            if (!res.ok) throw new Error('Error al cargar las tecnologías');
            const data = await res.json();
            setTechnologies(data);
        } catch {
            toast.error('No se pudieron cargar las tecnologías.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTechnologies();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta tecnología?')) {
            return;
        }
        try {
            const res = await fetch(`/api/technologies/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error al eliminar');
            }

            toast.success('Tecnología eliminada con éxito');
            // Actualiza la lista sin volver a hacer fetch
            setTechnologies((prev) => prev.filter((tech) => tech.id !== id));
        } catch (error: unknown) {
            // Verificamos el tipo de error
            if (error instanceof Error) {
                toast.error(error.message || 'No se pudo eliminar la tecnología.');
            } else {
                toast.error('No se pudo eliminar la tecnología.');
            }
        }
    };

    const filteredTechnologies = useMemo(() =>
        technologies.filter((tech) =>
            tech.name.toLowerCase().includes(searchTerm.toLowerCase())
        ), [technologies, searchTerm]
    );

    if (loading) return <p className="text-center text-white">Cargando...</p>;

    return (
        <div>
            <h1 className="text-4xl font-bold text-white mb-6">Listado de Tecnologías</h1>
            <input
                type="text"
                placeholder="Buscar tecnología..."
                className="w-full p-2 mb-6 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTechnologies.map((tech) => (
                    <div key={tech.id} className="bg-gray-900 p-4 rounded-lg shadow-lg flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-indigo-400">{tech.name}</h2>
                            <p className="text-gray-400 capitalize">{tech.category}</p>
                        </div>
                        <div className="flex space-x-2 mt-4">
                            <button onClick={() => setSelectedTech(tech)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded">
                                Ver Detalle
                            </button>
                            <button onClick={() => router.push(`/technology/${tech.id}`)} className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm py-1 px-3 rounded">
                                Editar
                            </button>
                            <button onClick={() => handleDelete(tech.id)} className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded">
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTechnologies.length === 0 && (
                <p className="text-center text-gray-400 mt-8">No se encontraron tecnologías.</p>
            )}

            <DetailTechnologyModal
                technology={selectedTech}
                onClose={() => setSelectedTech(null)}
            />
        </div>
    );
}