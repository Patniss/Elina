export async function querySupabase(query) {
    const { data, error } = await query;

    if (error) {
        console.error(error);
        return null;
    }

    console.log(data);

    return data;
}