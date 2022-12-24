import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import { Input, Button } from '@chakra-ui/react';
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/react'



const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

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
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }

        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <div style={{ margin: '14px' }}>
            <h2>Login</h2>
            {data ? (
                <p>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                </p>
            ) : (
                <FormControl isRequired onSubmit={handleFormSubmit}>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder='Email'  type='email' onChange={handleChange} value={formState.email} />
                    <FormLabel>Password</FormLabel>
                    <Input placeholder='Password'
                        value={formState.password}
                        type='password'
                        onChange={handleChange} />
                    <FormHelperText>* is a required field</FormHelperText>
                    <div>
                        <Button mt={8} colorScheme='blue'>Submit</Button>
                    </div>
                </FormControl>
                


            )}
            {error && (
                <div className="">
                    {error.message}
                </div>
            )}
        </div>
    );
};

export default Login;
