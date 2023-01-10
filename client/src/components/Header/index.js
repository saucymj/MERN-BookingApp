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
            <Box bgGradient="linear(to-r, purple.900, purple.700 ,purple.300)" w='100%' p={4}>
                <div>
                    <Link className="" to="/">
                        <Heading color="white" as='h1' size='2xl' pl="2">
                            Twitter for Travelers
                        </Heading>
                    </Link>
                    <Heading color="white" as="h2" size="sm" pt="1" pl="8">
                        Determine your next vacation spot.
                    </Heading>
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
                       
                        <ButtonGroup gap='2' bg='purple.300' w='100%' p={10} h='100%'>
                            <Link className="" to="/login">
                                <Button bg="white" size='lg'>
                                    Login
                                </Button>
                            </Link>
                            <Link className="" to="/signup">
                                <Button bg="white" size='lg'>
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