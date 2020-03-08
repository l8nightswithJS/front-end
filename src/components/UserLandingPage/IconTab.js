import React from "react";
import { motion } from "framer-motion";
import { Formik } from "formik";
import styled from "styled-components";
import { isDiff } from "../../utils/isDiff";

import RatingComponent from "./RatingComponent";

const FormContainer = styled(motion.div)`
    width: 250px;
    box-sizing: border-box;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background: gray;
    position: absolute;
    bottom: ${props => (props.isMidday ? "-243px" : "-250px")};
    left: calc((100vw / 2) - 125px);
    border-radius: 12px;
`;

const Heading = styled.h2`
    margin: 0.5rem 0;
`;

const IconContainer = styled(motion.div)`
    box-sizing: border-box;
    height: 2.5rem;
    font-size: 2.5rem;
    z-index: 5;
    position: absolute;
    right: ${props => (props.isWakeUp ? "0" : "unset")};
    left: ${props => (props.isBedtime ? "0" : "unset")};
    top: ${props => (props.isMidday ? "5px" : "unset")};
`;

const InputTime = styled.input`
    width: 90%;
`;

const TimeInput = ({ labelText, timeId, time, handleChange }) => (
    <>
        <label htmlFor={timeId}>{labelText}</label>
        <InputTime
            type="datetime-local" // returns time as a string with the following format: "2020-02-29T02:00"
            id={timeId}
            name="time"
            value={time}
            onChange={handleChange}
        />
    </>
);

const IconTab = ({
    heading,
    needsTimeInput,
    timeLabel,
    timeId,
    timeOfDay,
    initialValues,
    handleSubmit,
    isMiddayTiredness, // used for styling midday tiredness input
    isWakeUp, // used for styled components for conditional styles
    isMidday, // used for styled components for conditional styles
    isBedtime, // used for styled components for conditional styles
    icon: Icon, // since it is used as a component, it needs to be capitalized
    // animateX,
    animateY,
    // tapFunc,
}) => {
    return (
        <FormContainer
            isWakeUp={isWakeUp} // used for styled components for conditional styles
            isBedtime={isBedtime} // used for styled components for conditional styles
            isMidday={isMidday} // used for styled components for conditional styles
            animate={{
                y: animateY,
                zIndex: animateY ? 10 : 0,
            }}
        >
            <Heading isMidday={isMidday}>{heading}</Heading>
            <Formik
                initialValues={{
                    ...initialValues,
                }}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, setFieldValue, submitForm }) => (
                    <>
                        {/* don't need time input for midday ratings */}
                        {needsTimeInput && (
                            <TimeInput
                                labelText={timeLabel}
                                timeId={timeId}
                                time={values.time}
                                handleChange={e => {
                                    handleChange(e);
                                    // automatically submit the form when all values have an input that are different from their initialized values
                                    if (
                                        isDiff(
                                            {
                                                ...values,
                                                time: e.target.value,
                                            },
                                            initialValues
                                        )
                                    ) {
                                        submitForm();
                                    }
                                }}
                            />
                        )}

                        {/* Mood rating input */}
                        <RatingComponent
                            isMoodForm={true}
                            name="mood"
                            id="mood"
                            timeOfDay={timeOfDay}
                            value={values.mood}
                            handleChange={newValue => {
                                setFieldValue("mood", newValue);
                                // automatically submit the form when all values have an input that are different from their initialized values
                                if (
                                    isDiff(
                                        {
                                            ...values,
                                            mood: newValue,
                                        },
                                        initialValues
                                    )
                                ) {
                                    submitForm();
                                }
                            }}
                        />

                        {/* Tiredness rating input */}
                        <RatingComponent
                            isMoodForm={false}
                            isMiddayTiredness={isMiddayTiredness}
                            name="tiredness"
                            id="tiredness"
                            timeOfDay={timeOfDay}
                            value={values.tiredness}
                            handleChange={newValue => {
                                setFieldValue("tiredness", newValue);
                                // automatically submit the form when all values have an input that are different from their initialized values
                                if (
                                    isDiff(
                                        {
                                            ...values,
                                            tiredness: newValue,
                                        },
                                        initialValues
                                    )
                                ) {
                                    submitForm();
                                }
                            }}
                        />
                    </>
                )}
            </Formik>
            {/* <IconContainer
                isWakeUp={isWakeUp} // used for styled components for conditional styles
                isMidday={isMidday} // used for styled components for conditional styles
                isBedtime={isBedtime} // used for styled components for conditional styles
                onTap={tapFunc}
            >
                <Icon />
            </IconContainer> */}
        </FormContainer>
    );
};

export default IconTab;
