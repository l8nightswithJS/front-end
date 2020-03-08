import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";
import { formatDateForInput } from "../utils/formatDateForInput";

export const FETCHING_USER = "FETCHING_USER";
export const FETCH_USER_DATA = "FETCH_USER_DATA";
export const ERROR_FETCHING_USER_DATA = "ERROR_FETCHING_USER_DATA";
export const FETCHING_MAIN_DATA = "FETCHING_MAIIN_DATA";
export const FETCH_MAIN_DATA = "FETCH_MAIN_DATA";
export const ERROR_FETCHING_MAIN_DATA = "ERROR_FETCHING_MAIN_DATA";
export const POSTING_USER_INPUTS = "POSTING_USER_INPUTS";
export const POSTING_USER_INPUTS_SUCCESS = "POSTING_USER_INPUTS_SUCCESS";
export const POSTING_USER_INPUTS_FAILURE = "POSTING_USER_INPUTS_FAILURE";
export const UPDATING_USER_INPUTS = "UPDATING_USER_INPUTS";
export const UPDATING_USER_INPUTS_SUCCESS = "UPDATING_USER_INPUTS_SUCCESS";
export const UPDATING_USER_INPUTS_FAILURE = "UPDATING_USER_INPUTS_FAILURE";
export const DELETING_USER = "DELETING_USER";
export const DELETING_USER_SUCCESS = "DELETING_USER_SUCCESS";
export const DELETING_USER_FAILURE = "DELETING_USER_FAILURE";
export const FETCHING_DATE_RANGE_DATA = "FETCHING_DATE_RANGE_DATA";
export const FETCHING_DATE_RANGE_DATA_SUCCESS =
    "FETCHING_DATE_RANGE_DATA_SUCCESS";
export const FETCHING_DATE_RANGE_DATA_FAILURE =
    "FETCHING_DATE_RANGE_DATA_FAILURE";
export const UPDATING_MIDDAY_INPUTS = "UPDATING_MIDDAY_INPUTS";
export const UPDATING_MIDDAY_INPUTS_SUCCESS = "UPDATING_MIDDAY_INPUTS_SUCCESS";
export const UPDATING_MIDDAY_INPUTS_FAILURE = "UPDATING_MIDDAY_INPUTS_FAILURE";
export const ADD_USER = "ADDING_USER";
export const ADD_USER_SUCCESS = "ADDING_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADDING_USER_FAILURE";
export const EDITING_MOOD = "EDITING_MOOD";
export const EDITING_MOOD_SUCCESS = "EDITING_MOOD_SUCCESS";
export const EDITING_MOOD_FAILURE = "EDITING_MOOD_FAILURE";
export const FETCHING_DATA_FOR_ONE_DATE = "FETCHING_DATA_FOR_ONE_DATE";
export const FETCHING_DATA_FOR_ONE_DATE_SUCCESS =
    "FETCHING_DATA_FOR_ONE_DATE_SUCCESS";
export const FETCHING_DATA_FOR_ONE_DATE_FAILURE =
    "FETCHING_DATA_FOR_ONE_DATE_FAILURE";
export const EDITING_TIREDNESS = "EDITING_TIREDNESS";
export const EDITING_TIREDNESS_SUCCESS = "EDITING_TIREDNESS_SUCCESS";
export const EDITING_TIREDNESS_FAILURE = "EDITING_TIREDNESS_FAILURE";
export const EDITING_SLEEP_TIMES = "EDITING_SLEEP_TIMES";
export const EDITING_SLEEP_TIMES_SUCCESS = "EDITING_SLEEP_TIMES_SUCCESS";
export const EDITING_SLEEP_TIMES_FAILURE = "EDITING_SLEEP_TIMES_FAILURE";

export const getUserData = () => dispatch => {
    dispatch({ type: FETCHING_USER });

    axiosWithAuth()
        .get("/user")
        .then(res => {
            dispatch({ type: FETCH_USER_DATA, payload: res.data });
        })
        .catch(err => {
            console.log("err: ", err);
            dispatch({ type: ERROR_FETCHING_USER_DATA, payload: err.message });
        });
};

