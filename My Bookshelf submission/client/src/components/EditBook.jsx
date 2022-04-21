import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const EditBook = (props) => {
    const { match, history, user } = props
    let id = match.params.id;
    const [books, setBooks] = useState({
        image: "",
        title: "",
        author: "",
        category: "",
        ISBN: "",
        about: "",
        published: "",
        pages: "",
    })

    useEffect(() => {
        async function loadBook() {

            let response = await axios.get(`http://localhost:3001/books/${id}`)
            setBooks(response.data)
        }
        loadBook()
    }, [id]);


    const onTextChange = (e) => {
        setBooks({ ...books, [e.target.name]: e.target.value })
    }

    const onMessageSubmit = async (e) => {
        e.preventDefault()
        let id = match.params.id;
        await axios.put(`http://localhost:3001/books/${id}`, books)
        //history.push('/');
        window.location.href = "http://localhost:3000/";
    }

    return (
        <Container>
            <Form className="mt-2" onSubmit={onMessageSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={books && books.title} name="title" onChange={e => onTextChange(e)} />
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" value={books && books.author} name="author" onChange={e => onTextChange(e)} />
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" value={books && books.category} name="category" onChange={e => onTextChange(e)} />
                    <Form.Label>image</Form.Label>
                    <Form.Control type="text" value={books && books.image} name="image" onChange={e => onTextChange(e)} />
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control type="text" value={books && books.ISBN} name="ISBN" onChange={e => onTextChange(e)} />
                    <Form.Label>About</Form.Label>
                    <Form.Control as="textarea" rows={3} value={books && books.about} name="about" onChange={e => onTextChange(e)} />
                    <Form.Label>Pages</Form.Label>
                    <Form.Control  type = "text" value={books && books.pages} name="pages" onChange={e => onTextChange(e)} />
                    <Button variant="primary" type="submit" className="w-100 mt-1">
                        Submit Edit
                    </Button>
                </Form.Group>
            </Form>
        </Container>

    )
}
export default EditBook
