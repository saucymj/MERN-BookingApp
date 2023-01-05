import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import { EmailIcon } from '@chakra-ui/icons';
import { Input, Button ,FormControl, FormLabel, FormHelperText, InputLeftAddon, InputGroup } from '@chakra-ui/react';




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
                <form onSubmit={handleFormSubmit}>
                
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
                        <InputLeftAddon children={<EmailIcon/>} />
                    <Input placeholder='Email' id='email' type='email' name='email' onChange={handleChange} value={formState.email} />
                    </InputGroup>
                    <FormLabel>Password</FormLabel>
                    <Input placeholder='Password'
                        id='password'
                        value={formState.password}
                        type='password'
                        name='password'
                        onChange={handleChange} />
                    <FormHelperText>* is a required field</FormHelperText>
                    <div>
                        <Button mt={8} type='submit' colorScheme='blue'>Submit</Button>
                    </div>
                </FormControl>
                </form>

            )}
            {error && (
                <div className="">
                    {error.message}
                </div>
            )}
        </div>
    );
>>>>>>> b2835fd514c988ffd66c2851fbb27900d2e67ee4
};

export default Login;
