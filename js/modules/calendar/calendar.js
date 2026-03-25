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
    linkPrev.href = `/Elina/daily/calendar/index.html?id=${(nowYear - 1)}`;
    linkNext.href = `/Elina/daily/calendar/index.html?id=${(nowYear + 1)}`;

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