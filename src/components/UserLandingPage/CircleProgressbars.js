import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import CircleProgressbar from "./CircleProgressbar";

const ProgressBarsContainer = styled.section`
    width: 80%;
    max-width: 700px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(75px, 125px));
    grid-gap: 15px;
    box-sizing: border-box;
    justify-content: space-evenly;

    @media (max-width: 400px) {
        width: 90%;
    }
`;

const CircleWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

const Label = styled.p`
    margin-bottom: 0;
`;

const ProgressbarSleepAmount = styled.p`
    margin: 0;
`;

const Emoji = ({ emoji, ariaLabel }) => (
    <span role="img" aria-label={ariaLabel}>
        {emoji}
    </span>
);

const CircleProgressbars = ({ dateToEdit, moodEmojis, tirednessEmojis }) => {
    const [averageMoodEmoji, setAverageMoodEmoji] = useState(0);
    const [moodEmojiAriaLabel, setMoodEmojiAriaLabel] = useState("");
    const [averageTirednessEmoji, setAverageTirednessEmoji] = useState(0);
    const [tirednessEmojiAriaLabel, setTirednessEmojiAriaLabel] = useState("");
    const [sleepBarValue, setSleepBarValue] = useState(0);
    const [moodBarValue, setMoodBarValue] = useState(0);
    const [tirednessBarValue, setTirednessBarValue] = useState(0);
    const totalAvgSleep = 9.8; // dummy number -- should get from backend, but they didn't actually give it to us
    const totalAvgMood = 3; // highest possible mood -- should get from backend, but they didn't actually give it to us
    const totalAvgTiredness = 1; // best possible tiredness -- should get from backend, but they didn't actually give it to us

    const setProgressBarColor = percentage => {
        if (percentage < 34) {
            return "#F20000"; //red
        } else if (percentage < 67 && percentage > 34) {
            return "#EFD914"; // yellow
        } else if (percentage > 67) {
            return "#20C261"; // green
        }

        return "#20C261"; // green
    };

    useEffect(() => {
        let moodEmoji = "";
        let moodAriaLabel = "";
        let tirednessEmoji = "";
        let tirednessAriaLabel = "";
        const { bad: badMood, ok: okMood, great: greatMood } = moodEmojis;
        const {
            bad: badTiredness,
            ok: okTiredness,
            great: greatTiredness,
        } = tirednessEmojis;

        if (dateToEdit.averageMood <= 1) {
            moodEmoji = badMood.emoji;
            moodAriaLabel = badMood.desc;
        } else if (dateToEdit.averageMood > 1 && dateToEdit.averageMood <= 2) {
            moodEmoji = okMood.emoji;
            moodAriaLabel = okMood.desc;
        } else if (dateToEdit.averageMood > 2) {
            moodEmoji = greatMood.emoji;
            moodAriaLabel = greatMood.desc;
        }

        if (dateToEdit.averageTiredness <= 1) {
            tirednessEmoji = greatTiredness.emoji;
            tirednessAriaLabel = greatTiredness.desc;
        } else if (
            dateToEdit.averageTiredness > 1 &&
            dateToEdit.averageTiredness <= 2
        ) {
            tirednessEmoji = okTiredness.emoji;
            tirednessAriaLabel = okTiredness.desc;
        } else if (dateToEdit.averageTiredness > 2) {
            tirednessEmoji = badTiredness.emoji;
            tirednessAriaLabel = badTiredness.desc;
        }

        setAverageMoodEmoji(moodEmoji);
        setMoodEmojiAriaLabel(moodAriaLabel);
        setAverageTirednessEmoji(tirednessEmoji);
        setTirednessEmojiAriaLabel(tirednessAriaLabel);
    }, [dateToEdit, moodEmojis, tirednessEmojis]);

    useEffect(() => {
        let progressValue = dateToEdit.totalTimeInBed * 100;
        progressValue = progressValue / totalAvgSleep;

        setSleepBarValue(progressValue);
    }, [dateToEdit.totalTimeInBed, totalAvgSleep]);

    useEffect(() => {
        let progressValue = dateToEdit.averageMood * 100;
        progressValue = progressValue / totalAvgMood;

        setMoodBarValue(progressValue);
    }, [dateToEdit.averageMood, totalAvgMood]);

    useEffect(() => {
        // inverse ratio since 1 is the best and 3 is the worst
        const worstPossibleValue = 3;

        const progressValue =
            ((worstPossibleValue - dateToEdit.averageTiredness) /
                worstPossibleValue) *
            100;

        setTirednessBarValue(progressValue);
    }, [dateToEdit.averageTiredness, totalAvgTiredness]);

    return (
        <ProgressBarsContainer>
            {/* sleep ratio */}
            <CircleWrapper>
                <CircleProgressbar
                    progressColor={setProgressBarColor(sleepBarValue)}
                    value={sleepBarValue}
                >
                    <ProgressbarSleepAmount>
                        {dateToEdit.totalTimeInBed}hrs
                    </ProgressbarSleepAmount>
                </CircleProgressbar>
                <Label>Sleep</Label>
            </CircleWrapper>

            {/* mood ratio */}
            <CircleWrapper>
                <CircleProgressbar
                    progressColor={setProgressBarColor(moodBarValue)}
                    value={moodBarValue}
                >
                    <Emoji
                        emoji={averageMoodEmoji}
                        ariaLabel={moodEmojiAriaLabel}
                    />
                </CircleProgressbar>
                <Label>Mood</Label>
            </CircleWrapper>

            {/* tiredness ratio */}
            <CircleWrapper>
                <CircleProgressbar
                    progressColor={setProgressBarColor(tirednessBarValue)}
                    value={tirednessBarValue}
                >
                    <Emoji
                        emoji={averageTirednessEmoji}
                        ariaLabel={tirednessEmojiAriaLabel}
                    />
                </CircleProgressbar>
                <Label>Tiredness</Label>
            </CircleWrapper>
        </ProgressBarsContainer>
    );
};

const mapStateToProps = state => {
    return {
        dateToEdit: state.dateToEdit,
        moodEmojis: state.moodEmojis,
        tirednessEmojis: state.tirednessEmojis,
    };
};

export default connect(mapStateToProps, {})(CircleProgressbars);