export const getDataFromDateRange = date => dispatch => {
    dispatch({ type: FETCHING_DATE_RANGE_DATA });
    // date needs to come in as YYYY-MM-DD
    // convert date to MM-DD-YYYY format
    let startDate = `${date.slice(5, date.length)}-${date.slice(0, 4)}`;

    // if month is single digit, it will have a zero
    // don't want the zero for the api request
    if (startDate[0] === 0 || startDate[0] === "0") {
        startDate = startDate.slice(1, startDate.length);
    }

    const startDateObj = new Date(startDate);

    // gets a Date object for 6 days from the startDate
    const endDateObj = new Date(
        startDateObj.setDate(startDateObj.getDate() + 7)
    );

    // convert to date string in MM-DD-YYYY format and replace / with -
    // let endDate = endDateObj.toLocaleDateString().replace(/\//g, "-");
    let endDate = formatDateForInput(endDateObj);

    endDate = `${endDate.slice(5, endDate.length)}-${endDate.slice(0, 4)}`;

    if (endDate[0] === 0 || endDate[0] === "0") {
        endDate = endDate.slice(1, endDate.length);
    }

    // https://sleep-tracker-server.herokuapp.com/api/data?start=12-29-2019&end=2-26-2020 would return all data from 12/29/2019 - 2/26/2020.
    axiosWithAuth()
        .get(`/data?start=${startDate}&end=${endDate}`)
        .then(res => {
            dispatch({
                type: FETCHING_DATE_RANGE_DATA_SUCCESS,
                payload: res.data.dates,
            });
        })
        .catch(err => {
            console.log("Error getting data from date range: ", err);
            dispatch({
                type: FETCHING_DATE_RANGE_DATA_FAILURE,
                payload: err.message,
            });
        });
};

export const getMainData = () => dispatch => {
    dispatch({ type: FETCHING_MAIN_DATA });

    axiosWithAuth()
        .get("/data")
        .then(res => {
            dispatch({ type: FETCH_MAIN_DATA, payload: res.data });
        })
        .catch(err => {
            console.log("err: ", err);
            dispatch({ type: ERROR_FETCHING_MAIN_DATA, payload: err.message });
        });
};

