//import frameworks
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';

const Footer = (props) => {
//state setter and light/darkmode links
    const [theme, setTheme] = useState({ darkMode: false })
    const stylePath1 = "/style1.css"
    const stylePath2 = "/style2.css"

    useEffect(() => {
        let savedData = localStorage.getItem("howtohandy")
        savedData = JSON.parse(savedData)
        setTheme(savedData);
    }, []);

    const handleWhite = (e) => {
        setTheme({ darkMode: false });
        localStorage.setItem("howtohandy", JSON.stringify({ darkMode: false }))
    }
    const handleBlack = (e) => {
        setTheme({ darkMode: true });
        localStorage.setItem("howtohandy", JSON.stringify({ darkMode: true }))
    }
    return (
        //border rendering
        <Container className="footer-bottom text-center border-top">
            <link rel="stylesheet" type="text/css" href={!theme.darkMode ? stylePath1 : stylePath2} />
            &copy; 2021 My Bookshelf
            <div>
                <button onClick={handleWhite} className="btn btn-light m-1">White</button>
                <button onClick={handleBlack} className="btn btn-dark m-1">Black</button>
            </div>
        </Container>
    )
}
export default Footer
