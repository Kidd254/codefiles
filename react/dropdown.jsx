import {useState, useEffect} from 'react';
import axios from 'axios';

const dropdown = () => {
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setOptions(data);
        };
        fetchData();
    }, []);

    const handlechangeOption = (e) => {
        setSelected(e.target.value);
    }
    
    return (
        <div>
            <label htmlFor="users">Choose a user:</label>
            <select id="users" value={selected} onChange={handlechangeOption}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                    
                ))} 
                </select>
        </div>
    );
    }