<template>
    <div class="message">
      <div v-for="msg in msgs">
        <div class="text">{{ msg.msgtext }}</div>
      </div>
      <div>{{ dbs.db }}</div>
    </div>
</template>

<script>
export default {
  name: 'chat',
  data () {
    return {
      msgs: this.$root.msg,
      dbs: this.$root.other
    }
  }
}
</script>