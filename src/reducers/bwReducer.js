/* eslint-disable complexity */
/* eslint-disable no-case-declarations */
import {
    FETCHING_USER,
    FETCH_USER_DATA,
    ERROR_FETCHING_USER_DATA,
    FETCHING_MAIN_DATA,
    FETCH_MAIN_DATA,
    ERROR_FETCHING_MAIN_DATA,
    POSTING_USER_INPUTS,
    POSTING_USER_INPUTS_SUCCESS,
    POSTING_USER_INPUTS_FAILURE,
    UPDATING_USER_INPUTS,
    UPDATING_USER_INPUTS_SUCCESS,
    UPDATING_USER_INPUTS_FAILURE,
    DELETING_USER,
    DELETING_USER_SUCCESS,
    DELETING_USER_FAILURE,
    FETCHING_DATE_RANGE_DATA,
    FETCHING_DATE_RANGE_DATA_SUCCESS,
    FETCHING_DATE_RANGE_DATA_FAILURE,
    UPDATING_MIDDAY_INPUTS,
    UPDATING_MIDDAY_INPUTS_SUCCESS,
    UPDATING_MIDDAY_INPUTS_FAILURE,
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
    FETCHING_DATA_FOR_ONE_DATE,
    FETCHING_DATA_FOR_ONE_DATE_SUCCESS,
    FETCHING_DATA_FOR_ONE_DATE_FAILURE,
    EDITING_MOOD,
    EDITING_MOOD_SUCCESS,
    EDITING_MOOD_FAILURE,
    EDITING_TIREDNESS,
    EDITING_TIREDNESS_SUCCESS,
    EDITING_TIREDNESS_FAILURE,
    EDITING_SLEEP_TIMES,
    EDITING_SLEEP_TIMES_SUCCESS,
    EDITING_SLEEP_TIMES_FAILURE,
} from "../actions/bwActions";

const initialState = {
    // initialize your state here
    user: {
        userId: "",
        username: "",
        firstName: "",
        email: "",
        sleepRecommendation: "", // after 30+ days of data
        dates: [
            {
                date: "",
                dateId: "",
                totalTimeInBed: 0,
                wakeUp: {
                    time: "",
                    mood: 0,
                    tiredness: 0,
                },
                midday: {
                    mood: 0,
                    tiredness: 0,
                },
                bedtime: {
                    time: "",
                    mood: 0,
                    tiredness: 0,
                },
            },
        ],
    },

    // need to add their numeric values here for the DS model
    // pass the value for the `isSelected` prop in the Emoji component in RatingComponent
    moodEmojis: {
        great: {
            emoji: "😊",
            desc: "smiling face with smiling eyes",
            value: 3,
        },
        ok: {
            emoji: "😐",
            desc: "neutral face",
            value: 2,
        },
        bad: {
            emoji: "🙁",
            desc: "Sad frowning face",
            value: 1,
        },
    },
    tirednessEmojis: {
        great: {
            emoji: "🥳",
            desc: "energetic party face",
            value: 1,
        },
        ok: {
            emoji: "😐",
            desc: "neutral face",
            value: 2,
        },
        bad: {
            emoji: "😴",
            desc: "Sleeping face",
            value: 3,
        },
    },
    graphDatesArray: [],
    dateToEdit: {
        date: "",
        dateId: "",
        totalTimeInBed: 0,
        averageMood: 0,
        averageTiredness: 0,
        wakeUp: {
            time: "",
            mood: 0,
            tiredness: 0,
        },
        midday: {
            mood: 0,
            tiredness: 0,
        },
        bedtime: {
            time: "",
            mood: 0,
            tiredness: 0,
        },
    },
    isLoading: false,
    error: "",
};

