import { useForm } from "react-hook-form";
import { useState } from "react";

export const Register = () => {
    const { register, handleSubmit, reset } = useForm();
    const [data, setData] = useState('');

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

            if (response.status !== 201) {
                setData(response.message);
                reset();
            }

            const result = await response.json();
            setData(result.message);
            reset();
        } catch (error) {
            setError('Error al crear usuario, intenta nuevamente');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Register</h1>
            <input {...register("username", { required: true })} placeholder="Username" />
            <input {...register("email", { required: true })} type="email" placeholder="Email" />
            <input {...register("password", { required: true })} type="password" placeholder="Password" />

            {data && <p>{data}</p>}
            <button type="submit">Register</button>
        </form>
    );
};
