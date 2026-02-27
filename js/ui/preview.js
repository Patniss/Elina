export function showImagePreview(file, element) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        element.src = e.target.result;
    };
    
    reader.readAsDataURL(file);
}