import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const DeveloperCard = ({ developer }) => (
    <div className="developer-card">
        <h2>{developer.name}</h2>
        <p>Age: {developer.age}</p>
        <p>Description: {developer.description}</p>
    </div>
);

const App = () => {
    const [developers, setDevelopers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            console.log(`Searching for developers with term: ${searchTerm}`);
            const response = await axios.get(`http://localhost:3000/api/v1/developers?search=${searchTerm}`);
            console.log("API response:", response.data);
            setDevelopers(response.data.data);
        } catch (error) {
            console.error("Error fetching developers:", error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Developer API</h1>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        name="search"
                        placeholder="Search Developers"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
            </header>
            <main>
                <div className="developer-list">
                    {developers.length > 0 ? (
                        developers.map((developer) => (
                            <DeveloperCard key={developer._id} developer={developer} />
                        ))
                    ) : (
                        <p>No developers found</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;