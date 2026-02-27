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
    },

    notify() {
        this.listeners.forEach(cb => cb());
    },

    setMovies(list, newMovies) {
        if (this.movies[list] !== undefined) {
            this.movies[list] = newMovies;
            this.notify();
        }
    },

    setCurrentPage(list, page) {
        if (this.currentPage[list] !== undefined) {
            this.currentPage[list] = page;
            this.notify();
        }
    },

    setState(partialState) {
        Object.assign(this, partialState);
        this.notify();
    }
};