import api from './instance'

const API_URL = process.env.API_CABINET_URL
export default {
  getAll: async () => {
    try {
      const r = await api.get(`${API_URL}/settings/location`)
      return r.data
    } catch (e) {
      console.warn('catch :: studios :: getAll', e)
      return e
    }
  },
  getOne: async (id) => {
    try {
      const r = await api.get(`${API_URL}/settings/location/${id}`)
      return r.data
    } catch (e) {
      console.warn('catch :: studios :: getSingleStudio', e)
      return e
    }
  },
  updateStudio: async (id, updateInfo) => {
    try {
      const status = await api.put(`${API_URL}/settings/location/${id}`, updateInfo)
      return status.data
    } catch (err) {
      console.warn('catch :: studios :: UpdateStudio', err)
      return err
    }
  },
  createStudio: async (createStudio) => {
    try {
      const status = await api.post(`${API_URL}/settings/location`, createStudio)
      return status.data
    } catch (err) {
      console.warn('catch :: studios :: createStudio', err)
      return err
    }
  },
  uploadImage: async (payload, config) => {
    try {
      const status = await api.post(`${API_URL}/settings/location/upload-image`, payload, config)
      return status.data
    } catch (err) {
      console.warn('catch :: studios :: uploadImage', err)
      return err
    }
  }
}
