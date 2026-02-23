<template>
  <div>
    <h1 style="text-align: center; font-size: 50px">Welcome to The Sort Fort!</h1>
    <sort-graph :n="10" />
  </div>
</template>

<style>
#first > button:hover {
  cursor: grab;
}

#last > button:hover {
  cursor: crosshair;
}

#wrapper {
  display: flex;
  flex-wrap: wrap;
}

#wrapper > div {
  border: solid rgb(1, 63, 1) 5px;
  flex-basis: 250px;
  margin: 10px;
  padding: 10px;
  background-color: lightgreen;
  text-align: center;
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      message: 'Hello World!',
    }
  },
}
</script>
