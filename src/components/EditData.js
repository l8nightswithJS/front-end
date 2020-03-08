import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { formatDateForInput } from "../utils/formatDateForInput";
import useOnClickOutside from "../hooks/useOnClickOutside";

import {
    getMainData,
    editMood,
    editTiredness,
    editWakeAndBedTimes,
    getDataFromOneDate,
} from "../actions/bwActions";

import {
    LandingPageContainer,
    ButtonsContainer,
    InputFormButton,
    FormsContainer,
} from "./UserLandingPage/LandingPage";
import CircleProgressbars from "./UserLandingPage/CircleProgressbars";
import UserInputForm from "./UserLandingPage/UserInputForm";

const EditDataContainer = styled(LandingPageContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

const DateInputContainer = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 10px;

    & label {
        margin-bottom: 0;
    }

    & input {
        max-width: 150px;
    }
`;

const EditData = ({
    dateToEdit,
    getDataFromOneDate, // need to destructure b/c of useEffect dependency array warning error
    getMainData, // need to destructure b/c of useEffect dependency array warning error
    moodEmojis,
    tirednessEmojis,
    ...props
}) => {
    const [date, setDate] = useState(new Date());
    const [stringDate, setStringDate] = useState(formatDateForInput(date));

    // for "closing" forms when clicking outside of them
    const wakeUpFormRef = useRef(null);
    const middayFormRef = useRef(null);
    const bedtimeFormRef = useRef(null);

    const wakeUpButtonRef = useRef(null);
    const middayButtonRef = useRef(null);
    const bedtimeButtonRef = useRef(null);

    // for the IconTab swiping animation
    const [wakeUpSlide, setWakeUpSlide] = useState(0);
    const [bedtimeSlide, setBedtimeSlide] = useState(0);
    const [middaySlide, setMiddaySlide] = useState(0);

    // handleTap functions for the IconTab animations
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

    const handleDateChange = e => {
        const newTime = e.target.value;
        const timeZoneAdjusted = `${newTime}T00:00-0800`;

        setDate(new Date(timeZoneAdjusted));
        setStringDate(e.target.value);
    };

    // handleSubmit for sending the PUT request to the server
    const handleMoodSubmit = (timeOfDay, dateId, updatedMood) => {
        // invoke action creator here that does the PUT request
        // action.payload = the date's updated redux state for the times, mood, and tiredness
        props.editMood(timeOfDay, dateId, updatedMood);
    };

    const handleTirednessSubmit = (
        initialVals,
        timeOfDay,
        dateId,
        updatedTiredness
    ) => {
        props.editTiredness(timeOfDay, dateId, updatedTiredness);
    };

    const handleSleepTimesSubmit = (timeOfDay, dateId, updatedTime) => {
        // updatedTime needs to be Date.toISOString()
        props.editWakeAndBedTimes(timeOfDay, dateId, updatedTime);
    };

    useEffect(() => {
        const getDateData = day => {
            getDataFromOneDate(day);
        };

        // value give to getDateData needs to be YYYY-MM-DD
        getDateData(formatDateForInput(date));
    }, [date, getDataFromOneDate]);

    useEffect(() => {
        const fetchUserData = () => {
            getMainData();
        };

        fetchUserData();
    }, [getMainData]);

    return (
        <>
            <EditDataContainer>
                <DateInputContainer>
                    <label htmlFor="editDate">Date to edit:</label>
                    <input
                        id="editDate"
                        type="date"
                        name="editDate"
                        value={stringDate}
                        onChange={e => {
                            handleDateChange(e);
                        }}
                    />
                </DateInputContainer>

                {/* Amount of sleep, mood, and tiredness levels compared to averages as circular progress "bars" */}
                <CircleProgressbars />

                <ButtonsContainer>
                    <InputFormButton
                        ref={wakeUpButtonRef}
                        onTap={() => wakeUpTap()}
                        isWakeUp={true} // used for styled components for conditional styles
                    >
                        Wake Up
                    </InputFormButton>

                    <InputFormButton
                        ref={middayButtonRef}
                        onTap={() => middayTap()}
                        isMidday={true} // used for styled components for conditional styles
                    >
                        Midday
                    </InputFormButton>

                    <InputFormButton
                        ref={bedtimeButtonRef}
                        onTap={() => bedtimeTap()}
                        isBedtime={true} // used for styled components for conditional styles
                    >
                        Bedtime
                    </InputFormButton>
                </ButtonsContainer>
            </EditDataContainer>
            <FormsContainer>
                <UserInputForm
                    dateId={dateToEdit.dateId}
                    heading="Wake Up"
                    needsTimeInput={true}
                    timeLabel="Wake up time"
                    timeId="wakeUpTime"
                    timeOfDay="wakeUp"
                    initialValues={dateToEdit.wakeUp}
                    handleMoodSubmit={handleMoodSubmit}
                    handleTirednessSubmit={handleTirednessSubmit}
                    handleSleepTimesSubmit={handleSleepTimesSubmit}
                    animateY={wakeUpSlide}
                    closeForm={wakeUpTap}
                    formRef={wakeUpFormRef}
                />
                <UserInputForm
                    dateId={dateToEdit.dateId}
                    heading="Midday"
                    timeOfDay="midday"
                    initialValues={dateToEdit.midday}
                    handleMoodSubmit={handleMoodSubmit}
                    handleTirednessSubmit={handleTirednessSubmit}
                    isMidday={true} // for styling
                    animateY={middaySlide}
                    closeForm={middayTap}
                    formRef={middayFormRef}
                />
                <UserInputForm
                    dateId={dateToEdit.dateId}
                    heading="Bedtime"
                    needsTimeInput={true}
                    timeLabel="Bedtime"
                    timeId="bedtime"
                    timeOfDay="bedtime"
                    initialValues={dateToEdit.bedtime}
                    handleMoodSubmit={handleMoodSubmit}
                    handleTirednessSubmit={handleTirednessSubmit}
                    handleSleepTimesSubmit={handleSleepTimesSubmit}
                    animateY={bedtimeSlide}
                    closeForm={bedtimeTap}
                    formRef={bedtimeFormRef}
                />
            </FormsContainer>
        </>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
        moodEmojis: state.moodEmojis,
        tirednessEmojis: state.tirednessEmojis,
        dateToEdit: state.dateToEdit,
    };
};

export default connect(mapStateToProps, {
    getMainData,
    editMood,
    editTiredness,
    editWakeAndBedTimes,
    getDataFromOneDate,
})(EditData);
