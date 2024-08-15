import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import styles from "./TitleList.module.css";


export default function TitleList() {
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/titles')
            .then(response => response.json())
            .then(data => setTitles(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className={styles.container}>
            <h1>Series and Movies</h1>
            <ul>
                {titles.map(title => (
                    <li key={title.id}>
                        <Link to={`/titles/${title.id}`}>{title.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}