import axios from '../utils/axios'

export const CreatePos = async (data) => {
  try {
    const response = await axios.post(`/pos`, data)
    return response
  } catch (error) {
    console.error('Failed to post data:', error)
    throw new Error(error)
  }
}
export const GetPos = async () => {
  try {
    const response = await axios.get(`/pos/
      `)
    return response.data.pos
  } catch (error) {
    throw new Error(error)
  }
}

export const GetPosByInstansi = async ({ lokasi_pos }) => {
  try {
    const response = await axios.get(`/pos/lokasi?lokasi_pos=${lokasi_pos}`)
    return response.data.pos
  } catch (error) {
    throw new Error(error)
  }
}

export const deletePos = async (id) => {
  try {
    const response = await axios.delete(`/pos/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const updatePos = async (id, editData) => {
  try {
    const response = await axios.put(`/pos/${id}`, editData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    throw new Error(error)
  }
}
