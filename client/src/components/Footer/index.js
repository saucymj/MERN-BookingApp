import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, Box} from '@chakra-ui/react';


const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
      <div className="">
        {location.pathname !== '/' && (

      <Box as='button'
          type = 'submit' 
          mt={8} 
          ml={100}
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
          onClick={() => navigate(-1)} 
          leftIcon={<ArrowBackIcon />} 
          mb="3px"
          >
        Previous
      </Box>
        )}

        <Box minH="100%" color="white" bgGradient="linear(to-r, purple.900, purple.700 ,purple.300)">
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
        </Box>

      </div>
  );
};

export default Footer;
