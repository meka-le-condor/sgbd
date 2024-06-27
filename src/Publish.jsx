import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Publish() {
    const [publish, setPublish] = useState([]);

    useEffect(() => {
        // Function to fetch data from the backend API
        axios.get('http://localhost:4000/data')
            .then(response => {
                // Set the fetched data to the state
                setPublish(response.data);
               
            })
            .catch(error => {
                // Handle errors
                console.error('Erreur lors de la requête :', error);
            });
    }, []); // Empty dependency array to ensure the effect runs only once when the component mounts

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold mb-4">LISTE DES PUBLICATIONS</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Year</th>
                        <th className="px-4 py-2">Book Title</th>
                        <th className="px-4 py-2">URL</th>
                        <th className="px-4 py-2">Authors</th>
                    </tr>
                </thead>
                <tbody>
                    {publish.map(item => (
                        <tr key={item._id}>
                            <td className="border px-4 py-2">{item.title}</td>
                            <td className="border px-4 py-2">{item.year}</td>
                            <td className="border px-4 py-2">{item.booktitle}</td>
                            <td className="border px-4 py-2">{item.url}</td>
                            <td className="border px-4 py-2">{item.authors.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Publish;
