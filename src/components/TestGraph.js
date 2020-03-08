import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import styled from "styled-components";
import { getAverages } from "../utils/getAverages";

import { getDataFromDateRange } from "../actions/bwActions";
import { formatDateForInput } from "../utils/formatDateForInput";

import "./TestGraph.css";

const ChartContainer = styled.div`
    height: 80%;
`;

const DateInputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem auto 0;
    max-width: 325px;
`;

const DateLabel = styled.label`
    margin-bottom: 0;
`;

const DateInput = styled.input`
    border: solid 1px lightgray;
    border-radius: 8px;

    @media (max-width: 375px) {
        width: ;
    }
`;

const TestGraph = ({
    graphDatesArray,
    getDataFromDateRange, // need to destructure for useEffect dependency array
}) => {
    const [dateLabels, setDateLabels] = useState([]);
    const [amountOfSleepArray, setAmountOfSleepArray] = useState([]);
    const [moodAndRestObj, setMoodAndRestObj] = useState({
        sleepHours: amountOfSleepArray,
        mood: [],
        restfulness: [],
    });

    const [startingDate, setStartingDate] = useState(() => {
        const today = new Date();
        const sevenDaysAgo = new Date(today.setDate(today.getDate() - 6));
        return sevenDaysAgo;
    });
    const [stringStartingDate, setStringStartingDate] = useState(
        formatDateForInput(startingDate)
    );

    const chartProps = {
        data: {
            labels: [...dateLabels],
            datasets: [
                {
                    data: amountOfSleepArray,
                    label: "This Week",
                    moodAndRest: moodAndRestObj,
                    borderColor: "#3e95cd",
                    fill: false,
                    lineTension: 0,
                    radius: 10,
                    hoverRadius: 15,
                    pointHoverBackgroundColor: "yellow",
                    datalabels: {
                        textStrokeColor: "black",
                        textStrokeWidth: 1,
                        color: "black",
                        font: {
                            size: 16,
                        },
                    },
                },
            ],
        },
        options: {
            animation: {
                duration: 0,
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                onClick: e => e.stopPropagation(),
                display: false,
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            suggestedMax: 12,
                            beginAtZero: true,
                        },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            min: 9,
                        },
                    },
                ],
            },
            plugins: {
                // Change options for ALL labels of THIS CHART
            },

            title: {
                display: false,
            },
            tooltips: {
                titleFontSize: 10,
                bodyFontSize: 16,
                bodySpacing: 10,
                bodyAlign: "center",
                caretPadding: 6,
                mode: "nearest",
                callbacks: {
                    // Use the footer callback to display the sum of the items showing in the tooltip
                    formatter: function(value) {
                        return `line1\nline2\n${value}`;
                        // eq. return ['line1', 'line2', value]
                    },
                    label: function(tooltipItem, data) {
                        const thisDataset =
                            data.datasets[Number(tooltipItem.datasetIndex)];

                        const WeekLabel = `Hours slept: ${
                            thisDataset.data[Number(tooltipItem.index)]
                        }`;

                        return WeekLabel;
                    },
                    afterLabel: function(tooltipItem, data) {
                        const thisDataset =
                            data.datasets[Number(tooltipItem.datasetIndex)];
                        const rest =
                            thisDataset.moodAndRest.restfulness[
                                Number(tooltipItem.index)
                            ];
                        const mood =
                            thisDataset.moodAndRest.mood[
                                Number(tooltipItem.index)
                            ];

                        const stringo = `Tiredness: ${rest} | Mood: ${mood}`;

                        return stringo;
                    },
                },
                footerFontStyle: "normal",
            },
        },
    };
    const chartReference = React.createRef();

    const handleDateChange = e => {
        const newTime = e.target.value;
        const timeZoneAdjusted = `${newTime}T00:00-0800`;

        setStartingDate(new Date(timeZoneAdjusted));
        setStringStartingDate(e.target.value);
    };

    useEffect(() => {
        const getDates = startDate => {
            getDataFromDateRange(startDate);
        };

        getDates(formatDateForInput(startingDate));
    }, [startingDate, getDataFromDateRange]);

    useEffect(() => {
        const sleepArray = graphDatesArray.map(day => day.totalTimeInBed);

        setAmountOfSleepArray(sleepArray);

        const graphDateLabels = graphDatesArray.map(day => day.date);

        setDateLabels(graphDateLabels);
    }, [graphDatesArray]);

    useEffect(() => {
        const moodAndRest = {
            sleepHours: amountOfSleepArray,
            mood: [],
            restfulness: [],
        };

        moodAndRest.mood = getAverages(graphDatesArray).averageMood;

        moodAndRest.restfulness = getAverages(graphDatesArray).averageTiredness;

        setMoodAndRestObj(moodAndRest);
    }, [graphDatesArray, amountOfSleepArray]);

    return (
        <>
            <ChartContainer className="chartCanvas">
                <DateInputContainer>
                    <DateLabel htmlFor="graphDate">Graph start date:</DateLabel>
                    <DateInput
                        id="graphDate"
                        type="date"
                        name="startingDate"
                        value={stringStartingDate}
                        onChange={e => handleDateChange(e)}
                    />
                </DateInputContainer>

                <div className="actualChart">
                    <Line
                        ref={chartReference}
                        data={chartProps.data}
                        options={chartProps.options}
                    />
                </div>
            </ChartContainer>
        </>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
        graphDatesArray: state.graphDatesArray,
    };
};

export default connect(mapStateToProps, { getDataFromDateRange })(TestGraph);
