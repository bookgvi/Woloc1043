import crudMixin from '../crudMixin'
import api from '../../api'

export default {
  name: 'studios',
  mixins: [crudMixin],
  computed: {
    firstStudio () {
      return this.list[0]
    },
    forOptions () {
      return this.list.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      })
    }
  },
  methods: {
    getFiltered (filter) {
      if (filter) {
        return this.list.find(({ id }) => id === filter.studio)
      } else return {}
    },
    async getOne (id) {
      const res = await api.studios.getOne(id)
      return res
    },
    async uploadImage (payload, config) {
      const res = await api.studios.uploadImage(payload, config)
      return res
    },
    async updateStudio (id, updateInfo) {
      const res = await api.studios.updateStudio(id, updateInfo)
      return res
    }
  }
}
