import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Book = (props) => {
    const { match, user, book } = props
    let id = match.params.id;
    const [books, setBooks] = useState()

    useEffect(() => {
        async function loadBook() {
            let response = await axios.get(`http://localhost:3001/books/${id}`)
            setBooks(response.data)
        }
        loadBook()
    }, [id]);

    const alignCard = {
        display: "flex",
        margin: 'auto',
        flexDirection: 'column',
        maxWidth: "800px"
    }

    return (
        <Container style={{ marginTop: "100px", marginBottom: "100px" }} >
            <div class="card" style={alignCard}>
                <div class="row no-gutters">
                    <div class="col-md-6">
                        <img src={books && books.image} style={{ width: "280px", margin: "10px 0 10px 10px" }} alt={books && books.title} />
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h1>{books && books.title}</h1>
                            <p><b>Author: </b>{books && books.author}</p>
                            <p><b>Category: </b>{books && books.category}</p>
                            <p><b>ISBN: </b>{books && books.ISBN}</p>
                            <p><b>About: </b>{books && books.about}</p>
                            <p><b>Published: </b>{books && books.published}</p>
                            <p><b>Pages: </b>{books && books.pages}</p>
                            {user && <Link variant="warning" className="w-50 btn btn-light btn-outline-secondary" to={`/editbook/${book.id}`}>Edit</Link>}
                        </div>
                    </div>
                </div>
            </div>



        </Container>

    )
}
export default Book
