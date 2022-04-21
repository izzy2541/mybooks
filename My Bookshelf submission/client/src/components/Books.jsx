//import frameworks

import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';


const Books = (props) => {
    const { books, user } = props

    //styling for cards
    const myStyle = {
        boxShadow: "0 0 20px #aaa",
        width: "260px",
        height: "fit-content",
        margin: "25px",
        padding: "10px 10px 0 10px",
        transition: "height 1s"
      };
 
        const Cover = {
         
            minHeight :"370px",
            overflow: "hidden"
        }


    return (
        <React.Fragment>
            <Container>
                {/* books and details */}
                <div className="row">    
                    {books && books.map((book) => 
                        <div className="col-lg-4 col-sm-6 col-12 py-5" key={book.id}>   
                            <Card className="bookCards" style={myStyle}>
                                <Card.Img style={Cover} variant="top" src={book.image} />
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text>{book.author}</Card.Text>

                                    <Link  className="w-50 btn btn-light" to={`/book/${book.id}`}>View</Link>
                                    {user && <Link  className="w-50 btn btn-light" to={`/editbook/${book.id}`}>Edit</Link>}
                                </Card.Body>
                            </Card>
                            </div>
                        
                    )}
                    </div >
            
            </Container >
        </React.Fragment >
    )
}
export default Books
