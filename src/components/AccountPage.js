import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserData, deleteUserAccount } from "../actions/bwActions";
import * as Style from "./styles/AccountStyles";

const AccountPage = (props) => {
    useEffect(() => {
        props.getUserData()

    }, [])

const deleteUser =  () => {
    props.deleteUserAccount()
    localStorage.clear()
    props.history.push("/");
}   
    
    return(
        <>  
            <Style.MContainer>
                <Style.Header>Account Information</Style.Header>
                <Style.InfoDiv>
                    <Style.Label>Username:</Style.Label>
                    <Style.DataH4>{props.user.username}</Style.DataH4>
                </Style.InfoDiv>
                <Style.InfoDiv>
                    <Style.Label>First Name:</Style.Label>
                    <Style.DataH4>{props.user.firstName}</Style.DataH4>
                </Style.InfoDiv>
                <Style.InfoDiv>    
                    <Style.Label>Email:</Style.Label>
                    <Style.DataH4>{props.user.email}</Style.DataH4> 
                </Style.InfoDiv>
                <button onClick={deleteUser}>Delete Account</button>
            </Style.MContainer>
        </>
    )
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect( mapStateToProps, {getUserData, deleteUserAccount} )(AccountPage);