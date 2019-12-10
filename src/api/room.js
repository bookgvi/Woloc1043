import api from './instance'
import room from '../mocks/room'
const API_URL = process.env.API_CABINET_URL
export default {
  getDefault: async () => {
    const r = {
      data: Object.assign({}, room)
    }
    return r
  },
  getEmpty: async () => {
    try {
      const r = await api.get(`${API_URL}/room/additions`)
      return r.data.data
    } catch (e) {
      console.warn('catch :: room :: getEmptyDataForRoom', e)
    }
  },
  getOne: async (id) => {
    try {
      const r = await api.get(`${API_URL}/room/${id}`)
      return r.data.data
    } catch (e) {
      console.warn('catch :: room :: getSingleRoom', e)
    }
  },
  getBackgrounds: async (id) => {
    try {
      const r = await api.get(`${API_URL}/room/backgrounds`)
      return r.data.data
    } catch (e) {
      console.warn('catch :: room :: getBackgrounds', e)
    }
  },
  getInteriors: async (id) => {
    try {
      const r = await api.get(`${API_URL}/room/interiors`)
      return r.data.data
    } catch (e) {
      console.warn('catch :: room :: getInteriors', e)
    }
  },
  getCharacteristics: async (id) => {
    try {
      const r = await api.get(`${API_URL}/room/characteristics`)
      return r.data.data
    } catch (e) {
      console.warn('catch :: room :: getCharacteristics', e)
    }
  },
  getExtras: async (id) => {
    try {
      const r = await api.get(`${API_URL}/room/extras`)
      return r.data.data
    } catch (e) {
      console.warn('catch :: room :: getExtras', e)
    }
  },
  createRoom: async roomData => {
    try {
      const status = await api.post(`${API_URL}/room`, roomData)
      return status.data
    } catch (err) {
      console.warn('catch :: studios :: createRoom', err)
      return err
    }
  },
  updateRoom: async (id, roomData) => {
    try {
      const status = await api.put(`${API_URL}/room/${id}`, roomData)
      return status.data
    } catch (err) {
      console.warn('catch :: studios :: updateRoom', err)
      return err
    }
  }
}
