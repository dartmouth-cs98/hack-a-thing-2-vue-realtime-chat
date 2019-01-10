<template>
  <b-list-group-item>
    <div class="d-flex w-100 justify-content-between">
      <small>{{ msg.user }}</small> <small>{{ msg.created_at }}</small>
    </div>
    {{ msg.body }}
  </b-list-group-item>
</template>

<script>
export default {
  props: ["msg"]
}
</script>
