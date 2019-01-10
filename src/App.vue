<template>
  <!-- If we don't do this, the Chat component won't refresh when moving from /topics/foo => /topics/bar
    https://forum.vuejs.org/t/rerendering-component-on-route-param-change-recalling-created-hooks/9536/2 -->
  <router-view :key="$route.path + ($route.params.topic || '')" />
</template>

<style>
html,
body {
  height: 100%;
}
body {
  background-color: #b5d8ab;
}
</style>
