<template>
  <div>
    <span>
      <h1>Welcome to The Sort Fort!</h1>
      <button @click="toggleMode" id="dark" :class="{ dark: isBlack, light: !isBlack }">
        {{ isBlack ? 'Light' : 'Dark' }}<br />Mode
      </button>
    </span>
    <sort-graph :n="n" :isBlack="isBlack" :current="selection" />
    <sort-options @update-n="handleUpdateN" :isBlack="isBlack" @selection="updateSelection" />
  </div>
</template>

<style>
h1 {
  text-align: center;
  font-size: 5vmin;
}

span {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

button {
  box-shadow: 2px 2px 4px black;
}

select,
input {
  border-radius: 0.5vmin;
  border-width: 3px;
}

#dark {
  position: absolute;
  right: 0;
  font-size: 2.5vmin;
  margin-right: 2.5vmin;
}

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

body.dark-mode,
.dark {
  color: white;
  background-color: black;
  border-color: white;
}

.light {
  color: black;
  background-color: lightgray;
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      message: 'Hello World!' as string,
      n: 10 as number,
      isBlack: false as boolean,
      selection: { id: 'quick', name: 'Quick Sort', max: 1000 },
    }
  },
  methods: {
    handleUpdateN(newN: number) {
      this.n = Number(newN)
    },
    toggleMode() {
      this.isBlack = !this.isBlack
      if (this.isBlack) {
        document.body.classList.add('dark-mode')
      } else {
        document.body.classList.remove('dark-mode')
      }
    },
    updateSelection(selection: { id: string; name: string; max: number }) {
      this.selection = selection
    },
  },
}
</script>
