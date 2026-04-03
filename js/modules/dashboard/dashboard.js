import { supabase } from "/Elina/js/core/supabase.js";
import { loadProfile, getProfileData } from "/Elina/js/services/profiles.service.js";
import { formatTotalTime } from "/Elina/js/utils/format.js";

export async function customDashboard() {
  const session = await loadProfile();
  const profileData = await getProfileData();
  const welcome = document.getElementById("welcome");

  if (welcome) {
    welcome.textContent = session.pseudo;
  }

  const timeEntertainment = document.getElementById("time-entertainment");
  
  let totalSeen = 0;

  if (session.movies) {
    totalSeen += profileData.time_movies_seen;
  }

  if (session.shows) {
    totalSeen+= profileData.time_shows_seen;
  }

  timeEntertainment.textContent = formatTotalTime(totalSeen);
}

export async function customDashboardEntertainement() {
  const session = await loadProfile();
  const profileData = await getProfileData();

  const homeMovies = document.getElementById("homeMovies");
  const homeShows = document.getElementById("homeShows");
  const homeDramas = document.getElementById("homeDramas");
  const homeBooks = document.getElementById("homeBooks");

  if (session.movies === false) homeMovies.style.display = "none"; else {
    const timeMovies = document.getElementById("time-movies");
    timeMovies.textContent = formatTotalTime(profileData.time_movies_seen);
  }

  if (session.shows === false) homeShows.style.display = "none"; else {
    const timeShows = document.getElementById("time-shows");
    timeShows.textContent = formatTotalTime(profileData.time_shows_seen);
  }

  if (session.dramas === false) homeDramas.style.display = "none";
  if (session.books === false) homeBooks.style.display = "none";
}

export async function myProfile() {
  const session = await loadProfile();
  const userId = session.id;

  const moviesSeen = document.getElementById("moviesSeen");
  const moviesMinutesSeen = document.getElementById("moviesMinutesSeen");
  const moviesTosee = document.getElementById("moviesTosee");
  const profilePicture = document.getElementById("profilePicture");

  const { data, error } = await supabase
    .from("users_movies")
    .select(`*, movies (*)`)
    .eq("user_id", userId)
    .order("date_seen", { ascending: false })
    .order("title", { foreignTable: "movies", ascending: true });
    
  if (error) {
    console.error(errorTooseeMovies);
    toseeContainer.textContent = "Erreur lors du chargement des films.";
    return;
  }

  profilePicture.src = session.avatar_url;

  let totalSeen = 0;
  let totalMinutesSeen = 0;
  let totalMinutesToSee = 0;
  let totalTosee = 0;

  data.forEach(movie => {
    if (movie.seen === true) {
      totalSeen += 1;
      totalMinutesSeen += Number(movie.movies.time);
    } else {
      totalTosee += 1;
      totalMinutesToSee += Number(movie.movies.time);
    }
  });

  const yearsSeen = Math.floor(totalMinutesSeen / 525600);
  const monthsSeen = Math.floor((totalMinutesSeen - 525600*yearsSeen) / 43200);
  const daysSeen = Math.floor((totalMinutesSeen - 525600*yearsSeen - 43200*monthsSeen) / 1440);
  const hoursSeen = Math.floor((totalMinutesSeen - 525600*yearsSeen - 43200*monthsSeen - 1440*daysSeen) / 60);
  const minutesSeen = Math.floor(totalMinutesSeen - 525600*yearsSeen - 43200*monthsSeen - 1440*daysSeen - 60*hoursSeen);

  let timeSeen;
  if (yearsSeen > 0) timeSeen = yearsSeen + " a " + monthsSeen + " m " + daysSeen + " j " + hoursSeen + " h " + minutesSeen + " min ";
  else if (monthsSeen > 0) timeSeen = monthsSeen + " m " + daysSeen + " j " + hoursSeen + " h " + minutesSeen + " min ";
  else if (daysSeen > 0) timeSeen = daysSeen + " j " + hoursSeen + " h " + minutesSeen + " min ";
  else timeSeen = hoursSeen + " h " + minutesSeen + " min ";
  
  moviesSeen.textContent = totalSeen;
  moviesMinutesSeen.textContent = timeSeen;
  moviesTosee.textContent = totalTosee;

}