import axios from '../utils/axios'

export const GetAllAktivitas = async () => {
  try {
    const response = await axios.get(`/aktivitas/instansi?nama_instansi=All`)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteAktivitas = async (id) => {
  try {
    const response = await axios.delete(`/aktivitas/${id}`)
    return response
  } catch (error) {
    throw new Error(error)
  }
}

export const getAktivitasByInstansi = async ({ nama_instansi }) => {
  try {
    const response = await axios.get(`/aktivitas/instansi?nama_instansi=${nama_instansi}`)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const getAktivitasById = async (id) => {
  console.log(id)
  try {
    const response = await axios.get(`/aktivitas/detail/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const updateAktivitas = async (id, newData) => {
  try {
    const response = await axios.put(`/aktivitas/${id}`, newData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    throw new Error(error)
  }
}
