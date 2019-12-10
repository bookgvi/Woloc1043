<template lang="pug">
  .settings(:key="pageReload")
    q-tab-panels(v-model="currentTab")
      q-tab-panel.q-pa-none(name="Локация")
        location(
          :key="studioID"
          :singleStudio="singleStudio"
          :rooms="rooms"
          :isSave="isSave"
          :services="services"
          :vendors="vendors"
          @updateStudio="updateStudio"
          @newStudio="newStudio"
          @createNewStudio="createNewStudio"
          @reloadPage="reloadPage"
        )
</template>

<script>
import location from './main'
import studios from '../../../api/studios'
export default {
  name: 'setting',
  components: {
    location
  },
  data () {
    return {
      pageReload: 0,
      id: this.$app.filters.getValues('settings').studio,
      isRequiredModal: false,
      currentTab: 'Локация',
      tabs: ['Локация'],
      allStudiosName: [],
      singleStudio: {},
      currentStudio: '',
      isSave: false,
      rooms: [],
      services: [],
      vendors: []
    }
  },
  computed: {
    studioID: {
      get () {
        this.singleStudioM()
        return this.$app.filters.getValues('settings').studio
      },
      set (val) {
        this.pageReload++
      }
    }
  },
  async mounted () {
    this.singleStudioM()
  },
  methods: {
    async singleStudioM () {
      const { items } = await studios.getAll().then(resp => resp.data)
      let { studio } = this.$app.filters.getValues('settings')
      if (!studio) return
      const rooms = items[0].rooms
      this.rooms = rooms
      this.singleStudio = await studios.getOne(studio).then(resp => resp.data)
      this.allStudiosName = items.map(item => item.name)
      this.services = this.singleStudio.services
      this.vendors = this.singleStudio.vendors
    },
    async updateStudio (services, vendors) {
      let { studio } = this.$app.filters.getValues('settings')
      if (!studio) {
        studio = this.currentStudio
      }
      const result = await studios.updateStudio(studio, this.singleStudio)
      if (result.hasOwnProperty('data') && result.data.hasOwnProperty('name')) {
        this.showNotif('Изменения сохранены', 'green')
      } else if (result.hasOwnProperty('errors')) {
        this.showNotif('Проверьте обязательные поля')
      } else {
        this.showNotif('При сохранении изменений произошла ошибка', 'red')
      }
    },
    async newStudio () {
      this.isSave = true
      this.singleStudio = { lat: 55.786419, lon: 37.725433 }
      this.rooms = []
      this.services = []
      this.vendors = []
    },
    async createNewStudio () {
      const result = await studios.createStudio(this.singleStudio)
      if (result.hasOwnProperty('data') && result.data.hasOwnProperty('name')) {
        this.showNotif('Изменения сохранены', 'green')
      } else if (result.hasOwnProperty('errors')) {
        this.showNotif('Проверьте обязательные поля')
        result.errors.forEach(item => {
          this.highLightRequired(item.source)
        })
      } else {
        this.showNotif('Ошибка при создании локации', 'red')
      }
    },
    async highLightRequired (fieldClass) {
      const field = document.querySelector(`.${fieldClass} input`)
      await this.$nextTick(_ => {
        field.focus()
      })
      await this.$nextTick(_ => {
        field.blur()
      })
    },
    reloadPage () {
      this.pageReload++
    },
    showNotif (msg, clr = 'purple') {
      this.$q.notify({
        message: msg,
        color: clr
      })
    }
  }
}
</script>
