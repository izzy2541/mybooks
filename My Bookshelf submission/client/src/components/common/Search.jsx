import Form from 'react-bootstrap/Form';


const Search = (props) => {
    const { query, onChange } = props


    return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control className= "col-3" type="text" placeholder="Search" value={query} onChange={(e) => { onChange(e.target.value) }} />
                </Form.Group>
            </Form>

    )
}
export default Search
