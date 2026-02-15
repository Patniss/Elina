import { supabase } from "/Elina/js/supabase.js";

export async function loadProfile() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = "/index.html";
    return;
  }

  const userId = session.user.id;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Erreur profil :", error.message);
    return;
  }

  if (document.getElementById("welcome")) {
    const pseudo = data?.pseudo || "Utilisateur";
    document.getElementById("welcome").textContent = pseudo;
  }

  console.log(data);

  return data;
}

export async function customDashboard() {
  const session = await loadProfile();

  const homeMovies = document.getElementById("homeMovies");
  const homeShows = document.getElementById("homeShows");
  const homeDramas = document.getElementById("homeDramas");
  const homeBooks = document.getElementById("homeBooks");

  if (session.movies === false) homeMovies.style.display = "none";
  if (session.shows === false) homeShows.style.display = "none";
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