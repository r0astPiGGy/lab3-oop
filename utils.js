const HOURS_IN_DAY = 86400

export function convertSecondsToTime(totalSeconds) {
    totalSeconds = totalSeconds > 0 ? totalSeconds : HOURS_IN_DAY - (Math.abs(totalSeconds) % HOURS_IN_DAY)
    totalSeconds %= HOURS_IN_DAY

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}