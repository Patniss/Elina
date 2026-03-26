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

export function displayCalendar(yearCalendar) {
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
    const nowYear = yearCalendar ?? new Date().getFullYear();

    const linkPrev = document.getElementById("link-year-calendar-prev");
    const linkNext = document.getElementById("link-year-calendar-next");
    linkPrev.href = `/Elina/daily/calendar/index.html?id=${(parseInt(nowYear) - 1)}`;
    linkNext.href = `/Elina/daily/calendar/index.html?id=${(parseInt(nowYear) + 1)}`;

    const linkJanuary = document.getElementById("link-january");
    linkJanuary.href = `/Elina/daily/calendar/month.html?year=${nowYear}&month=01`;
    const linkFebruary = document.getElementById("link-february");
    linkFebruary.href = `/Elina/daily/calendar/month.html?year=${nowYear}&month=02`;
    const linkMarch = document.getElementById("link-march");
    linkMarch.href = `/Elina/daily/calendar/month.html?year=${nowYear}&month=03`;
    const linkApril = document.getElementById("link-april");
    linkApril.href = `/Elina/daily/calendar/month.html?year=${nowYear}&month=04`;
    const linkMay = document.getElementById("link-may");
    linkMay.href = `/Elina/daily/calendar/month.html?year=${nowYear}&month=05`;
    const linkJune = document.getElementById("link-june");
    linkJune.href = `/Elina/daily/calendar/month.html?year=${nowYear}&month=06`;
    const linkJuly = document.getElementById("link-july");
    linkJuly.href = `/Elina/daily/calendar/month.html?year=${nowYear}&month=07`;
    const linkAugust = document.getElementById("link-august");
    linkAugust.href = `/Elina/daily/calendar/month.html?year=${nowYear}&month=08`;
    const linkSeptember = document.getElementById("link-september");
    linkSeptember.href = `/Elina/daily/calendar/month.html?year=${nowYear}&month=09`;
    const linkOctober = document.getElementById("link-october");
    linkOctober.href = `/Elina/daily/calendar/month.html?year=${nowYear}&month=10`;
    const linkNovember = document.getElementById("link-november");
    linkNovember.href = `/Elina/daily/calendar/month.html?year=${nowYear}&month=11`;
    const linkDecember = document.getElementById("link-december");
    linkDecember.href = `/Elina/daily/calendar/month.html?year=${nowYear}&month=12`;

    createMonth(januaryDisplay, nowYear, 0);
    createMonth(februaryDisplay, nowYear, 1);
    createMonth(marchDisplay, nowYear, 2);
    createMonth(aprilDisplay, nowYear, 3);
    createMonth(mayDisplay, nowYear, 4);
    createMonth(juneDisplay, nowYear, 5);
    createMonth(julyDisplay, nowYear, 6);
    createMonth(augustDisplay, nowYear, 7);
    createMonth(septemberDisplay, nowYear, 8);
    createMonth(octoberDisplay, nowYear, 9);
    createMonth(novemberDisplay, nowYear, 10);
    createMonth(decemberDisplay, nowYear, 11);

    yearDisplay.textContent = nowYear;
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