export const bwReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_USER:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case FETCH_USER_DATA:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                error: "",
            };
        case ERROR_FETCHING_USER_DATA:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case FETCHING_MAIN_DATA:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case FETCH_MAIN_DATA:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                error: "",
            };
        case ERROR_FETCHING_MAIN_DATA:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case POSTING_USER_INPUTS:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case POSTING_USER_INPUTS_SUCCESS:
            // this is for POST for the bedtime inputs
            // expected to be given the whole day object from the database so that we could update our redux state, but we're given back very useless information...so we can't update our state

            // let datesArray = [...state.user.dates];

            // get the index of the date object we want to update
            // const dateIndex = datesArray.findIndex(
            //     day => day.dateId === action.payload.dateId
            // );

            // check if date exists -- if it's a new day, it shouldn't exist yet
            // add the new date to the end of the array
            // datesArray = [...datesArray, action.payload.dateObj];

            // update just that date object
            // datesArray[dateIndex].midday.mood = 3; // ...do our updating

            return {
                ...state,
                // user: {
                //     ...state.user,
                //     dates: datesArray,
                // },
                isLoading: false,
                error: "",
            };
        case POSTING_USER_INPUTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case UPDATING_USER_INPUTS:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case UPDATING_USER_INPUTS_SUCCESS:
            // expected to be given the whole day object from the database so that we could update our redux state, but we're given back very useless information...so we can't update our state

            return {
                ...state,
                isLoading: false,
                error: "",
            };
        case UPDATING_USER_INPUTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case DELETING_USER:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case DELETING_USER_SUCCESS:
            // reset the user object to its initial state after the user has been deleted
            return {
                ...state,
                user: {
                    userId: "",
                    username: "",
                    firstName: "",
                    email: "",
                    sleepRecommendation: "", // after 30+ days of data
                    dates: [
                        {
                            date: "",
                            dateId: "",
                            totalTimeInBed: 0,
                            wakeUp: {
                                time: "",
                                mood: 0,
                                tiredness: 0,
                            },
                            midday: {
                                mood: 0,
                                tiredness: 0,
                            },
                            bedtime: {
                                time: "",
                                mood: 0,
                                tiredness: 0,
                            },
                        },
                    ],
                },
                isLoading: false,
                error: "",
            };
        case DELETING_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case FETCHING_DATE_RANGE_DATA:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case FETCHING_DATE_RANGE_DATA_SUCCESS:
            return {
                ...state,
                graphDatesArray: action.payload,
                isLoading: false,
                error: "",
            };
        case FETCHING_DATE_RANGE_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case UPDATING_MIDDAY_INPUTS:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case UPDATING_MIDDAY_INPUTS_SUCCESS:
            // expected to be given the whole day object from the database so that we could update our redux state, but we're given back very useless information...so we can't update our state

            return {
                ...state,
                isLoading: false,
                error: "",
            };
        case UPDATING_MIDDAY_INPUTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case ADD_USER:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case ADD_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                error: "",
            };
        case ADD_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case FETCHING_DATA_FOR_ONE_DATE:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case FETCHING_DATA_FOR_ONE_DATE_SUCCESS:
            const wakeUpMood = action.payload.wakeUp.mood;
            const middayMood = action.payload.midday.mood;
            const bedtimeMood = action.payload.bedtime.mood;

            const wakeUpTiredness = action.payload.wakeUp.tiredness;
            const middayTiredness = action.payload.midday.tiredness;
            const bedtimeTiredness = action.payload.bedtime.tiredness;

            const averageMood = (wakeUpMood + middayMood + bedtimeMood) / 3;
            const averageTiredness =
                (wakeUpTiredness + middayTiredness + bedtimeTiredness) / 3;

            return {
                ...state,
                dateToEdit: {
                    ...action.payload,
                    averageMood,
                    averageTiredness,
                },
                isLoading: false,
                error: "",
            };
        case FETCHING_DATA_FOR_ONE_DATE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case EDITING_MOOD:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case EDITING_MOOD_SUCCESS:
            // backend throws 500 error
            // expected to be given the whole day object from the database so that we could update our redux state, but we're given back very useless information...so we can't update our state
            return {
                ...state,
                isLoading: false,
                error: "",
            };
        case EDITING_MOOD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case EDITING_TIREDNESS:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case EDITING_TIREDNESS_SUCCESS:
            // backend throws 404 error
            // expected to be given the whole day object from the database so that we could update our redux state, but we're given back very useless information...so we can't update our state
            return {
                ...state,
                isLoading: false,
                error: "",
            };
        case EDITING_TIREDNESS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case EDITING_SLEEP_TIMES:
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case EDITING_SLEEP_TIMES_SUCCESS:
            // expected to be given the whole day object from the database so that we could update our redux state, but we're given back very useless information...so we can't update our state
            return {
                ...state,
                isLoading: false,
                error: "",
            };
        case EDITING_SLEEP_TIMES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
