import { supabase } from "/Elina/js/supabase.js";
import { loadProfile } from "/Elina/js/dashboard.js";

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

export async function addMovie(mode, uuid, btnAdd, div, toseeBtn, suppBtn, detailsBtn) {
    const session = await loadProfile();
    const userId = session.id;

    btnAdd.textContent = "";
    btnAdd.classList.remove("is-link");
    btnAdd.classList.add("is-success");
    btnAdd.classList.add("is-loading");

    try {
      const { data, error } = await supabase
        .from("users_movies")
        .insert([
          {
            user_id: userId,
            movie_id: uuid,
            seen: false,
            date_seen: new Date().toISOString()
          }
        ])
        .select();

        if (error) {
          setTimeout(() => {
            btnAdd.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
            btnAdd.classList.remove("is-loading", "is-link");
            btnAdd.classList.add("is-danger");
            console.log(error);
          }, 500);
          return;
        }

    } catch (err) {
      console.error("Erreur :", err);
      setTimeout(() => {
        btnAdd.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
        btnAdd.classList.remove("is-link", "is-loading");
        btnAdd.classList.add("is-danger");
        console.log(err);
      }, 500);
      return;
    }

    if (mode === "adding") {
        setTimeout(() => {
            btnAdd.classList.add("is-link");
            btnAdd.classList.remove("is-success", "is-loading");
            btnAdd.innerHTML = `<span class="icon"><i class="fa-solid fa-plus"></i></span><span>Ajouter</span>`;
            
            div.innerHTML = "";
            div.append(toseeBtn, suppBtn, detailsBtn ?? detailsBtn);
        }, 500);
    } else if (mode === "hidden") {
        setTimeout(() => {
            btnAdd.classList.add("is-link");
            btnAdd.classList.remove("is-success", "is-loading");
            btnAdd.innerHTML = `<span class="icon"><i class="fa-solid fa-plus"></i></span><span>Ajouter</span>`;
            
            toseeBtn.classList.remove("is-hidden");
            suppBtn.classList.remove("is-hidden");
        }, 500);
    }
}