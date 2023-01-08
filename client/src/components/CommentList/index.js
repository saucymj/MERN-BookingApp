import React from 'react';
import { Text, Card, CardHeader, CardBody, Heading } from '@chakra-ui/react';

const CommentList = ({ comments = [] }) => {
    if (!comments.length) {
        return <h3>No Comments Yet</h3>;
    }

    return (
        <>
            <Text fontSize='3xl' as='u'>Comments</Text>
            <div className="">
                {comments &&
                    comments.map((comment) => (
                        <div key={comment._id} className="">
                            <Card>
                                <CardHeader>
                                    <Heading size='md'>{comment.commentAuthor} commented{' '}
                                    <span>
                                        on {comment.createdAt}
                                    </span></Heading>
                                </CardHeader>

                                <CardBody>
                                    <Text>{comment.commentText}</Text>
                                </CardBody>
                            </Card>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default CommentList;