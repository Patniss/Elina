export function initGenres(selectElement, genres) {
    genres.forEach(genre => {
        selectElement.append(
            new Option(genre, genre, false, false)
        );
    });

    $(selectElement).select2({
        placeholder: "Choisir un genre…",
        allowClear: true
    });
}