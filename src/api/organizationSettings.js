import api from './instance'

const API_URL = process.env.API_CABINET_URL
export default {
  getOne: async () => {
    try {
      const r = await api.get(`${API_URL}/settings/organizations`)
      return r.data
    } catch (e) {
      console.warn('catch :: dashboard/organization-settings :: getOne', e)
      return e
    }
  },
  updateOne: async (id, data) => {
    try {
      const r = await api.put(`${API_URL}/settings/organizations/${id}`, data)
      return r.data
    } catch (e) {
      console.warn('catch :: dashboard/organization-settings :: updateOne', e)
      return e
    }
  }
}
