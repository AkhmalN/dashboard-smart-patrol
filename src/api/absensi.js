import axios from '../utils/axios'

export const GetAbsensi = async () => {
  try {
    const response = await axios.get(`/absensi/
      `)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteAbsensi = async (id) => {
  try {
    const response = await axios.delete(`/absensi/${id}`)
    return response
  } catch (error) {
    throw new Error(error)
  }
}

export const getAbsensiByLokasi = async ({ lokasi_absen }) => {
  try {
    const response = await axios.get(`/absensi/lokasi?lokasi_absen=${lokasi_absen}`)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const getAbsensiById = async (id) => {
  try {
    const response = await axios.get(`/absensi/detail/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}
