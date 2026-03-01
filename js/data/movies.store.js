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