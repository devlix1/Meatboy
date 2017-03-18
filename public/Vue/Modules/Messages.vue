<template>
    <div class="р__payload_messages">
      <div v-for="msg in msgs" class="p__message_block">
        <div class="p__message_block_ava"><img v-bind:src="msg.profile.photo_max_orig"></div>
        <div class="p__message_block_text-block">
            <div class="p__message_block_title">
                <a v-bind:href="'//vk.com/id' + msg.profile.id">
                    {{ msg.profile.first_name }} {{ msg.profile.last_name }} ({{ msg.msg.msgname }})
                </a>
            </div>
            <div class="p__message_block_text">{{ msg.msg.msgtext.length > 0 ? msg.msg.msgtext : '[Attachment]' }}</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'chat',
  data () {
    return {
      msgs: this.$root.msg
    }
  }
}
</script>