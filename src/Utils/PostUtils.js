
export function postReactionCount(allReaction, reaction) {
    const totalReaction = allReaction?.filter(singleReaction => singleReaction.type === reaction)
    return totalReaction?.length;
}

export function isUserReaction(id, allReaction, reaction) {
    const userReaction = allReaction?.some(singleReaction => singleReaction.user === id && singleReaction.type === reaction)
    return userReaction;
}

//for Comment
export function commentReactionCount(allReaction, reaction) {
    const totalReaction = allReaction?.filter(singleReaction => singleReaction.type === reaction)
    return totalReaction?.length;
}

export function isUserCommentReaction(id, allReaction, reaction) {
    const userReaction = allReaction?.some(singleReaction => singleReaction.user === id && singleReaction.type === reaction)
    return userReaction;
}

//for Reply
export function replyReactionCount(allReaction, reaction) {
    const totalReaction = allReaction?.filter(singleReaction => singleReaction.type === reaction)
    return totalReaction?.length;
}

export function isUserReplyReaction(id, allReaction, reaction) {
    const userReaction = allReaction?.some(singleReaction => singleReaction.user === id && singleReaction.type === reaction)
    return userReaction;
}

export function extractImageUrls(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const imgElements = doc.querySelectorAll('img');
    const imageUrls = Array.from(imgElements).map((img) => img.getAttribute('src'));
    // Remove all img tags from the document
    imgElements.forEach((img) => img.remove());
    // Get the updated HTML content without img tags
    const cleanedHtml = doc.documentElement.outerHTML;
    return { imageUrls, cleanedHtml }
}