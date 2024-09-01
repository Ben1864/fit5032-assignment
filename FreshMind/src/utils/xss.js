export const encodeInput = (input) => {
  //Replace < > with HTML safe encoding, prevents unwanted html elements
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
