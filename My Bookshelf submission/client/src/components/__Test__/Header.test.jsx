import { render, screen } from '@testing-library/react'; //Imports the testing library 
import Header from '../common/Header'; //Imports the component we want to test
import { BrowserRouter } from 'react-router-dom';

const mockHeaderFunction = jest.fn()
const mockUser = {
    "user": {
        "id": 4,
        "email": "daniel@daniel.com",
        "password": "$2b$10$rjBryNi3tjsWJh.FSgIdHOjoeZ/vGA1bmWyTqWIMEo7wIDIflUTHi",
        "updatedAt": "2021-11-10T23:52:29.725Z",
        "createdAt": "2021-11-10T23:52:29.725Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJkYW5pZWxAZGFuaWVsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHJqQnJ5TmkzdGpzV0poLkZTZ0lkSE9qb2VaL3ZHQTFibVd5VHFXSU1Fbzd3SURJZmxVVEhpIiwidXBkYXRlZEF0IjoiMjAyMS0xMS0xMFQyMzo1MjoyOS43MjVaIiwiY3JlYXRlZEF0IjoiMjAyMS0xMS0xMFQyMzo1MjoyOS43MjVaIiwiaWF0IjoxNjM2NTg4MzQ5LCJleHAiOjE2Mzc3OTc5NDl9.dOEsXZmPSrhxfoqVp4ml4HQ60q1DBh1UY6PUA5dRVgA"
}

const MockHeader = ({ mockUser, mockHeaderFunction }) => {
    return (
        <BrowserRouter>
            <Header user={mockUser} logout={mockHeaderFunction} onChange={mockHeaderFunction}></Header>
        </BrowserRouter>
    )
}

//Describe the test
test('main header should render', () => {
    render(<MockHeader user={mockUser} logout={mockHeaderFunction} onChange={mockHeaderFunction}></MockHeader>); //Render the component
    const headerElement = screen.getByText(/My Bookshelf/i); //Find the element to test
    expect(headerElement).toBeInTheDocument(); //Detail what you expect the element to contain  
});
test('should render home button', () => {
    render(<MockHeader user={mockUser} logout={mockHeaderFunction} onChange={mockHeaderFunction}></MockHeader>); //Render the component
    const headerElement = screen.getByText(/Home/i); //Find the element to test
    expect(headerElement).toBeInTheDocument(); //Detail what you expect the element to contain  
});

