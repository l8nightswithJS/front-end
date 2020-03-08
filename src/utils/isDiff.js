// checks to see if there is a difference between the values of each key in both objects
// will return true if every value for each key of both objects is different
export const isDiff = (obj1, obj2) => {
    let result = true;

    Object.keys(obj1).forEach(key => {
        if (obj1[key] === obj2[key]) {
            result = false;
        }
    });
    return result;
};
