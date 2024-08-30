export const checkEmailFormat = (email) => {
  /*
      Regex email validation
      Returns True if a valid email
  */
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}
