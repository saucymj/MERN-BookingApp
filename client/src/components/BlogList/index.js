import React from 'react';
import { Link } from 'react-router-dom';
import { Text, Card, CardHeader, CardBody, Heading, CardFooter, Button } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

const BlogList = ({ blogs, title }) => {
    if (!blogs.length) {
        return <Heading as='h2' size="l" pl="10" pt="5">Oops No Blogs</Heading>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {blogs &&
                blogs.map((blog) => (
                    <div key={blog._id} className="">
                        <Card>
                            <CardHeader>
                                <Heading size='md'>{blog.blogAuthour} <br /> Post Date: {' '}
                                    <span>
                                        {blog.createdAt}
                                    </span></Heading>
                            </CardHeader>

                            <CardBody>
                                <Text>{blog.blogText}</Text>
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
                                    to={`/blogs/${blog._id}`}
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

export default BlogList;
