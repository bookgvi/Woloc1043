<template lang="pug">
  .datas
    h6.q-mb-md Оборудование
      .row.q-pb-sm(v-for="(item, index) in facilities" :key="index")
        .col
          q-expansion-item.text-subtitle1(
            :label="item.name"
            :default-opened="hasVendor(item)"
          )
            .col.q-pl-md
              .row(v-if="item.vendors.length >= defaultCount")
                .col-6(v-for="facility in item.vendors" :key="facility.id")
                  q-checkbox(v-model="facility.presentsInStudio" :label="facility.name")
              .row(v-else)
                .col-12(v-for="facility in item.vendors" :key="facility.id")
                  q-checkbox(v-model="facility.presentsInStudio" :label="facility.name")
          q-separator
</template>

<script>
export default {
  props: {
    facilities: Array
  },
  data () {
    return {
      isOpen: false,
      defaultCount: 7
    }
  },
  methods: {
    hasVendor (item) {
      const result = item.vendors
        .map(vendor => vendor.presentsInStudio === true)
        .reduce((current, next) => { return current || next }, false)
      return result
    }
  }
}
</script>
