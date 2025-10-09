// app/technology/[id]/page.tsx
'use client';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import CustomInput from '@/app/shared/components/CustomInput';

// Esquema de validación con Zod (debería coincidir con el del backend)
const technologySchema = z.object({
    name: z.string().min(3, 'Mínimo 3 caracteres').max(80, 'Máximo 80 caracteres'),
    description: z.string().max(500, 'Máximo 500 caracteres').optional().nullable(),
    website: z.string().url('URL no válida').optional().or(z.literal('')),
    category: z.enum(['frontend', 'backend', 'devops', 'data', 'mobile', 'testing', 'other']),
});

type TechnologyFormData = z.infer<typeof technologySchema>;

const categories = ['frontend', 'backend', 'devops', 'data', 'mobile', 'testing', 'other'];

export default function TechnologyForm() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const isEditMode = id !== 'new';

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<TechnologyFormData>({
        resolver: zodResolver(technologySchema),
    });

    useEffect(() => {
        if (isEditMode) {
            const fetchTechnology = async () => {
                try {
                    const res = await fetch(`/api/technologies/${id}`);
                    if (!res.ok) throw new Error('Tecnología no encontrada');
                    const data = await res.json();
                    // Llenar el formulario con los datos existentes
                    setValue('name', data.name);
                    setValue('description', data.description);
                    setValue('website', data.website || '');
                    setValue('category', data.category);
                } catch (_error) {
                    toast.error('No se pudo cargar la tecnología para editar.');
                    router.push('/');
                }
            };
            fetchTechnology();
        }
    }, [id, isEditMode, router, setValue]);

    const onSubmit: SubmitHandler<TechnologyFormData> = async (data) => {
        // Si el sitio web es un string vacío, lo convertimos en undefined para Prisma
        const submissionData = {
            ...data,
            website: data.website === '' ? undefined : data.website,
        };

        const url = isEditMode ? `/api/technologies/${id}` : '/api/technologies';
        const method = isEditMode ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || `Error al ${isEditMode ? 'actualizar' : 'crear'}`);
            }

            toast.success(`Tecnología ${isEditMode ? 'actualizada' : 'creada'} con éxito`);
            router.push('/');
            router.refresh(); // Refresca los datos en la página de listado
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Ocurrió un error inesperado');
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6">
                {isEditMode ? 'Editar Tecnología' : 'Nueva Tecnología'}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-900 p-8 rounded-lg">
                <CustomInput
                    label="Nombre"
                    {...register('name')}
                    error={errors.name?.message}
                    placeholder="Ej: React"
                />

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                        Descripción
                    </label>
                    <textarea
                        {...register('description')}
                        rows={4}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Una breve descripción de la tecnología..."
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>}
                </div>

                <CustomInput
                    label="Sitio Web"
                    type="url"
                    {...register('website')}
                    error={errors.website?.message}
                    placeholder="https://example.com"
                />

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                        Categoría
                    </label>
                    <select
                        {...register('category')}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat} className="capitalize">{cat}</option>
                        ))}
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-400">{errors.category.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition disabled:bg-gray-500"
                >
                    {isSubmitting ? 'Guardando...' : 'Guardar Tecnología'}
                </button>
            </form>
        </div>
    );
}