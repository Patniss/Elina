export function updatePageSize() {
    if (window.innerWidth <= 768) {
        indexMoviesStore.pageSize = 3;
    } else {
        indexMoviesStore.pageSize = 7;
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
};

export let indexMoviesStore = {
    movies: {
        toseeMovies: [],
        favMovies: [],
        lastSeenMovies: []
    },
    currentPage: {
        toseeMovies: 1,
        favMovies: 1,
        lastSeenMovies: 1
    },
    pageSize: 7
}