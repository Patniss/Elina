function createWeek(table, start, max) {
    const tr = document.createElement("tr");
    for (let w = 1; w <= 7; w++) {
        const td = document.createElement("td");
        td.textContent = start > 0 ? start <= max ? start : " " : " ";
        start++;
        tr.appendChild(td);
    }

    table.appendChild(tr);
}

function createMonth(table, nbYear, nbMonth) {
    const firstMonth = new Date(nbYear, nbMonth, 1);
    const lastMonth = new Date(nbYear, (nbMonth + 1), 0);

    const dayOfWeek = firstMonth.getDay();

    let start = dayOfWeek === 0 ? 1 : (1 - dayOfWeek);
    const lastDayOfMonth = lastMonth.getDate();

    while (start <= lastDayOfMonth) {
        createWeek(table, start, lastDayOfMonth);
        start += 7;
    }
}

export function displayCalendar() {
    const yearDisplay = document.getElementById("year");
    const januaryDisplay = document.getElementById("january");
    const februaryDisplay = document.getElementById("february");
    const marchDisplay = document.getElementById("march");
    const aprilDisplay = document.getElementById("april");
    const mayDisplay = document.getElementById("may");
    const juneDisplay = document.getElementById("june");
    const julyDisplay = document.getElementById("july");
    const augustDisplay = document.getElementById("august");
    const septemberDisplay = document.getElementById("september");
    const octoberDisplay = document.getElementById("october");
    const novemberDisplay = document.getElementById("november");
    const decemberDisplay = document.getElementById("december");

    const nowDate = new Date();
    const nowYear = new Date().getFullYear();
    let usingYear = nowYear;

    const linkPrev = document.getElementById("link-year-calendar-prev");
    const linkNext = document.getElementById("link-year-calendar-next");
    linkPrev.href = `/Elina/daily/calendar/index.html?id=${(parseInt(usingYear) - 1)}`;
    linkNext.href = `/Elina/daily/calendar/index.html?id=${(parseInt(usingYear) + 1)}`;

    const linkJanuary = document.getElementById("link-january");
    linkJanuary.href = `/Elina/daily/calendar/month.html?year=${usingYear}&month=01`;
    const linkFebruary = document.getElementById("link-february");
    linkFebruary.href = `/Elina/daily/calendar/month.html?year=${usingYear}&month=02`;
    const linkMarch = document.getElementById("link-march");
    linkMarch.href = `/Elina/daily/calendar/month.html?year=${usingYear}&month=03`;
    const linkApril = document.getElementById("link-april");
    linkApril.href = `/Elina/daily/calendar/month.html?year=${usingYear}&month=04`;
    const linkMay = document.getElementById("link-may");
    linkMay.href = `/Elina/daily/calendar/month.html?year=${usingYear}&month=05`;
    const linkJune = document.getElementById("link-june");
    linkJune.href = `/Elina/daily/calendar/month.html?year=${usingYear}&month=06`;
    const linkJuly = document.getElementById("link-july");
    linkJuly.href = `/Elina/daily/calendar/month.html?year=${usingYear}&month=07`;
    const linkAugust = document.getElementById("link-august");
    linkAugust.href = `/Elina/daily/calendar/month.html?year=${usingYear}&month=08`;
    const linkSeptember = document.getElementById("link-september");
    linkSeptember.href = `/Elina/daily/calendar/month.html?year=${usingYear}&month=09`;
    const linkOctober = document.getElementById("link-october");
    linkOctober.href = `/Elina/daily/calendar/month.html?year=${usingYear}&month=10`;
    const linkNovember = document.getElementById("link-november");
    linkNovember.href = `/Elina/daily/calendar/month.html?year=${usingYear}&month=11`;
    const linkDecember = document.getElementById("link-december");
    linkDecember.href = `/Elina/daily/calendar/month.html?year=${usingYear}&month=12`;

    createMonth(januaryDisplay, usingYear, 0);
    createMonth(februaryDisplay, usingYear, 1);
    createMonth(marchDisplay, usingYear, 2);
    createMonth(aprilDisplay, usingYear, 3);
    createMonth(mayDisplay, usingYear, 4);
    createMonth(juneDisplay, usingYear, 5);
    createMonth(julyDisplay, usingYear, 6);
    createMonth(augustDisplay, usingYear, 7);
    createMonth(septemberDisplay, usingYear, 8);
    createMonth(octoberDisplay, usingYear, 9);
    createMonth(novemberDisplay, usingYear, 10);
    createMonth(decemberDisplay, usingYear, 11);

    yearDisplay.textContent = usingYear;
}

export function displayMonthCalendar(year, month) {
    const titleMonth = document.getElementById("month-subtitle");
    
    const monthName = 
        month === "01" ? "JANUARY" 
        : month === "02" ? "FEBRUARY" 
        : month === "03" ? "MARCH"
        : month === "04" ? "APRIL"
        : month === "05" ? "MAY"
        : month === '06' ? "JUNE"
        : month === "07" ? "JULY"
        : month === "08" ? "AUGUST"
        : month === "09" ? "SEPTEMBER"
        : month === "10" ? "OCTOBER"
        : month === "11" ? "NOVEMBER"
        : "DECEMBER";

    titleMonth.textContent = `${monthName} ${year}`;

    const tableCalendar = document.getElementById("month-calendar");
    const nbMonth = (parseInt(month) - 1);
    createWeek(tableCalendar, year, nbMonth);
}