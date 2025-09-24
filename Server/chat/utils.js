export function generateConversationId(userA, userB) {
  console.log(userA, userB)
  if (userA === userB) {
    throw new Error("Conversation requires two different users");
  }
  // Sort the two IDs lexicographically (alphabet + number ordering)
  return [userA, userB].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)).join('_');
}
