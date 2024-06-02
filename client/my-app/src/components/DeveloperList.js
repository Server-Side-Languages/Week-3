import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeveloperList = () => {
    const [developers, setDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDevelopers = async () => {
            try {
                const response = await axios.get('http://localhost:your_port/api/v1/developers');
                setDevelopers(response.data.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDevelopers();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching developers: {error.message}</p>;
    }

    return (
        <div>
            <h1>Developers</h1>
            <ul>
                {developers.map((developer) => (
                    <li key={developer._id}>
                        <h2>{developer.name}</h2>
                        <p>Age: {developer.age}</p>
                        <p>Description: {developer.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeveloperList;