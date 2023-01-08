import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import { Card, CardHeader, CardBody, Spinner, Heading, Container } from '@chakra-ui/react'


import { QUERY_SINGLE_BLOG } from '../utils/queries';

const SingleBlog = () => {
    const { blogId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_BLOG, {
        variables: { blogId: blogId },
    });

    const blog = data?.blog || {};

    if (loading) {
        return <Spinner />;
    }
    return (
        <div className="">
            <Card>
                <CardHeader>
                    <Heading size='md'>{blog.blogAuthour} <br /> Post Date: {' '}
                        <span>
                            {blog.createdAt}
                        </span></Heading>
                </CardHeader>

                <CardBody>
                    <Container>
                        {blog.blogText}
                    </Container>
                </CardBody>
            </Card>

            <div className="">
                <CommentList comments={blog.comments} />
            </div>
            <div className="" >
                <CommentForm blogId={blog._id} />
            </div>
        </div>
    );
};

export default SingleBlog;
