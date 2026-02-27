export async function uploadAvatar(userId, file, oldAvatarUrl) {
    const extension = file.name.split(".").pop();
    const filePath = `users/${userId}.${extension}`;

    const renamedFile = new File(
        [file],
        `${userId}.${extension}`,
        { type: file.type }
    );

    if (oldAvatarUrl) {
        const oldPath = oldAvatarUrl?.split("/avatars/")[1];
        await supabase.storage
            .from("avatars")
            .remove([oldPath]);
    }

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, renamedFile, { upsert: true });
    
    if (uploadError) throw uploadError;
    
    const { data: urlData, error: urlError } = await supabase.storage
        .from("avatars")
        .createSignedUrl(filePath, 31_536_000);
    
    if (urlError) throw urlError;

    return urlData.signedUrl;
}