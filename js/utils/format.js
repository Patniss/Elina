export function formatMovieDuration(totalMinutes) { // Transforme un nombre de minutes en format 2h05
    const hoursTime = Math.floor(totalMinutes / 60);
    const minutesTime = totalMinutes - hoursTime * 60;
    const displayMinutesTime = minutesTime < 10 ? "0" + minutesTime : minutesTime;
    const result = hoursTime + "h" + displayMinutesTime;

    return result;
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