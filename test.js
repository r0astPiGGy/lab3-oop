import {DayTime, Time} from "./Time.js";
import {convertSecondsToTime} from "./utils.js";
import assert from "assert";

describe("Time", () => {
    it("24:00:00 равно 00:00:00", () => {
        const time = new Time(24, 0, 0)

        assert.ok(time.equals(new Time(0, 0, 0)))
    })
    it("Добавление любого времени к 00:00:00 даёт то же самое", () => {
        const time1 = new Time(24, 0, 0)
        const time2 = new Time(12, 35, 24)

        time1.add(time2)

        assert.ok(time1.equals(time2))
    })
    it("24:59:59 + 12:01:01 равно 13:01:00", () => {
        const time1 = new Time(24, 59, 59)
        const time2 = new Time(12, 1, 1)

        time1.add(time2)

        assert.equal(time1.getHours(), 13)
        assert.equal(time1.getMinutes(), 1)
        assert.equal(time1.getSeconds(), 0)
    });
    it("24:00:00 - 01:35:24 равно 22:24:36", () => {
        const time1 = new Time(24, 0, 0)
        const time2 = new Time(1, 35, 24)

        time1.subtract(time2)

        assert.equal(time1.getHours(), 22)
        assert.equal(time1.getMinutes(), 24)
        assert.equal(time1.getSeconds(), 36)
    });
    it("00:00:00 - 100:30:10 равно 19:29:50", () => {
        const time1 = new Time(0, 0, 0)
        const time2 = new Time(100, 30, 10)

        time1.subtract(time2)

        assert.equal(time1.getHours(), 19)
        assert.equal(time1.getMinutes(), 29)
        assert.equal(time1.getSeconds(), 50)
    });
    it("14:00 - 10 секунд равно 13:59:50", () => {
        const time1 = new Time(14)

        time1.subtractSeconds(10)

        assert.ok(
            Time.isEqual(
                time1,
                new Time(13, 59, 50)
            )
        )
    });
    it("23:00 - 25 минут равно 22:35", () => {
        const time1 = new Time(23)

        time1.subtractMinutes(25)

        assert.ok(
            Time.isEqual(
                time1,
                new Time(22, 35)
            )
        )
    });
    it("15:25 - 16 часов равно 23:25", () => {
        const time1 = new Time(15, 25)

        time1.subtractHours(16)

        assert.ok(
            Time.isEqual(
                time1,
                new Time(23, 25)
            )
        )
    });
    it("1345 секунд равно 03:04:25", () => {
        const converted = convertSecondsToTime(3 * 60 * 60 + 4 * 60 + 25)

        assert.equal(converted.hours, 3)
        assert.equal(converted.minutes, 4)
        assert.equal(converted.seconds, 25)
    });
    it("12:00 это полдень", () => {
        assert.equal(
            new Time(12).getDaytime(),
            DayTime.NOON
        )
    });
    it("08:34 это утро", () => {
        assert.equal(
            new Time(8, 34).getDaytime(),
            DayTime.MORNING
        )
    });
    it("19:46 это вечер", () => {
        assert.equal(
            new Time(19, 46).getDaytime(),
            DayTime.EVENING
        )
    });
    it("03:03 это ночь", () => {
        assert.equal(
            new Time(3, 3).getDaytime(),
            DayTime.NIGHT
        )
    });
})
