import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const Login = (props) => {
    const { history, saveUser } = props
    const [user, setUser] = useState({ email: '', password: '' })

    const onTextChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onMessageSubmit = async (e) => {
        e.preventDefault()
        let newUser = await axios.post(`http://localhost:3001/login`, user)
        console.log(newUser.data);
        saveUser(newUser.data)
        history.push('/');
    }

    return (
        <Container>
            <Form className="mt-2" onSubmit={onMessageSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={user && user.email} name="email" onChange={e => onTextChange(e)} />
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={user && user.password} name="password" onChange={e => onTextChange(e)} />
                    <Button variant="primary" type="submit" className="w-100 mt-1" path = '/'>
                        Login
                    </Button>
                </Form.Group>
            </Form>
        </Container>

    )
}
export default Login
