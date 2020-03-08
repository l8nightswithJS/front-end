import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { formatDateForInput } from "../../utils/formatDateForInput";

import {
    getUserData,
    getMainData,
    getDataFromOneDate,
    postBedtimeInputs,
    postWakeUpInputs,
    postMiddayInputs,
} from "../../actions/bwActions";

import TestGraph from "../TestGraph";
import CircleProgressbars from "./CircleProgressbars";
import UserInputForm from "./UserInputForm";

// if you change the height of the header, the LandingPageContainer min and max height calcs need to be adjusted
export const LandingPageContainer = styled.div`
    width: 100%;
    max-width: 100vw;
    overflow: scroll;
    height: 100%;
    min-height: calc(100vh - 75px);
    max-height: calc(100vh - 75px);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// padding is to make sure the IconTabs don't cover them up
export const ProgressBarsContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(75px, 200px));
    grid-gap: 15px;
    box-sizing: border-box;
    padding: 0 40px;

    @media (max-width: 400px) {
        padding: 0 30px;
    }
`;

export const ProgressbarSleepAmount = styled.p`
    margin: 0;
`;

const RecommendedSleepContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: center;
`;

const RecommendedSleep = styled.h2`
    font-size: 1.25rem;
    margin: 1rem 0;
`;

export const ButtonsContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(150px, 200px));
    grid-gap: 1rem;
    justify-content: center;

    @media (max-width: 500px) {
        width: 200px;
        grid-template-columns: none;
        grid-template-rows: repeat(3, 40px);
        grid-gap: 10px;
        justify-content: unset;
    }
`;

export const InputFormButton = styled(motion.button)`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 1rem;
    padding: 10px 20px;
    background: #293845;
    color: #dfe6ed;
    border: 1px solid #293845;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    transition: 300ms ease;

    &:hover {
        background: #dfe6ed;
        color: #293845;
    }
`;

export const FormsContainer = styled.div`
    position: relative;
`;

const initialValues = {
    mood: 0,
    tiredness: 0,
};

const initialValuesPlusTime = {
    ...initialValues,
    time: "",
};

export const Emoji = ({ emoji, ariaLabel }) => (
    <span role="img" aria-label={ariaLabel}>
        {emoji}
    </span>
);

