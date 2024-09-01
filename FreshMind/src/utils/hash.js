import bcrypt from 'bcryptjs'

export const hashPassword = async (password) => {
  const saltRounds = 10
  try {
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch (err) {
    console.error('Error hashing password:', err)
    throw err
  }
}

export const hashPasswordCompare = async (passwordInput, hashedPassword) => {
  try {
    const result = await bcrypt.compare(passwordInput, hashedPassword)
    return result
  } catch (err) {
    console.error('Error comparing passwords:', err)
    throw err
  }
}
