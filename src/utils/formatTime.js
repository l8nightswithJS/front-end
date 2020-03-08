export const formatTime = time => {
    if (time[time.length - 1] === "Z") {
        return time.slice(0, time.length - 1);
    } else {
        return time;
    }
};
