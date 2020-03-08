import React, { useState } from "react";
import axios from "axios";
import { SignupContainer, FormContainer, Form, NewUserInputs, NewUserSubmit, FormLabel, InputContainer, Header } from "./styles/SignupStyles";

const SignupForm = (props) => {
    // Local state for user's information that will be sent in our post to
    // the server for new user registration.
    const [ user, setUser] = useState({
        username: '',
        password: '',
        firstName: '',
        email: '',
    })
    
    const handleChange = e => {
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        })
    }


    const handleSubmit = e => {
        e.preventDefault();
        axios
        .post('https://sleep-tracker-server.herokuapp.com/api/auth/register', user)
            .then(res => {
                console.log(res)
                localStorage.setItem("token", res.data.token);
                props.history.push('/new')
            })
          .catch(err => console.log(err))
    };

    if (localStorage.getItem("token")) {
        props.history.push("/new");
    }

    return (
        <>
            <SignupContainer>
                <FormContainer>
                    <Header>Sign Up Form</Header>  
                    <Form>
                        <InputContainer>
                            <FormLabel htmlFor="first-name">First Name</FormLabel>
                            <NewUserInputs
                                className="first-name"
                                id="first-name"
                                type="text"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleChange}
                            />
                        </InputContainer>
                        <InputContainer>
                        <FormLabel htmlFor="email">E-mail</FormLabel>
                            <NewUserInputs
                                className="email"
                                id="email"
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </InputContainer>
                        <InputContainer>
                            <FormLabel htmlFor="user-name">Username</FormLabel>
                            <NewUserInputs
                                className="user-name"
                                id="user-name"
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                            />
                        </InputContainer>
                        <InputContainer>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <NewUserInputs
                                className="password"
                                id="password"
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </InputContainer>
                        <NewUserSubmit
                            type="submit"
                            value="submit"
                            onClick={handleSubmit}
                        />
                    </Form>
                </FormContainer>
            </SignupContainer>
        </>
    )
};

export default SignupForm;