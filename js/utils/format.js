export function calculateAge(startDate, endDate = new Date()) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let age = end.getFullYear() - start.getFullYear();
    const m = end.getMonth() - start.getMonth();

    if (m < 0 || (m === 0 && end.getDate() < start.getDate())) {
        age--;
    }

    return age;
}

export function formatCompleteDate(date) {
    if (!date) return;

    const parsedDate = new Date(date);

    return parsedDate.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}

export function formatFrenchTypography(text) { // Ajoute des espaces insécables dans un texte
  const nbsp = "\u202F";
  
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\s*([;:!?»])/g, "$1")
    .replace(/«\s*/g, "«")
    .replace(/([;:!?»])/g, nbsp + "$1")
    .replace(/«/g, "«" + nbsp)
    .replace(/ {2,}/g, " ")
    .trim();
}

export function formatMovieDuration(totalMinutes) { // Transforme un nombre de minutes en format 2h05
    const hoursTime = Math.floor(totalMinutes / 60);
    const minutesTime = totalMinutes - hoursTime * 60;
    const displayMinutesTime = minutesTime < 10 ? "0" + minutesTime : minutesTime;
    const result = hoursTime + "h" + displayMinutesTime;

    return result;
}

export function formatPlusDisplay(number) {
    let result;

    if (number > 0) {
        result = "+ ", number;
    } else if (number === 0) {
        result = number;
    } else {
        result = "— ", number*-1;
    }

    return result;
}

export function formatTotalTime(totalMinutes) {
    if (totalMinutes < 0) totalMinutes = totalMinutes * -1;

    const yearsSeen = Math.floor(totalMinutes / 525600);
    const monthsSeen = Math.floor((totalMinutes - 525600*yearsSeen) / 43200);
    const daysSeen = Math.floor((totalMinutes - 525600*yearsSeen - 43200*monthsSeen) / 1440);
    const hoursSeen = Math.floor((totalMinutes - 525600*yearsSeen - 43200*monthsSeen - 1440*daysSeen) / 60);
    const minutesSeen = Math.floor(totalMinutes - 525600*yearsSeen - 43200*monthsSeen - 1440*daysSeen - 60*hoursSeen);
    
    let timeSeen;

    if (yearsSeen > 0) timeSeen = yearsSeen + " a " + monthsSeen + " m " + daysSeen + " j " + hoursSeen + " h " + minutesSeen + " min ";
    else if (monthsSeen > 0) timeSeen = monthsSeen + " m " + daysSeen + " j " + hoursSeen + " h " + minutesSeen + " min ";
    else if (daysSeen > 0) timeSeen = daysSeen + " j " + hoursSeen + " h " + minutesSeen + " min ";
    else timeSeen = hoursSeen + " h " + minutesSeen + " min ";

    return timeSeen;
}

export function formatShowEpisode(season, episode) {
    let formatSeason;
    let formatEpisode;

    if (season < 10) formatSeason = `S0${season}`; else formatSeason = `S${season}`;
    if (episode < 10) formatEpisode = `E0${episode}`; else formatEpisode = `E${episode}`;

    return `${formatSeason}${formatEpisode}`;
}

export function normalizeString(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

export function parseFullName(fullName) {
    const parts = fullName.trim().split(/\s+/);

    if (parts.length === 1) {
        return {
            firstName: null,
            lastName: parts[0]
        };
    }

    return {
        firstName: parts.slice(0, -1).join(" "),
        lastName: parts.slice(-1).join("")
    };
}