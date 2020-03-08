import styled from "styled-components";

export const SignupContainer = styled.div`
    margin: auto; 
    height: 85vh;
    display: flex;
    flex-flow: column;
    justify-content: center;

`

export const FormContainer = styled.div`
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 3%;
    margin: auto;
    width: 70%;
    text-align: center; 
    min-height: 50vh;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
`

export const Form = styled.form`
    width: 100%;
    margin: 0 auto;
    
`

export const InputContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 3%;
`

export const NewUserInputs = styled.input`
    width: 75%;
    padding: 2%;
    margin: 1%;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    align-items: flex-start;
    align-self: center;
` 

export const NewUserSubmit = styled.input`
    background-color: #4CAF50;
    color: white;
    padding: 2% 5%;
    margin: 0 auto;
    margin-top: 3%;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    :hover {
    background-color: #45a049;
    }
`

export const FormLabel = styled.label`
    padding-bottom: 1%;
    margin: 0; 
    width: 100%;
`

export const Header = styled.h3`
    margin: 1%;
    text-align: center; 
    
`