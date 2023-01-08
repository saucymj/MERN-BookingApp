import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';
import { Box, Heading, Button, Flex, Spacer, ButtonGroup } from '@chakra-ui/react';

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <header className="">
            <Flex>
            <Box bg='tomato' w='100%' p={4}>
                <div>
                    <Link className="" to="/">
                        <Heading as='h2' size='2xl'>
                            Trips for Travelers
                        </Heading>
                    </Link>
                    <p className="">Grasp knowledge of possible vacation spots.</p>
                </div>
                </Box>
                <Spacer />
                <div>
                    {Auth.loggedIn() ? (
                        <>
                            <span>Welcome, {Auth.getProfile().data.username}!</span>
                            <Button colorScheme='Blue' onClick={logout}>Logout</Button>
                        </>
                    ) : (
                        <>
                       
                        <ButtonGroup gap='2' bg='tomato' w='100%' p={10} h='100%'>
                            <Link className="" to="/login">
                                <Button colorScheme='teal' size='md'>
                                    Login
                                </Button>
                            </Link>
                            <Link className="" to="/signup">
                                <Button colorScheme='teal' size='md'>
                                    Signup
                                </Button>
                            </Link>
                            </ButtonGroup>
                        </>
                    )}
                </div>
            </Flex>
        </header>
    );
};

export default Header;