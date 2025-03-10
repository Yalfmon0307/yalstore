import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const CreateStore = () => {
    const { register, handleSubmit, reset } = useForm();
    const [data, setData] = useState('');

    const onSubmit = async (formData) => {
        try {
            const response = await fetch("http://localhost:3000/createStore", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include", // Incluye las cookies
            });

            if (response.status !== 201) {
                setData(response.message);
                reset();
            }

            const result = await response.json();
            setData(result.message);
            reset();

        } catch (error) {
            setError('Error al crear tienda, intenta nuevamente');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Crear Tienda</h1>
            <input {...register("storeName", { required: true })} placeholder="Nombre de la tienda" />
            {data && <p>{data}</p>}
            <button type="submit">Crear Tienda</button>
        </form>
    );
};

