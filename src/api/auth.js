import axios from '../utils/axios'

export const Auth = async ({ username, password }) => {
  try {
    const response = await axios.post(`/auth/`, {
      username,
      password,
    })
    return response
  } catch (error) {
    throw error.response
  }
}
