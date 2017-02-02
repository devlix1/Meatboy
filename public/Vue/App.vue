<template>
    <div class="message">
      <div v-for="msg in msgs">
        <div class="text">{{ msg.msgtext }}</div>
      </div>
    </div>
</template>

<script>
import state from './main.js';

export default {
  name: 'chat',
  data () {
    return {
      msgs: state.msg
    }
  }
}
</script>