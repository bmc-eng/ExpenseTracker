export function getFormattedDate (date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export function getDateMinusDays(date, numOfDays){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - numOfDays);
}