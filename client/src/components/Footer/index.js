import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, Flex, Spacer, Box } from '@chakra-ui/react';


const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Flex align="center" justify="center" p={3}>
      <div className="">
        {location.pathname !== '/' && (
        <Button ml={100}  onClick={() => navigate(-1)} leftIcon={<ArrowBackIcon />} colorScheme='teal' variant='solid'>
           Previous
         </Button>
        )}
        <Spacer/>
        <Box pt={7}>
        <h4>
          Made in{' '}
          <span
            className="emoji"
            role="img"
            aria-label="flag"
            aria-hidden="false"
          >
            🇺🇸
          </span>{' '}
          by Mekhi, Kevin, Elizabeth, Ayoub, & Vegas.
        </h4>
        </Box>
      </div>
      </Flex>
  );
};

export default Footer;
