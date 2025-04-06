import axios from '../utils/axios'

export const CreateUser = async (createData) => {
  try {
    const response = await axios.post(`/users/register_user/`, createData)
    return response
  } catch (error) {
    throw new Error(error)
  }
}

export const GetUsers = async () => {
  try {
    const response = await axios.get(`/users/
    `)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}
export const GetUser = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}`)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteUser = async (data) => {
  try {
    const response = await axios.delete(`/users/${data}`)
    return response
  } catch (error) {
    throw new Error(error)
  }
}

export const updateUser = async (id, newData) => {
  try {
    const response = await axios.put(`/users/${id}`, newData)
    return response
  } catch (error) {
    throw new Error(error)
  }
}
