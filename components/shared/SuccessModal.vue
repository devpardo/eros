<template>
  <transition name="modal">
    <div class="modal-mask" v-if="successModal.content !== ''" :style="{ 'display': (successModal.content !== '' ? '' : 'none') }">
      <div class="modal-overlay" @click="clearError"></div>
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h4 class="modal-title text-center"><i class="fa fa-check"></i> {{ successModal.title || 'Success' }}</h4>
          </div>

          <div class="modal-body">
            <p class="text-center" v-html="successModal.content"></p>
          </div>

          <div class="modal-footer text-center">
            <a class="btn btn-default" @click="clearError">确定</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      show: true
    }
  },
  computed: mapState([
    'successModal'
  ]),
  methods: {
    clearError () {
      this.$store.commit('MODAL_DETAILS', { title: '', content: '', type: 'success' })
    }
  }
}
</script>
