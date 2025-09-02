function constrtBusinessHours(businessHours?: WA.businessHours) {
    if (!businessHours) return undefined; // Return undefined if businessHours is not provided

    let results: { [k: string]: string | string[] | "Closed" } = {};

    daysName.forEach((day) => (results[day] = "Closed")); // Set all day to closed first

    // Then rewrite the business hours per day if any.
    for (const [key, value] of Object.entries(businessHours)) {
        const expandedDay = expandBusinessDay(key),
            hours = value?.hours;

        if (expandedDay) {
            let hoursMap = [];
            for (const hour of hours) {
                let open = formatTime(hour[0]),
                    close = formatTime(hour[1]);

                if (open !== undefined && close !== undefined) {
                    hoursMap.push(`${open} - ${close}`);
                }
            }

            results[expandedDay] = hoursMap;
        }
    }

    return results;
}

function formatTime(time: number) {
    let hours = Math.floor(time / 60),
        minutes = time % 60,
        toString = (num: number) => (num < 10 ? `0${num}` : `${num}`);

    return `${toString(hours)}:${toString(minutes)}`;
}

const daysName = (() => {
    let locale = navigator.language || navigator.languages[0] || "en-US",
        baseDate = new Date(Date.UTC(2017, 0, 2)), // just a Monday,
        weekDays = [];

    for (let i = 0; i < 7; i++) {
        weekDays.push(baseDate.toLocaleDateString(locale, { weekday: "long" }));
        baseDate.setDate(baseDate.getDate() + 1);
    }
    return weekDays;
})();

function expandBusinessDay(day: string) {
    switch (day) {
        case "mon":
            return daysName[0];
        case "tue":
            return daysName[1];
        case "wed":
            return daysName[2];
        case "thu":
            return daysName[3];
        case "fri":
            return daysName[4];
        case "sat":
            return daysName[5];
        case "sun":
            return daysName[6];
        default:
            return undefined;
    }
}

export default constrtBusinessHours;
