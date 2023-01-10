import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import { Input, Button } from '@chakra-ui/react';
import { FormControl, FormLabel, FormHelperText, Box, Flex, InputLeftAddon, InputGroup } from '@chakra-ui/react';
import { LockIcon, EmailIcon } from '@chakra-ui/icons';

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
                    <FormLabel>Username</FormLabel>
                    <Input id='usernamee' placeholder='Username' type='text'  name='username' onChange={handleChange} value={formState.username} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
                    <InputLeftAddon children={<EmailIcon/>} />
                    <Input id='email' placeholder='Email' type='email' name='email' onChange={handleChange} value={formState.email} />
                    </InputGroup>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                    <InputLeftAddon children={<LockIcon/>} />
                    <Input id='password' placeholder='Password' value={formState.password} name='password' type='password' onChange={handleChange} />
                    </InputGroup>
                    <FormHelperText color='red'>* is a required field</FormHelperText>
                    <div>
                        <Box as='button'
                         type = 'submit' 
                         mt={8} 
                         bgGradient="linear(to-r, purple.900, purple.300)" 
                         color="white"
                         width="150px"
                         height="40px"
                         borderRadius="5px"
                         _hover={{
                            bg:"purple.900"
                         }}
                         _active={{
                            bgGradient:"linear(to-r, purple.700, purple.100)"
                         }}
                         >
                            Signup
                        </Box>
                    </div>
                </FormControl>
                </Box>
                </Flex>
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
