import React, { useEffect, useState } from 'react';

export const GetProductStore = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/getProductStore', {
                    method: 'GET',
                    credentials: 'include', // Incluir cookies
                });

                const data = await response.json();

                if (response.ok) {
                    setProducts(data);
                } else {
                    setProducts([]); // Si no hay productos, se establece como vacío
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            }
        };

        fetchProducts();
    }, []);

    const getImageUrl = (imageBuffer) => {
        const base64String = btoa(
            new Uint8Array(imageBuffer.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        return `data:image/png;base64,${base64String}`; // Cambia el tipo de imagen según sea necesario
    };

    return (
        <div>
            <h1>Lista de Productos de la Tienda</h1>
            <ul>
                {products.length > 0 ? (
                    products.map(product => (
                        <li key={product.id}>
                            <h2>{product.productname}</h2> {/* Asegúrate de que esta propiedad sea correcta */}
                            {product.imagen && (
                                <img
                                    src={getImageUrl(product.imagen)} // Obtener la URL de la imagen
                                    alt={product.productname} // Texto alternativo
                                    style={{ width: '100px', height: '100px' }} // Ajusta el tamaño según sea necesario
                                />
                            )}
                            <p>ID: {product.id}</p>
                            <p>Precio: ${product.price}</p>
                        </li>
                    ))
                ) : (
                    <li>No hay productos disponibles.</li>
                )}
            </ul>
        </div>
    );
};

