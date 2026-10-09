
const {format,addDays,subDays,differenceInDays,isAfter,isBefore} = require("date-fns")



// const registerAt = new Date("2026-10-09T13:26:51.264Z");

// console.log(format(registerAt,"dd-MM-yyyy"))
// console.log(format(registerAt,"MMMM do, yyyy"))
// console.log(format(registerAt,"EEEE"))


const today = new Date(2026,9,9)
const requestdays = new Date(2026,9,1)
const now = new Date()
const expirydate = new Date(2026,11,10)

const nextweek = addDays(today,7)
const lastweek = subDays(today,7)
const daysPassed = differenceInDays(today,requestdays)


console.log(format(nextweek, "MMMM do, yyyy"));
console.log(format(lastweek, "MMMM do, yyyy"));
console.log(daysPassed)
console.log(isBefore(expirydate,now))
console.log(isAfter(expirydate,now))





// #README -1
// Function	Purpose
// addMinutes(date, 10)	Add 10 minutes
// addHours(date, 2)	Add 2 hours
// addDays(date, 7)	Add 7 days
// addWeeks(date, 2)	Add 2 weeks
// addMonths(date, 1)	Add 1 calendar month
// addYears(date, 1)	Add 1 calendar year
// subMinutes(date, 10)	Subtract 10 minutes
// subDays(date, 7)	Subtract 7 days
// subMonths(date, 1)	Subtract 1 calendar month

// #2
// differenceInMinutes(date1, date2)	Full minutes between dates
// differenceInHours(date1, date2)	Full hours between dates
// differenceInDays(date1, date2)	Full days between dates
// differenceInWeeks(date1, date2)	Full weeks between dates
// differenceInMonths(date1, date2)	Full months between dates
// differenceInYears(date1, date2)	Full years between dates


