import React, {useState} from 'react';

const addUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const [name, value] = e.target;
        setFormData((prevData)=> ({
            ...prevData,
            [name]: value
        }) );
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if(response.ok) {
                console.log('success');
                setFormData({
                    name: '',
                    email: '',
                    password: ''
                });
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
        }
    };
}