export const postBedtimeInputs = valuesObj => dispatch => {
    dispatch({ type: POSTING_USER_INPUTS });

    axiosWithAuth()
        .post("/night", valuesObj)
        .then(res => {
            dispatch({ type: POSTING_USER_INPUTS_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log("error posting bedtime inputs: ", err);
            dispatch({
                type: POSTING_USER_INPUTS_FAILURE,
                payload: err.message,
            });
        });
};

// backend was set up in such a way that the POST actually has to be a PUT request
export const postWakeUpInputs = valuesObj => dispatch => {
    dispatch({ type: UPDATING_USER_INPUTS });

    axiosWithAuth()
        .put("/wake", valuesObj)
        .then(res => {
            dispatch({ type: UPDATING_USER_INPUTS_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log("error updating data: ", err);
            dispatch({
                type: UPDATING_USER_INPUTS_FAILURE,
                payload: err.message,
            });
        });
};

// backend was set up in such a way that the POST actually has to be a PUT request
export const postMiddayInputs = valuesObj => dispatch => {
    dispatch({ type: UPDATING_MIDDAY_INPUTS });

    axiosWithAuth()
        .put("/midday", valuesObj)
        .then(res => {
            dispatch({ type: UPDATING_MIDDAY_INPUTS, payload: res.data });
        })
        .catch(err => {
            console.log("Error with PUT request for midday: ", err);
            dispatch({
                type: UPDATING_MIDDAY_INPUTS_FAILURE,
                payload: err.message,
            });
        });
};

export const deleteUserAccount = () => dispatch => {
    dispatch({ type: DELETING_USER });

    axiosWithAuth()
        .delete("/user/delete")
        .then(res => {
            dispatch({ type: DELETING_USER_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log("error deleting account: ", err);
            dispatch({ type: DELETING_USER_FAILURE, payload: err.message });
        });
};

export const addUser = () => dispatch => {
    dispatch({ type: ADD_USER });

    axios()
        .post("https://sleep-tracker-server.herokuapp.com/api/auth/register")
        .then(res => {
            dispatch({ type: ADD_USER_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: ADD_USER_FAILURE, payload: err.message });
        });
};

export const getDataFromOneDate = date => dispatch => {
    dispatch({ type: FETCHING_DATA_FOR_ONE_DATE });

    let formattedDate = `${date.slice(5, date.length)}-${date.slice(0, 4)}`;

    if (formattedDate[0] === 0 || formattedDate[0] === "0") {
        formattedDate = formattedDate.slice(1, formattedDate.length);
    }

    const dateAsObject = new Date(date);
    let endDate = new Date(dateAsObject.setDate(dateAsObject.getDate() + 2));

    endDate = formatDateForInput(endDate);

    endDate = `${endDate.slice(5, endDate.length)}-${endDate.slice(0, 4)}`;

    if (endDate[0] === 0 || endDate[0] === "0") {
        endDate = endDate.slice(1, endDate.length);
    }

    axiosWithAuth()
        // getting single date GET request only works if the end date is the next day
        .get(`/data?start=${formattedDate}&end=${endDate}`)
        .then(res => {
            dispatch({
                type: FETCHING_DATA_FOR_ONE_DATE_SUCCESS,
                payload: res.data.dates[0],
            });
        })
        .catch(err => {
            console.log("error in getDataFromOneDate: ", err);
            dispatch({
                type: FETCHING_DATA_FOR_ONE_DATE_FAILURE,
                payload: err.message,
            });
        });
};

export const editMood = (timeOfDay, dateId, updatedMood) => dispatch => {
    dispatch({ type: EDITING_MOOD });
    let keyName = "";

    if (timeOfDay === "wakeUp") {
        keyName = "wakeMood";
    } else if (timeOfDay === "midday") {
        keyName = "middayMood";
    } else if (timeOfDay === "bedtime") {
        keyName = "nightMood";
    }

    const putRequestObj = {
        [keyName]: updatedMood,
    };

    axiosWithAuth()
        .put(`/moods/${dateId}`, putRequestObj)
        .then(res => {
            dispatch({ type: EDITING_MOOD_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log("Error editing mood: ", err);
            dispatch({ type: EDITING_MOOD_FAILURE, payload: err.message });
        });
};

export const editTiredness = (
    timeOfDay,
    dateId,
    updatedTiredness
) => dispatch => {
    dispatch({ type: EDITING_TIREDNESS });

    let keyName = "";

    if (timeOfDay === "wakeUp") {
        keyName = "wakeTired";
    } else if (timeOfDay === "midday") {
        keyName = "middayTired";
    } else if (timeOfDay === "bedtime") {
        keyName = "nightTired";
    }

    const putRequestObj = {
        [keyName]: updatedTiredness,
    };

    axiosWithAuth()
        .put(`/tiredness/${dateId}`, putRequestObj)
        .then(res => {
            dispatch({ type: EDITING_TIREDNESS_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log("Error editing tiredness: ", err);
            dispatch({ type: EDITING_TIREDNESS_FAILURE, payload: err.message });
        });
};

export const editWakeAndBedTimes = (
    timeOfDay,
    dateId,
    updatedTime
) => dispatch => {
    dispatch({ type: EDITING_SLEEP_TIMES });

    let keyName = "";

    if (timeOfDay === "wakeUp") {
        keyName = "waketime";
    } else if (timeOfDay === "bedtime") {
        keyName = "bedtime";
    }

    const putRequestObj = {
        [keyName]: updatedTime,
    };

    axiosWithAuth()
        .put(`/bedhours/${dateId}`, putRequestObj)
        .then(res => {
            dispatch({ type: EDITING_SLEEP_TIMES_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log("Error editing sleep times: ", err);
            dispatch({
                type: EDITING_SLEEP_TIMES_FAILURE,
                payload: err.message,
            });
        });
};
