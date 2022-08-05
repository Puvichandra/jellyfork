export function dateAgo(date) {
    var startDate = new Date(date);
    var diffDate = new Date(new Date() - startDate);
    var yearnum= diffDate.toISOString().slice(0, 4) - 1970;
    if (yearnum===0){
        yearnum=''
    } else if (yearnum===1) {
        yearnum=yearnum + " Year"
    } else {
        yearnum=yearnum + " Years"
    }
    var monthnum= diffDate.getMonth();
    if (monthnum===0){
        monthnum=''
    } else if(monthnum===1) {
        monthnum = monthnum + " Month"
    } else {
        monthnum = monthnum + " Months"
    }
    var daysnum= diffDate.getDate()-1;
    if (daysnum===0){
       daysnum=''
    } else if(daysnum===1){
        daysnum =daysnum + " day"
    } else {
        daysnum =daysnum + " days"
    }
    // return ((diffDate.toISOString().slice(0, 4) - 1970) + "Years " +
    //     diffDate.getMonth() + "Months " + (diffDate.getDate()-1) + "Days ago");

    return (yearnum + " " + 
    monthnum + " " + daysnum + ' ago');
}