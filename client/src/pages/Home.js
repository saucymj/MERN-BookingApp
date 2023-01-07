import React from 'react';
import { useQuery } from '@apollo/client';

import BlogList from '../components/BlogList';
import BlogForm from '../components/BlogForm';
import { Spinner } from '@chakra-ui/react';

import { QUERY_BLOGS } from '../utils/queries';


const Home = () => {
  const { loading, data } = useQuery(QUERY_BLOGS);
  const blogs = data?.blogs || [];

  return (
    <main>
      <div >
        <div
        >
          <BlogForm />
        </div>
        <div >
          {loading ? (
            <div><Spinner /></div>
          ) : (
            <BlogList
              blogs={blogs}
              title="Share Your Vacay..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
