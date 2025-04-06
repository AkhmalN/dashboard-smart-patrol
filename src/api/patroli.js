import axios from '../utils/axios'

export const getPatroli = async () => {
  try {
    const response = await axios.get(`/patrol/
      `)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}
export const getPatroliById = async (id) => {
  try {
    const response = await axios.get(`/patrol/${id}
      `)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const deletePatroli = async (id) => {
  try {
    const response = await axios.delete(`/patrol/${id}`)
    return response
  } catch (error) {
    throw new Error(error)
  }
}

export const getPatroliByInstansi = async ({ nama_instansi }) => {
  try {
    const response = await axios.get(`/patrol/instansi?nama_instansi=${nama_instansi}`)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const updatePatroli = async (id, newData) => {
  try {
    const response = await axios.put(`/patrol/${id}`, newData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    throw new Error(error)
  }
}
