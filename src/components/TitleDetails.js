import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function TitleDetails() {
    const { id } = useParams(); // Extract the id from the URL params
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/titles/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setDetails(data))
            .catch(error => {
                console.error('Error fetching details:', error);
                setError(error.message);
            });
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{details.title}</h2>
            <p>Year: {details.year}</p>
            <p>Genre: {details.genre}</p>
            {/* Add more details as necessary */}
        </div>
    );
}
