export function requireNumber(arg) {
    if (isNaN(+arg)) throw Error(`${arg} must be a number`)
    return +arg
}

export function requireTypeof(object, type) {
    if (object instanceof type) return

    throw Error(`Expected ${object} to be typeof ${type}`)
}