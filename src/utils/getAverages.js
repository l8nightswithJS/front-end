export const getAverages = dayObjectsArray => {
    const averagesObject = {
        averageMood: [],
        averageTiredness: [],
    };

    averagesObject.averageMood = dayObjectsArray.map(day => {
        const wakeUpMood = day.wakeUp.mood;
        const middayMood = day.midday.mood;
        const bedtimeMood = day.bedtime.mood;

        const averageMood = (
            (wakeUpMood + middayMood + bedtimeMood) /
            3
        ).toFixed(1);

        return averageMood;
    });

    averagesObject.averageTiredness = dayObjectsArray.map(day => {
        const wakeUpTiredness = day.wakeUp.tiredness;
        const middayTiredness = day.midday.tiredness;
        const bedtimeTiredness = day.bedtime.tiredness;

        const averageTiredness = (
            (wakeUpTiredness + middayTiredness + bedtimeTiredness) /
            3
        ).toFixed(1);

        return averageTiredness;
    });

    return averagesObject;
};
