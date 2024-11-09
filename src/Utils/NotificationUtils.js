
export function openNotificationDestination(type, userId, postId) {

  if (type === 'request' || type === 'accept') {
    return `profile/${userId}`
  } else {
    return `post/${postId}`
  }
}
