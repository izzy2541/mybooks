import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const AddBook = (props) => {
    const { history } = props
    const [books, setBooks] = useState()

    const onTextChange = (e) => {
        setBooks({ ...books, [e.target.name]: e.target.value })
    }

    const onMessageSubmit = async (e) => {
        e.preventDefault()
        await axios.post(`http://localhost:3001/books`, books)
        history.push('/');
    }

    return (
        <Container>
            <Form className="mt-2" onSubmit={onMessageSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={books && books.title} name="title" onChange={e => onTextChange(e)} />
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" value={books && books.author} name="author" onChange={e => onTextChange(e)} />
                    <Form.Label>category</Form.Label>
                    <Form.Control type="text" value={books && books.category} name="category" onChange={e => onTextChange(e)} />
                    <Form.Label>image</Form.Label>
                    <Form.Control type="text" value={books && books.image} name="image" onChange={e => onTextChange(e)} />
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control type="text" value={books && books.ISBN} name="ISBN" onChange={e => onTextChange(e)} />
                    <Form.Label>about</Form.Label>
                    <Form.Control type="text" value={books && books.about} name="about" onChange={e => onTextChange(e)} />
                    <Form.Label>pages</Form.Label>
                    <Form.Control as="textarea" rows={3} value={books && books.pages} name="pages" onChange={e => onTextChange(e)} />
                    <Button variant="primary" type="submit" className="w-100 mt-1">
                        Submit Edit
                    </Button>
                </Form.Group>
            </Form>
        </Container>

    )
}
export default AddBook
