import React, { useEffect, useState } from 'react';

export const GetAllStore = () => {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await fetch('http://localhost:3000/getAllStore'); // Asegúrate de que la URL sea correcta
                const data = await response.json();
                
                // Verificamos si `data` es un array, de lo contrario inicializamos `stores` como un array vacío
                if (Array.isArray(data)) {
                    setStores(data);
                } else {
                    setStores([]); // Si no es un array, se establece como vacío
                }
            } catch (error) {
                console.error('Error fetching stores:', error);
                setStores([]); // También aseguramos que stores sea un array vacío en caso de error
            }
        };

        fetchStores();
    }, []);

    return (
        <div>
            <h1>Lista de Tiendas</h1>
            <ul>
                {stores.length > 0 ? (
                    stores.map(store => (
                        <li key={store.id}>
                            {store.storename} (ID: {store.id})
                        </li>
                    ))
                ) : (
                    <li>No hay tiendas disponibles.</li>
                )}
            </ul>
        </div>
    );
};

