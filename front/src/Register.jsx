import { useForm } from "react-hook-form";
import { useState } from "react";

export const Register = () => {
    const { register, handleSubmit, reset } = useForm();
    const [data, setData] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async (formData) => {
        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            // Verifica el estado de la respuesta
            if (response.ok) { // Esto captura 200 y 201
                const result = await response.json();
                setData(result.message);
                setError("");
                reset(); // Limpia el formulario en caso de éxito
            } else {
                // Si no es exitoso, establece el error
                const result = await response.json();
                setError(result.error || 'Error al crear usuario, intenta nuevamente');
                setData("");
            }
        } catch (error) {
            setError('Error al crear usuario, intenta nuevamente');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Register</h1>
            <input {...register("username", { required: true })} placeholder="Username" />
            <input {...register("email", { required: true })} placeholder="Email" />
            <input {...register("password", { required: true })} placeholder="Password" />

            {data && <p>{data}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Register</button>
        </form>
    );
};
