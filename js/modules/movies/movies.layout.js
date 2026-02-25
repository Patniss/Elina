export function sortMovies(query, field, asc) {
    switch (field) {
        case "year":
            query = query
                .order("year", { ascending: asc })
                .order("title", { ascending: true });
            break;

        case "title":
            query = query.order("title", { ascending: asc })
            break;

        case "date":
            query = query.order("title", { ascending: asc })
            break;

        default:
            query = query.order("title", { ascending: asc })
            break;
    }

    return query;
}

export function filterMovies(query, genre) {
    if (genre !== "") {
        query = query.ilike("genres", `%${genre}%`);
    }

    return query;
}