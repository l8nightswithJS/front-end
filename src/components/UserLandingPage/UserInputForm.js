import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Formik } from "formik";
import { isDiff } from "../../utils/isDiff";
import { formatTime } from "../../utils/formatTime";

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
    bottom: ${props => (props.isMidday ? "-243px" : "-260px")};
    left: calc((100vw / 2) - 125px);
    border-radius: 12px;
`;

const Heading = styled.h2`
    margin: 0.5rem 0;
`;

const InputTime = styled.input`
    width: 90%;
    margin: 0 auto;
`;

const TimeInput = ({ labelText, timeId, time, handleChange }) => (
    <>
        <label htmlFor={timeId}>{labelText}</label>
        <InputTime
            type="datetime-local" // returns time as a string with the following format: "2020-02-29T02:00"
            role="input"
            id={timeId}
            name="time"
            value={time}
            onChange={handleChange}
        />
    </>
);

const UserInputForm = ({
    dateId,
    heading,
    needsTimeInput,
    timeLabel,
    timeId,
    timeOfDay,
    toggleIsFormSubmitted,
    initialValues,
    handleSubmit,
    handleMoodSubmit,
    handleTirednessSubmit,
    handleSleepTimesSubmit,
    animateY,
    closeForm,
    formRef,
    isDisabled,
}) => {
    return (
        <FormContainer
            ref={formRef}
            animate={{
                y: isDisabled ? 0 : animateY, // if the button is disabled, don't allow the animation
                zIndex: animateY ? 10 : 0,
            }}
        >
            <Heading>{heading}</Heading>
            <Formik
                initialValues={{
                    ...initialValues,
                }}
                enableReinitialize // to update initialValues for EditData
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, setFieldValue, submitForm }) => {
                    // console.log("values: ", values);
                    return (
                        <>
                            {needsTimeInput && (
                                <TimeInput
                                    labelText={timeLabel}
                                    timeId={timeId}
                                    time={formatTime(values.time)}
                                    handleChange={e => {
                                        handleChange(e);

                                        if (
                                            initialValues.time !== "" &&
                                            initialValues.time !==
                                                e.target.value
                                        ) {
                                            handleSleepTimesSubmit(
                                                // e,
                                                timeOfDay,
                                                dateId,
                                                e.target.value
                                            );
                                        }

                                        // automatically submit the form when all values have an input that are different from their initialized values
                                        else if (
                                            isDiff(
                                                {
                                                    ...values,
                                                    time: e.target.value,
                                                },
                                                initialValues
                                            )
                                        ) {
                                            if (handleSubmit) {
                                                submitForm();
                                            }

                                            if (toggleIsFormSubmitted) {
                                                toggleIsFormSubmitted(
                                                    timeOfDay
                                                ); // to disable the button
                                            }
                                            closeForm(); // "close" the form
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

                                    if (
                                        initialValues.mood > 0 &&
                                        newValue !== initialValues
                                    ) {
                                        handleMoodSubmit(
                                            // e,
                                            timeOfDay,
                                            dateId,
                                            newValue
                                        );
                                    }

                                    // automatically submit the form when all values have an input that are different from their initialized values
                                    else if (
                                        isDiff(
                                            {
                                                ...values,
                                                mood: newValue,
                                            },
                                            initialValues
                                        )
                                    ) {
                                        if (handleSubmit) {
                                            submitForm();
                                        }

                                        if (toggleIsFormSubmitted) {
                                            toggleIsFormSubmitted(timeOfDay); // to disable the button
                                        }
                                        closeForm(); // "close" the form
                                    }
                                }}
                            />

                            {/* Tiredness rating input */}
                            <RatingComponent
                                isMoodForm={false}
                                name="tiredness"
                                id="tiredness"
                                timeOfDay={timeOfDay}
                                value={values.tiredness}
                                handleChange={newValue => {
                                    setFieldValue("tiredness", newValue);

                                    if (
                                        initialValues.tiredness > 0 &&
                                        newValue !== initialValues
                                    ) {
                                        handleTirednessSubmit(
                                            // e,
                                            initialValues,
                                            timeOfDay,
                                            dateId,
                                            newValue
                                        );
                                    }

                                    // automatically submit the form when all values have an input that are different from their initialized values
                                    else if (
                                        isDiff(
                                            {
                                                ...values,
                                                tiredness: newValue,
                                            },
                                            initialValues
                                        )
                                    ) {
                                        if (handleSubmit) {
                                            submitForm();
                                        }

                                        if (toggleIsFormSubmitted) {
                                            toggleIsFormSubmitted(timeOfDay); // to disable the button
                                        }
                                        closeForm(); // "close" the form
                                    }
                                }}
                            />
                        </>
                    );
                }}
            </Formik>
        </FormContainer>
    );
};

export default UserInputForm;
