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

  let totalSeen = 0;
  let totalTime = 0;
  let totalTimeToSee = 0;
  let totalTosee = 0;

  data.forEach(movie => {
    if (movie.seen = true) {
      totalSeen += 1;
      totalTime += movie.time;
    } else {
      totalTosee += 1;
      totalTimeToSee += movie.time;
    }
  });

  moviesSeen.textContent = totalSeen;
  moviesMinutesSeen.textContent = totalTime;
  moviesTosee.textContent = totalTosee;

}