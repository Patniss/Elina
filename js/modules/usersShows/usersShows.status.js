export function mapShowsWithStatus(data, userId) {
    if (!data) return [];
    
    const showsWithStatus = data.map(show => {
        const userShow = show.users_shows.find(
        um => um.user_id === userId
        );
        
        return {
        ...show,
        stateUser: userShow ? userShow.state : null
        };
    });

    return showsWithStatus;
}