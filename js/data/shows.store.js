export let showsStore = {
    shows: {
        all: [],
        tostart: [],
        current: [],
        paused: [],
        canceled: [],
        finished: []
    },
    currentPage: {
        all: 1,
        tostart: 1,
        current: 1,
        paused: 1,
        canceled: 1,
        finished: 1
    },
    pageSize: 20,
    sortField: "title",
    sortAsc: true,
    genreFilter: "",

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

    setShowsAndPage(list, shows, page) {
        this.shows[list] = shows;
        this.currentPage[list] = page;
        this.notify();
    },

    setCurrentPage(list, page) {
        this.currentPage[list] = page;
        this.notify();
    }
}