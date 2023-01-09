import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, Flex, Spacer, Box } from '@chakra-ui/react';


const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Flex flexDirection="column" minHeight="100%" align="center" justify="center" p={3}>
      <div className="">
        {location.pathname !== '/' && (
        <Button ml={100}  onClick={() => navigate(-1)} leftIcon={<ArrowBackIcon />} bgGradient="linear(to-r, purple.900, purple.700 ,purple.300)" variant='solid' color="white" mb="3px">
           Previous
         </Button>
        )}
        <Spacer/>
        <Box w='100%' color="white" bgGradient="linear(to-r, purple.900, purple.700 ,purple.300)" mt="auto" pt={7}>
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
