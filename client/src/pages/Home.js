import React from 'react';
import { useQuery } from '@apollo/client';

import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import { Spinner } from '@chakra-ui/react';

import { QUERY_REVIEWS } from '../utils/queries';


const Home = () => {
  const { loading, data } = useQuery(QUERY_REVIEWS);
  const reviews = data?.reviews || [];

  return (
    <main>
      <div >
        <div
        >
          <ReviewForm />
        </div>
        <div >
          {loading ? (
            <div><Spinner /></div>
          ) : (
            <ReviewList
              reviews={reviews}
              title="Share Your Vacay..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
