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
        <div style={{ margin: '14px' }}>
            <h2>Signup</h2>
            {data ? (
                <p>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                </p>
            ) : (
                <form onSubmit={handleFormSubmit}>
                <FormControl isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input id='usernamee' placeholder='Username' type='text'  name='username' onChange={handleChange} value={formState.username} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input id='email' placeholder='Email' type='email' name='email' onChange={handleChange} value={formState.email} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input id='password' placeholder='Password' value={formState.password} name='password' type='password' onChange={handleChange} />
                    <FormHelperText>* is a required field</FormHelperText>
                    <div>
                        <Button mt={8} type='submit' colorScheme='blue'>Submit</Button>
                    </div>
                </FormControl>
                </form>
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
