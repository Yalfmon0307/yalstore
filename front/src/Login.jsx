import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react'


export const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const [data, setData] = useState('');

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });

            if (response.status !== 200) {
                setData(response.message);
                console.log(response)
                reset();
            }

            const result = await response.json();
            setData(result.message);
            reset();
        } catch (error) {
            console.error('Error en el login:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    {...register('username', { required: true })}
                />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    {...register('password', { required: true })}
                />
            </div>

            {data && <p>{data}</p>} 
            
            <button type="submit">Login</button>
        </form>
    );
};

