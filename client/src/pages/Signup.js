import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import { Input, Button } from '@chakra-ui/react';
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/react'

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addProfile, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addProfile({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div spacingY='40px' style={{ margin: '14px' }}>
            <h2>Signup</h2>
            {data ? (
                <p>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                </p>
            ) : (
                <FormControl isRequired onSubmit={handleFormSubmit}>
                    <FormLabel>Username</FormLabel>
                    <Input placeholder='Username' type='text' onChange={handleChange} value={formState.username} />
                    <FormLabel>Email</FormLabel>
                    <Input placeholder='Email' type='email' onChange={handleChange} value={formState.email} />
                    <FormLabel>Password</FormLabel>
                    <Input placeholder='Password' value={formState.password} type='password' onChange={handleChange} />
                    <FormHelperText>* is a required field</FormHelperText>
                    <div>
                        <Button mt={8} colorScheme='blue'>Submit</Button>
                    </div>
                </FormControl>
            )}

            {error && (
                <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                </div>
            )}
        </div>
    );
};

export default Signup;
