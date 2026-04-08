import { getUserId } from "/Elina/js/services/profiles.service.js";

export async function mapShowsWithStatus(data) {
    const userId = await getUserId();
    if (!data) return [];
    
    const showsWithStatus = data.map(show => {
        const userShow = show.users_shows.find(
        us => us.user_id === userId
        );
        
        return {
        ...show,
        user_state: userShow ? userShow.user_state : null
        };
    });

    return showsWithStatus;
}