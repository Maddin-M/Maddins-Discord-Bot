export const formatSeconds = (seconds: number): string => {
    if (seconds === 0) return "0 Sekunden";

    var h = ~~(seconds / 3600);
    var m = ~~(seconds % 3600 / 60);
    var s = ~~(seconds % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " Stunde, " : " Stunden, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " Minute, " : " Minuten, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " Sekunde" : " Sekunden") : "";

    return hDisplay + mDisplay + sDisplay;
}

const format = (time: number): string => {
    return time.toFixed(5).replace(".", ",")
}

export const toDays = (seconds: number): string => {
    return format(seconds / 86400)
}

export const toYears = (seconds: number): string => {
    return format(seconds / 31556952)
}

export const toHumanLifes = (seconds: number): string => {
    return format(seconds / 2556113112)
}

export const toHoursNumber = (seconds: number): number => {
    return seconds / 3600
}