var today= new Date();
var currentDay= today.getDate();
var currentMonth= today.getMonth()+1;
var currentYear= today.getFullYear();
var dayInput, monthInput, yearInput;
var dd, mm, yyyy;

/* Here we are considering jan=1 upto dec=12
months 1, 3, 5, 7, 8, 10, 12 are months consisting of 31days
whereas months 4, 6, 9, 11 are months consisting of 30days
feb i.e 2 is a month consisting of either 28 days or 29 days(leap year).*/

var month_30 = [4, 6, 9, 11];
var month_31 = [1, 3, 5, 7, 8, 10, 12];


document.querySelector("button").addEventListener("click", output);

function output(){

    var errorTxt= document.querySelectorAll(".errortxt");

    for (let i = 0; i < errorTxt.length; i++) {
        errorTxt[i].classList.add("invisibleTxt");
    }

    document.querySelector(".line").classList.remove("margin");
    document.querySelector(".arrow").classList.remove("margin");
    document.querySelector(".bottom-section").classList.remove("invisible");
    document.querySelector(".day").classList.remove("errorState");
    document.querySelector(".month").classList.remove("errorState");
    document.querySelector(".year").classList.remove("errorState");

    var inputp= document.querySelectorAll(".inputp");
    for (let i = 0; i < inputp.length; i++) {
        inputp[i].classList.remove("error");
    }
    
    dayInput= Number(document.querySelector(".day").value);
    monthInput= Number(document.querySelector(".month").value);
    yearInput= Number(document.querySelector(".year").value);

    if(validDay(dayInput)==false){
        errorTxt[0].classList.remove("invisibleTxt");
    }
    if(validMonth(monthInput)== false){
        errorTxt[1].classList.remove("invisibleTxt");
    }
    if(validYear(yearInput)==false){
        errorTxt[2].classList.remove("invisibleTxt");
    }

    if(validDay(dayInput)==true && validMonth(monthInput)== true && validYear(yearInput)==true){
        answer();
    }else{
        incorrect();
    }

}

function isLeapYear(year){
    if(year%4===0){
        if(year%100===0){
            if(year%400){
                return 1;// is a leap year
            }else{
                return 0;// not a leap year
            }
        }else{
            return 1;
        }
    }else{
        return 0;
    }
}

function dayOutput(){
    if(month_31.includes(monthInput)===true){
        dd= (31-dayInput) + currentDay;
    }else if(month_30.includes(monthInput)===true){
        dd= (30-dayInput) + currentDay;
    }else if(monthInput==2) {
        if (isLeapYear(yearInput)===1) {
            dd= (29-dayInput) + currentDay;
        } else {
            dd= (28-dayInput) + currentDay;
        }
    }else{
        console.log(dayInput);
    }
}

function answer(){
    if(currentMonth>monthInput){
        yyyy= currentYear-yearInput;
        if(dayInput<=currentDay){
            mm= currentMonth-monthInput;
            dd= currentDay-dayInput;
        }else if(dayInput>currentDay){
            mm= currentMonth-monthInput-1;
            dayOutput();
        }
    }else if (currentMonth==monthInput) {
        if(dayInput<=currentDay){
            yyyy= currentYear-yearInput;
            mm= 0;
            dd= currentDay-dayInput;
        }else if(dayInput>currentDay){
            yyyy= currentYear-yearInput-1;
            mm= 11;
            dayOutput();
        }
    }else if (currentMonth<monthInput) {
        yyyy= currentYear-yearInput-1;
        if (dayInput>=currentDay) {
            mm= monthInput-currentMonth;
            dd= dayInput-currentDay;
        } else if(dayInput<currentDay){
            mm= monthInput-currentMonth-1;
            dayOutput();
        }
    }
    document.querySelector(".yearOutput").textContent= yyyy;
    document.querySelector(".monthOutput").textContent= mm;
    document.querySelector(".dayOutput").textContent= dd;
}

function incorrect(){
    document.querySelector(".line").classList.add("margin");
    document.querySelector(".arrow").classList.add("margin");
    document.querySelector(".yearOutput").textContent= "--";
    document.querySelector(".monthOutput").textContent= "--";
    document.querySelector(".dayOutput").textContent= "--";
    document.querySelector(".day").classList.add("errorState");
    document.querySelector(".month").classList.add("errorState");
    document.querySelector(".year").classList.add("errorState");
    var inputp= document.querySelectorAll(".inputp");
    for (let i = 0; i < inputp.length; i++) {
        inputp[i].classList.add("error");
    }
}

function validDay(day){
    if(yearInput==currentYear && monthInput==currentMonth){
        if(day>=1 && day<=currentDay){
            return true;
        }else{
            return false
        }
    }else{
        if(month_31.includes(monthInput)===true){
            if(day>=1 && day<=31){
                return true;
            }else{
                return false;
            }
        }else if(month_30.includes(monthInput)===true){
            if(day>=1 && day<=30){
                return true;
            }else{
                return false;
            }
        }else if(monthInput==2) {
            if (isLeapYear(yearInput)===1) {
                if(day>=1 && day<=29){
                    return true;
                }else{
                    return false;
                }
            } else {
                if(day>=1 && day<=28){
                    return true;
                }else{
                    return false;
                }
            }
        }else if(validMonth(monthInput)===false){
            if(day>=1 && day<=31){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}

function validMonth(month){
    if(yearInput==currentYear){
        if(month<=currentMonth){
            return true;
        }else{
            return false;
        }
    }else{
        if(month>=1 && month<=12){
            return true;
        }else{
            return false;
        }
    }
}

function validYear(year){
    if(year<=currentYear && year>=0){
        return true;
    }else{
        return false;
    }
}
