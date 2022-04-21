import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Joi from 'joi';

const Register = (props) => {
    const { history, saveUser } = props
    const [user, setUser] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({ email: '', password: '' })
    const [serverErrors, setServerErrors] = useState({ error: '' })

    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,32}$')),
    });

    function validate(data) {
        const options = { abortEarly: false };
        const result = schema.validate(data, options);
        if (!result.error) return {};

        const errors = {};
        result.error.details.map((item) => {
            return (errors[item.path[0]] = item.message);
        });
        console.log(errors);
        return errors;
    };

    const onTextChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onMessageSubmit = async (e) => {
        e.preventDefault()
        const errorsData = validate(user)
        console.log(errorsData);
        setErrors(errorsData)
        if (errorsData === {}) {
            return
        }
        try {
            let response = await axios.post(`http://localhost:3001/register`, user)
            saveUser(response.data)
            history.push('/');
        } catch (error) {
            console.log(error.response.data);
            setServerErrors(error.toJSON())

        }
    }

    return (
        <Container>
            <Form className="mt-2" onSubmit={onMessageSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={user && user.email} name="email" onChange={e => onTextChange(e)} />
                    {'email' in errors ? <Form.Text className="text-danger">{errors.email}</Form.Text> : null}
                    <Form.Label className="d-block">Password</Form.Label>
                    <Form.Control type="password" value={user && user.password} name="password" onChange={e => onTextChange(e)} />
                    {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                    <Button variant="primary" type="submit" className="w-100 mt-1">
                        Register + Login
                    </Button>
                    {serverErrors && <Form.Text className="text-danger">{serverErrors.error}</Form.Text>}
                </Form.Group>
            </Form>
        </Container>

    )
}
export default Register
