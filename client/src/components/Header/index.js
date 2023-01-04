import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';
import { Container, Heading, Button } from '@chakra-ui/react';

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <header className="">
            <Container>
                <div>
                    <Link className="" to="/">
                        <Heading as='h2' size='2xl'>
                            Trips for Travelers
                        </Heading>
                    </Link>
                    <p className="">Grasp knowledge of possible vacation spots.</p>
                </div>
                <div>
                    {Auth.loggedIn() ? (
                        <>
                            <span>Welcome, {Auth.getProfile().data.username}!</span>
                            <Button colorScheme='Blue' onClick={logout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Link className="" to="/login">
                                <Button colorScheme='teal' size='sm'>
                                    Login
                                </Button>
                            </Link>
                            <Link className="" to="/signup">
                                <Button colorScheme='teal' size='sm'>
                                    Signup
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </Container>
        </header>
    );
};

export default Header;