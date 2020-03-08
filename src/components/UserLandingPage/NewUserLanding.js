import React from "react";
import * as Styles from "../styles/NewUserStyles.js";
import ControlledCarousel from "./Carousel.js";

const NewUser = (props) => {
    const handleClick = () => {
        props.history.push("/home");
    };

    
    return (
        <>
            <Styles.NewUserContainer>
                <Styles.NewHeader>Welcome New User</Styles.NewHeader>
                <ControlledCarousel handleClick={handleClick} />
                <Styles.NewText>Swipe Left</Styles.NewText>
            </Styles.NewUserContainer>
        </>
    )
}

export default NewUser;