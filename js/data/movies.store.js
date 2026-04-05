export function updatePageSize() {
    if (window.innerWidth <= 768) {
        indexMoviesStore.pageSize = 3;
        indexMoviesStore.currentIndex.tosee = 1;
        indexMoviesStore.currentIndex.fav = 1;
    } else {
        indexMoviesStore.pageSize = 7;
        indexMoviesStore.currentIndex.tosee = 3;
        indexMoviesStore.currentIndex.fav = 3;
    }

    const elements = document.querySelectorAll('.changeMobileGrid');

    elements.forEach(el => {
        if (window.innerWidth <= 768) {
            el.classList.remove('has-7-cols');
            el.classList.add('has-3-cols');
        } else {
            el.classList.remove('has-3-cols');
            el.classList.add('has-7-cols');
        }
    });
}

export let indexMoviesStore = {
    movies: {
        tosee: [],
        fav: [],
        last: []
    },
    currentIndex: {
        tosee: 3,
        fav: 0,
        last: 0
    },
    pageSize: 7
}

export let indexSisterMoviesStore = {
    movies: {
        favSister: [],
        toseeShared: [],
        lastSeenSister: [],
        ourFavMovies: [],
        toseeSister: []
    },
    currentIndex: {
        favSister: [],
        toseeShared: [],
        lastSeenSister: [],
        ourFavMovies: [],
        toseeSister: []
    },
    pageSize: 7
}

export let moviesStore = {
    movies: {
        all: [],
        tosee: [],
        seen: []
    },
    currentPage: {
        all: 1,
        tosee: 1,
        seen: 1
    },
    pageSize: 20,
    sortField: "title",
    sortAsc: true,
    genreFilter: "",
    catFilter: "",

    listeners: [],

    subscribe(callback) {
        this.listeners.push(callback);

        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    },

    notify(list) {
        this.listeners.forEach(cb => cb(list));
    },

    setState(partialState) {
        Object.assign(this, partialState);
        this.notify();
    },

    setMoviesAndPage(list, movies, page) {
        this.movies[list] = movies;
        this.currentPage[list] = page;
        this.notify();
    },

    setCurrentPage(list, page) {
        this.currentPage[list] = page;
        this.notify(list);
    }
}