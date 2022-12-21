import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import { Input, Stack, InputGroup, Icon, InputRightElement, Button } from '@chakra-ui/react';
import { EmailIcon, ArrowForwardIcon } from '@chakra-ui/icons'



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
    <div>
        <h2>Login</h2>
    <Stack spacing={3} onSubmit={handleFormSubmit}>
    <Input variant='outline' placeholder='large size' size='lg' />
 
    <InputGroup size='md'>
      <Input
        variant='outline'
        type='password'
        placeholder='Enter password'
      />
       <InputRightElement width='4.5rem'>
        <EmailIcon/>
      </InputRightElement>
    </InputGroup>
    <Button colorScheme='blue' leftIcon={<ArrowForwardIcon />}>Submit</Button>
  </Stack>

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
    </div>
  );
};

export default Login;
