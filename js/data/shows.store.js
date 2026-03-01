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

    setState(partialState) {
        Object.assign(this, partialState);
        this.notify();
    },

    setShowsAndPage(list, shows, page) {
        this.shows[list] = shows;
        this.currentPage[list] = page;
        this.notify();
    }
}