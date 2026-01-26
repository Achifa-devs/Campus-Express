export function errorHandler(response) {
  if (response === 1) {
    return response;
  }
  throw new Error("Internal server error, please try again");
}