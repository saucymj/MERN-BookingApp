import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import { Card, CardHeader, CardBody, Spinner, Heading, Container } from '@chakra-ui/react'


import { QUERY_SINGLE_REVIEW } from '../utils/queries';

const SingleReview = () => {
    const { reviewId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_REVIEW, {
        variables: { reviewId: reviewId },
    });

    const review = data?.review || {};

    if (loading) {
        return <Spinner />;
    }
    return (
        <div className="">
            <Card>
                <CardHeader>
                    <Heading size='md'>{review.reviewAuthour} <br /> Post Date: {' '}
                        <span>
                            {review.createdAt}
                        </span></Heading>
                </CardHeader>

                <CardBody>
                    <Container>
                        {review.reviewText}
                    </Container>
                </CardBody>
            </Card>

            <div className="">
                <CommentList comments={review.comments} />
            </div>
            <div className="" >
                <CommentForm reviewId={review._id} />
            </div>
        </div>
    );
};

export default SingleReview;