const LandingPage = ({ getMainData, getDataFromOneDate, ...props }) => {
    const [today, setToday] = useState(new Date());
    const [formsSubmitted, setFormsSubmitted] = useState({
        wakeUp: false,
        midday: false,
        bedtime: false,
    });

    // for "closing" forms when clicking outside of them
    const wakeUpFormRef = useRef(null);
    const middayFormRef = useRef(null);
    const bedtimeFormRef = useRef(null);

    const wakeUpButtonRef = useRef(null);
    const middayButtonRef = useRef(null);
    const bedtimeButtonRef = useRef(null);

    // for UserInputForm transitions
    const [wakeUpSlide, setWakeUpSlide] = useState(0);
    const [bedtimeSlide, setBedtimeSlide] = useState(0);
    const [middaySlide, setMiddaySlide] = useState(0);

    const wakeUpTap = () => {
        let slidePosition = wakeUpSlide;

        if (slidePosition === 0) {
            slidePosition -= 400;
        } else {
            slidePosition += 400;
        }

        setWakeUpSlide(slidePosition);
    };

    const bedtimeTap = () => {
        let newPos = bedtimeSlide;

        if (newPos === 0) {
            newPos -= 400;
        } else {
            newPos += 400;
        }

        setBedtimeSlide(newPos);
    };

    const middayTap = () => {
        let newPosition = middaySlide;

        if (newPosition === 0) {
            newPosition -= 393;
        } else {
            newPosition += 393;
        }

        setMiddaySlide(newPosition);
    };

    useOnClickOutside(wakeUpFormRef, wakeUpButtonRef, () => {
        setWakeUpSlide(0);
    });

    useOnClickOutside(middayFormRef, middayButtonRef, () => {
        setMiddaySlide(0);
    });

    useOnClickOutside(bedtimeFormRef, bedtimeButtonRef, () => {
        setBedtimeSlide(0);
    });

    const handleBedtimeSubmit = values => {
        let timeAsDate = new Date(values.time); // convert `time` to Date object for POST request
        timeAsDate = timeAsDate.toISOString();

        const postRequestObj = {
            ...values,
            time: timeAsDate,
        };

        props.postBedtimeInputs(postRequestObj);
    };

    const handleWakeUpSubmit = values => {
        let timeAsDate = new Date(values.time); // convert `time` to Date object for POST request
        timeAsDate = timeAsDate.toISOString();

        const postRequestObj = {
            ...values,
            time: timeAsDate,
        };

        props.postWakeUpInputs(postRequestObj);
    };

    const handleMiddaySubmit = values => {
        props.postMiddayInputs(values);
    };

    const toggleIsFormSubmitted = timeOfDay => {
        const submittedForm = { ...formsSubmitted };

        if (timeOfDay === "wakeUp") {
            submittedForm.wakeUp = true;
        } else if (timeOfDay === "midday") {
            submittedForm.midday = true;
        } else if (timeOfDay === "bedtime") {
            submittedForm.bedtime = true;
        }

        setFormsSubmitted(submittedForm);
    };

    useEffect(() => {
        // fetch user data from API via action creator
        const fetchUserData = () => {
            getMainData();
        };

        fetchUserData();
    }, [getMainData]);

    useEffect(() => {
        getDataFromOneDate(formatDateForInput(today));
    }, [getDataFromOneDate, today]);

    return (
        <>
            <LandingPageContainer>
                <TestGraph />

                <RecommendedSleepContainer>
                    <RecommendedSleep>
                        Sleep recommendation:{" "}
                        {props.user.sleepRecommendation ? (
                            <strong>
                                {props.user.sleepRecommendation.toFixed(1)}{" "}
                                hours
                            </strong>
                        ) : (
                            <strong>Not available</strong>
                        )}
                    </RecommendedSleep>
                </RecommendedSleepContainer>

                <CircleProgressbars />

                <h2 style={{ fontSize: "1.25rem", margin: "0.5rem 0 1rem" }}>
                    Today's Averages
                </h2>

                <ButtonsContainer>
                    <InputFormButton
                        ref={wakeUpButtonRef}
                        disabled={formsSubmitted.wakeUp} // don't want to allow more inputs/submissions after first submission
                        onTap={() => wakeUpTap()}
                        isWakeUp={true} // used for styled components for conditional styles
                    >
                        Wake Up
                    </InputFormButton>

                    <InputFormButton
                        ref={middayButtonRef}
                        disabled={formsSubmitted.midday} // don't want to allow more inputs/submissions after first submission
                        onTap={() => middayTap()}
                        isMidday={true} // used for styled components for conditional styles
                    >
                        Midday
                    </InputFormButton>

                    <InputFormButton
                        ref={bedtimeButtonRef}
                        disabled={formsSubmitted.bedtime} // don't want to allow more inputs/submissions after first submission
                        onTap={() => bedtimeTap()}
                        isBedtime={true} // used for styled components for conditional styles
                    >
                        Bedtime
                    </InputFormButton>
                </ButtonsContainer>
            </LandingPageContainer>

            <FormsContainer>
                <UserInputForm
                    heading="Wake Up"
                    needsTimeInput={true}
                    timeLabel="Wake up time"
                    timeId="wakeUpTime"
                    timeOfDay="wakeUp"
                    toggleIsFormSubmitted={toggleIsFormSubmitted}
                    initialValues={initialValuesPlusTime}
                    handleSubmit={handleWakeUpSubmit}
                    animateY={wakeUpSlide}
                    closeForm={wakeUpTap}
                    formRef={wakeUpFormRef}
                    isDisabled={formsSubmitted.wakeUp}
                />
                <UserInputForm
                    heading="Midday"
                    timeOfDay="midday"
                    toggleIsFormSubmitted={toggleIsFormSubmitted}
                    initialValues={initialValues}
                    handleSubmit={handleMiddaySubmit}
                    isMidday={true} // for styling
                    animateY={middaySlide}
                    closeForm={middayTap}
                    formRef={middayFormRef}
                    isDisabled={formsSubmitted.midday}
                />
                <UserInputForm
                    heading="Bedtime"
                    needsTimeInput={true}
                    timeLabel="Bedtime"
                    timeId="bedtime"
                    timeOfDay="bedtime"
                    toggleIsFormSubmitted={toggleIsFormSubmitted}
                    initialValues={initialValuesPlusTime}
                    handleSubmit={handleBedtimeSubmit}
                    animateY={bedtimeSlide}
                    closeForm={bedtimeTap}
                    formRef={bedtimeFormRef}
                    isDisabled={formsSubmitted.bedtime}
                />
            </FormsContainer>
        </>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
        dateToEdit: state.dateToEdit, // not editing here, but still need access to its data
        moodEmojis: state.moodEmojis,
        tirednessEmojis: state.tirednessEmojis,
    };
};

export default connect(mapStateToProps, {
    getUserData,
    getMainData,
    getDataFromOneDate,
    postBedtimeInputs,
    postWakeUpInputs,
    postMiddayInputs,
})(LandingPage);
