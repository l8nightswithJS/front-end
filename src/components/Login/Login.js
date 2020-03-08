import React, { useState } from "react";
import "./Login.css";
import * as loginStyles from "./LoginStyles";
import axios from "axios";

function Login(props) {
    const [userAndPw, setUserAndPw] = useState({
        username: "",
        password: "",
    });

    const submitHandler = event => {
        event.preventDefault();

        axios
            .post(
                "https://sleep-tracker-server.herokuapp.com/api/auth/login",
                userAndPw
            )
            .then(res => {
                console.log(res);

                localStorage.setItem("token", res.data.token);
                props.history.push("/home");
            })
            .catch(err => {
                console.log(`the chef has cooked up ${err} error`);
            });
    };
    //test
    const onInputChange = event => {
        // console.log`name is currently ${nameInput.value} email is currently ${emailInput.value} role is currently${roleInput.value}`();
        setUserAndPw({ ...userAndPw, [event.target.name]: event.target.value });
    };

    if (localStorage.getItem("token")) {
        props.history.push("/home");
    }

    return (
        <loginStyles.LoginCard>
            <loginStyles.Title>
                <p className="styledGreeting">Welcome back! Please log in</p>
            </loginStyles.Title>
            <form onSubmit={submitHandler} className="loginForm">
                <label className="sizedLabels">
                    Username:
                    <input
                        className="sizedInputs"
                        type="text"
                        name="username"
                        id="usernameInput"
                        placeholder={userAndPw.username}
                        onChange={onInputChange}
                        value={userAndPw.username}
                    />
                </label>
                <label className="sizedLabels">
                    Password:
                    <input
                        className="sizedInputs"
                        type="password"
                        name="password"
                        id="passwordInput"
                        placeholder={userAndPw.password}
                        onChange={onInputChange}
                        value={userAndPw.password}
                    />
                </label>

                <button onSubmit={e => {}}>Login</button>
                <loginStyles.H6Link onClick={() => props.history.push("/signup")}>signup/register</loginStyles.H6Link>
            </form>
        </loginStyles.LoginCard>
    );
}

export default Login;
