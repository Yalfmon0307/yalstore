import React from 'react';
import { useForm } from 'react-hook-form';

export const CreateProduct = () => {
    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('productName', data.productName);
        formData.append('price', data.price);
        formData.append('file', data.file[0]); // Asumiendo que el archivo se subirá como un solo archivo

        try {
            const response = await fetch('http://localhost:3000/createProduct', {
                method: 'POST',
                body: formData,
                credentials: 'include', // Para enviar cookies
            });

            const result = await response.json();
            console.log(result);

        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Product Name</label>
                <input type="text" {...register('productName', { required: true })} />
            </div>
            <div>
                <label>Price</label>
                <input type="number" {...register('price', { required: true })} />
            </div>
            <div>
                <label>Image</label>
                <input type="file" {...register('file')} />
            </div>
            <button type="submit">Create Product</button>
        </form>
    );
};

