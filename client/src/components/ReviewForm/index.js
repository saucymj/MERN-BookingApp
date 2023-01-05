import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_REVIEW } from '../../utils/mutations';
import { QUERY_REVIEWS } from '../../utils/queries';

import Auth from '../../utils/auth';
import { FormControl, Button, Textarea, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const ReviewForm = () => {
  const [reviewText, setReviewText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addReview, { error }] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      try {
        const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });

        cache.writeQuery({
          query: QUERY_REVIEWS,
          data: { reviews: [addReview, ...reviews] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addReview({
        variables: {
          reviewText,
          reviewAuthor: Auth.getProfile().data.username,
        },
      });

      setReviewText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'reviewText' && value.length <= 280) {
      setReviewText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>How was your trip?</h3>

      {Auth.loggedIn() ? (
        <>
          <FormControl onSubmit={handleFormSubmit}>
            <Textarea value={reviewText} placeholder='Share your experience...' onChange={handleChange} />
            <Text mb='8px'> Character Count: {characterCount}/280 
            {error && <span className="">{error.message}</span>}</Text>
            <div>
            <Button mt={8} colorScheme='blue' type='submit'><AddIcon /></Button>
            </div>
            </FormControl>
        </>
      ) : (
        <p>
          You need to be logged in to create a post. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ReviewForm;
