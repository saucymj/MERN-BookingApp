import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_BLOG } from '../../utils/mutations';
import { QUERY_BLOGS } from '../../utils/queries';

import Auth from '../../utils/auth';
import { FormControl, Button, Textarea, Text , Heading} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const BlogForm = () => {
  const [blogText, setBlogText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addBlog, { error }] = useMutation(ADD_BLOG, {
    update(cache, { data: { addBlog } }) {
      try {
        const { blogs } = cache.readQuery({ query: QUERY_BLOGS });

        cache.writeQuery({
          query: QUERY_BLOGS,
          data: { blogs: [addBlog, ...blogs] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addBlog({
        variables: {
          blogText,
          blogAuthor: Auth.getProfile().data.username,
        },
      });

      setBlogText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'blogText' && value.length <= 280) {
      setBlogText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <Heading as="h2" size="2xl" p="10">
        How was your trip?
      </Heading>

      {Auth.loggedIn() ? ( 
        <>
          <FormControl onSubmit={handleFormSubmit}>
            <Textarea value={blogText} placeholder='Share your experience...' onChange={handleChange} />
            <Text mb='8px'> Character Count: {characterCount}/280 
            {error && <span className="">{error.message}</span>}</Text>
            <div>
            <Button mt={8} colorScheme='blue' type='submit'><AddIcon /></Button>
            </div>
            </FormControl>
        </>
      ) : (
        <Heading pl="10" as="h3" size="l">
          You need to be logged in to create a post. Please{' '}
          <Link color='blue' to="/login" >login</Link> or <Link color="blue" to="/signup">signup.</Link>
        </Heading>
      )}
    </div>
  );
};

export default BlogForm;
