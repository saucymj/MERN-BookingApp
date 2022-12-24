import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';
import { FormControl, Button, Textarea, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';


const CommentForm = ({ reviewId }) => {
    const [commentText, setCommentText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addComment({
                variables: {
                    reviewId,
                    commentText,
                    commentAuthor: Auth.getProfile().data.username,
                },
            });

            setCommentText('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'commentText' && value.length <= 280) {
            setCommentText(value);
            setCharacterCount(value.length);
        }
    };

    return (
        <div>
            <h3>Comments</h3>
            {Auth.loggedIn() ? (
                <>
                    <FormControl onSubmit={handleFormSubmit}>
                        <Textarea value={commentText} placeholder='Leave a comment...' onChange={handleChange} />
                        <Text mb='8px'> Character Count: {characterCount}/280 
                        {error && <span className="ml-2">{error.message}</span>}</Text>
                        <div>
                            <Button mt={8} colorScheme='blue' type='submit'><AddIcon /></Button>
                        </div>
                    </FormControl>
                </>
            ) : (
                <p>
                    You need to be logged in to add a comment. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    );
};

export default CommentForm;
