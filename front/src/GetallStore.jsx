import React, { useEffect, useState } from 'react';

export const GetAllStore = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await fetch('http://localhost:3000/getAllStore'); // Ajusta la ruta según tu configuración
                if (!response.ok) {
                    throw new Error('Failed to fetch stores');
                }
                const data = await response.json();
                setStores(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Stores</h1>
            <ul>
                {stores.map((store) => (
                    <li key={store.id}>
                        {store.storeName} (Owner ID: {store.ownerId})
                    </li>
                ))}
            </ul>
        </div>
    );
};

