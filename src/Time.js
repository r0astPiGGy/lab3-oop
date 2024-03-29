import {requireNumber, requireTypeof} from "./preconditions.js";
import {convertSecondsToTime} from "./utils.js";

export const DayTime = {
    NIGHT: "Night",
    MORNING: "Morning",
    NOON: "Noon",
    EVENING: "Evening",
}

export class Time {

    #hours
    #minutes
    #seconds

    constructor(hours, minutes, seconds) {
        const t = convertSecondsToTime(
            (hours || 0) * 3600 +
            (minutes || 0) * 60 +
            (seconds || 0)
        )

        this.hours = t.hours
        this.minutes = t.minutes
        this.seconds = t.seconds
    }

    getHours = () => this.hours
    getMinutes = () => this.minutes
    getSeconds = () => this.seconds

    setHours = (hours) => this.setTime(requireNumber(hours), this.minutes, this.seconds)

    setMinutes = (minutes) => this.setTime(this.hours, requireNumber(minutes), this.seconds)

    setSeconds = (seconds) => this.setTime(this.hours, this.minutes, requireNumber(seconds))

    setTime = (hours, minutes, seconds) => {
        hours = requireNumber(hours)
        minutes = requireNumber(minutes)
        seconds = requireNumber(seconds)

        const obj = convertSecondsToTime(hours * 3600 + minutes * 60 + seconds)

        this.seconds = obj.seconds
        this.minutes = obj.minutes
        this.hours = obj.hours
    }

    addHours = (hours) => this.setTime(this.hours + requireNumber(hours), this.minutes, this.seconds)

    addMinutes = (minutes) => this.setTime(this.hours, this.minutes + requireNumber(minutes), this.seconds)

    addSeconds = (seconds) => this.setTime(this.hours, this.minutes, this.seconds + requireNumber(seconds))

    subtractHours = (hours) => this.addHours(-requireNumber(hours))

    subtractMinutes = (minutes) => this.addMinutes(-requireNumber(minutes))

    subtractSeconds = (seconds) => this.addSeconds(-requireNumber(seconds))

    add = (time) => {
        requireTypeof(time, Time)

        this.setTime(
            this.hours + time.hours,
            this.minutes + time.minutes,
            this.seconds + time.seconds
        )
    }

    subtract = (time) => {
        requireTypeof(time, Time)

        this.setTime(
            this.hours - time.hours,
            this.minutes - time.minutes,
            this.seconds - time.seconds
        )
    }

    getDaytime = () => {
        const hoursInRange = (min, max) => this.hours >= min && this.hours < max

        if (hoursInRange(12, 18)) {
            return DayTime.NOON
        }
        if (hoursInRange(18, 24)) {
            return DayTime.EVENING
        }
        if (hoursInRange(0, 4)) {
            return DayTime.NIGHT
        }

        return DayTime.MORNING
    }

    toString = () => `Time[hours=${this.hours}, minutes=${this.minutes}, seconds=${this.seconds}]`

    equals = (object) => Time.isEqual(this, object)

    static isEqual = (object1, object2) =>
        object1 instanceof Time &&
        object2 instanceof Time &&
        object1.hours === object2.hours &&
        object1.minutes === object2.minutes &&
        object1.seconds === object2.seconds
}