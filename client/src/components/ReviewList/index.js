import React from 'react';
import { Link } from 'react-router-dom';
import { Text, Card, CardHeader, CardBody, Heading, CardFooter, Button } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

const ReviewList = ({ reviews, title }) => {
    if (!reviews.length) {
        return <h3>Oops No Reviews</h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {reviews &&
                reviews.map((review) => (
                    <div key={reviews._id} className="">
                        <Card>
                            <CardHeader>
                                <Heading size='md'>{review.reviewAuthour} <br /> Post Date: {' '}
                                    <span>
                                        {review.createdAt}
                                    </span></Heading>
                            </CardHeader>

                            <CardBody>
                                <Text>{review.reviewText}</Text>
                            </CardBody>

                            <CardFooter
                                justify='space-between'
                                flexWrap='wrap'
                                sx={{
                                    '& > button': {
                                        minW: '136px',
                                    },
                                }}
                            >
                                <Link
                                    className=""
                                    to={`/reviews/${review._id}`}
                                >
                                    <Button flex='1' variant='ghost' leftIcon={<ChatIcon />}>
                                        Comment
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>


                    </div>
                ))
            }
        </div >
    );
};

export default ReviewList;
