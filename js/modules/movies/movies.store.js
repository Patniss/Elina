export let moviesStore = {
    movies: [],
    toSeeMovies: [],
    seenMovies: [],
    currentPage: 1,
    currentPageTosee: 1,
    currentPageSeen: 1,
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

    setMovies(newMovies) {
        this.movies = newMovies;
        this.notify();
    },

    setCurrentPage(page) {
        this.currentPage = page;
        this.notify();
    },

    setCurrentPageTosee(page) {
        this.currentPageTosee = page;
        this.notify();
    },

    setCurrentPageSeen(page) {
        this.currentPageSeen = page;
        this.notify();
    },

    setState(partialState) {
        Object.assign(this, partialState);
        this.notify();
    }
};