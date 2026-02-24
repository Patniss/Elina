import { supabase } from "/Elina/js/core/supabase.js";
import { loadProfile } from "/Elina/js/modules/dashboard/dashboard.js";

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
            
            btnAdd.classList.add("is-hidden");
            toseeBtn.classList.remove("is-hidden");
            suppBtn.classList.remove("is-hidden");
        }, 500);
    }
}

export async function suppMovie(mode, uuid, btnSupp, div, btnAdd, detailsBtn) {
    const session = await loadProfile();
    const userId = session.id;

    btnSupp.textContent = "";
    btnSupp.classList.add("is-loading");
    btnSupp.classList.remove("is-light");

    try {
      const { data, error } = await supabase
        .from("users_movies")
        .delete()
        .eq("user_id", userId)
        .eq("movie_id", uuid)
        .single();

        if (error) {
          setTimeout(() => {
            btnSupp.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
            btnSupp.classList.remove("is-loading");
            console.log(error)
          }, 500);
          return;
        }

    } catch (err) {
      setTimeout(() => {
            btnSupp.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
            btnSupp.classList.remove("is-loading");
            console.log(err);
          }, 500);
          return;
    }

    if (mode === "adding") {
        setTimeout(() => {
            btnSupp.innerHTML = `<span class="icon"><i class="fa-solid fa-minus"></i></span><span>Supprimer</span>`;
            btnSupp.classList.remove("is-loading");

            div.innerHTML = "";
            div.append(btnAdd, detailsBtn);
        }, 500);
    } else if (mode === "hidden") {
        setTimeout(() => {
            btnSupp.innerHTML = `<span class="icon"><i class="fa-solid fa-minus"></i></span><span>Supprimer</span>`;
            btnSupp.classList.remove("is-loading");

            btnSupp.classList.add("is-hidden");
            btnAdd.classList.remove("is-hidden");
        }, 500);
    }
}

export async function toseeMovie(mode, uuid, btnTosee, div, btnSeen, btnSupp, detailsBtn) {
    const session = await loadProfile();
    const userId = session.id;
    
    btnTosee.textContent = "";
    btnTosee.classList.add("is-loading");
    btnTosee.classList.remove("is-light");

    try {
      const { data, error } = await supabase
        .from("users_movies")
        .update({seen: true})
        .eq("user_id", userId)
        .eq("movie_id", uuid)
        .single();

      if (error) {
        setTimeout(() => {
          btnTosee.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
          btnTosee.classList.add("is-danger");
          btnTosee.classList.remove("is-loading");
          console.log(error);
        }, 500);
        return;
      }
    
    } catch (err) {
      setTimeout(() => {
        btnTosee.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
        btnTosee.classList.add("is-danger");
        btnTosee.classList.remove("is-loading");
        console.log(err);
      }, 500);
      return;
    }

    if (mode === "adding") {
        setTimeout(() => {
            btnTosee.innerHTML = `<span class="icon"><i class="fa-solid fa-eye"></i></span><span>J'ai vu</span>`;
            btnTosee.classList.remove("is-loading");
            btnTosee.classList.add("is-light");

            div.innerHTML = "";
            div.append(btnSeen, detailsBtn);
        }, 500);
    } else if (mode === "hidden") {
        setTimeout(() => {
            btnTosee.innerHTML = `<span class="icon"><i class="fa-solid fa-eye"></i></span><span>J'ai vu</span>`;
            btnTosee.classList.remove("is-loading");
            btnSupp.classList.remove("is-loading");
            btnTosee.classList.add("is-light");

            btnTosee.classList.add("is-hidden");
            btnSeen.classList.remove("is-hidden");
        }, 500);
    }
}

export async function seenMovie(mode, uuid, btnSeen, div, btnTosee, btnSupp, detailsBtn) {
    const session = await loadProfile();
    const userId = session.id;
    
    btnSeen.textContent = "";
    btnSeen.classList.add("is-loading");
    
    try {
      const { data, error } = await supabase
        .from("users_movies")
        .update({seen: false})
        .eq("user_id", userId)
        .eq("movie_id", uuid)
        .single();
        
      if (error) {
        setTimeout(() => {
          btnSeen.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
          btnSeen.classList.add("is-danger");
          btnSeen.classList.remove("is-loading", "is-success");
          console.log(error);
          return;
        }, 500);
      }
    
    } catch (err) {
      setTimeout(() => {
        btnSeen.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
        btnSeen.classList.add("is-danger");
        btnSeen.classList.remove("is-loading", "is-success");
        console.log(err);
      }, 500);
      return;
    }

    if (mode === "adding") {
        setTimeout(() => {
            btnSeen.innerHTML = `<span class="icon"><i class="fa-solid fa-check"></i></span><span>Vu</span>`;
            btnSeen.classList.remove("is-loading");
            
            div.innerHTML = "";
            div.append(btnTosee, btnSupp, detailsBtn);
        }, 500);
    } else if (mode === "hidden") {
        setTimeout(() => {
            btnSeen.innerHTML = `<span class="icon"><i class="fa-solid fa-check"></i></span><span>Vu</span>`;
            btnSeen.classList.remove("is-loading");
            
            btnSeen.classList.add("is-hidden");
            btnTosee.classList.remove("is-hidden");
            btnSupp.classList.remove("is-hidden");
        }, 500);
    }
    
}

export async function addShow(mode, uuid, btnAdd, div, detailsBtn) {
    const session = await loadProfile();
    const userId = session.id;

    btnAdd.textContent = "";
    btnAdd.classList.remove("is-link");
    btnAdd.classList.add("is-success");
    btnAdd.classList.add("is-loading");

    try {
      const { data, error } = await supabase
        .from("users_shows")
        .insert([
          {
            user_id: userId,
            show_id: uuid,
            state: "start"
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
            div.append(detailsBtn ?? detailsBtn);
        }, 500);
    };
}