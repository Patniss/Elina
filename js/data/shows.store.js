export let showsStore = {
    shows: {
        all: [],
        tostart: [],
        current: [],
        paused: [],
        givedup: [],
        finished: []
    },
    currentPage: {
        all: 1,
        tostart: 1,
        current: 1,
        paused: 1,
        givedup: 1,
        finished: 1
    },
    pageSize: 20,
    sortField: "title",
    sortAsc: true,
    genreFilter: "",

    listeners: [],

    subscribe(callback) {
        this.listeners.push(callback);
    },

    notify() {
        this.listeners.forEach(cb => cb());
    },

    setShowAll(state, newShows) {
        if (this.shows[state] !== undefined) {
            this.shows[state] = newShows;
            this.notify();
        }
    },

    setCurrentPage(state, page) {
        if (this.currentPage[state] !== undefined) {
            this.currentPage[state] = page;
            this.notify();
        }
    },

    setState(partialState) {
        Object.assign(this, partialState);
        this.notify();
    }
}