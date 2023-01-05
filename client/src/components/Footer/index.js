import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';


const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="">
      <div className="">
        {location.pathname !== '/' && (
        <Button   onClick={() => navigate(-1)} leftIcon={<ArrowBackIcon />} colorScheme='teal' variant='solid'>
           Previous
         </Button>
        )}
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
      </div>
    </footer>
  );
};

export default Footer;
