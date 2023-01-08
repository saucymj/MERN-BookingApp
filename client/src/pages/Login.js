import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { Input, Button ,FormControl, FormLabel, FormHelperText, InputLeftAddon, InputGroup, Flex, Box } from '@chakra-ui/react';

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
            {data ? (
                <p>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                </p>
            ) : (
                <form onSubmit={handleFormSubmit}>
                <Flex justify='center'>
                <Box width='50%' border='2px' borderRadius='2xl' borderColor='' p={6}>
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
                        <InputLeftAddon children={<EmailIcon/>} />
                    <Input placeholder='Email' id='email' type='email' name='email' onChange={handleChange} value={formState.email} />
                    </InputGroup>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                    <InputLeftAddon children={<LockIcon/>} />
                    <Input placeholder='Password'
                        id='password'
                        value={formState.password}
                        type='password'
                        name='password'
                        onChange={handleChange} />
                    </InputGroup>
                    <FormHelperText color='red'>* is a required field</FormHelperText>
                    <div>
                        <Button mt={8} type='submit' colorScheme='blue'>Login</Button>
                    </div>
                </FormControl>
                </Box>
                </Flex>
                </form>

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
