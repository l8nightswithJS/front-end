import React, { useState, useEffect } from "react";
import {
    CircularProgressbarWithChildren,
    buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircleProgressbar = props => {
    const [percentage, setPercentage] = useState(props.value);

    useEffect(() => {
        setPercentage(props.value);
    }, [props.value]);

    return (
        <>
            {/* value is the % of "progress" that will be filled */}
            {/* want to get this progress value from amount of sleep of the queried date / average amount of sleep */}
            <CircularProgressbarWithChildren
                value={percentage}
                styles={buildStyles({
                    pathColor: `${props.progressColor}`,
                })}
            >
                {props.children}
                {/* <p>7 hours</p> */}
            </CircularProgressbarWithChildren>
        </>
    );
};

export default CircleProgressbar;
