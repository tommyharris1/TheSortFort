<template>
  <div>
    <span>
      <h1>Welcome to The Sort Fort!</h1>
      <button @click="toggleMode" id="dark" :class="{ dark: isBlack, light: !isBlack }">
        <!-- Toggle button for dark/light mode - text changes based on current mode -->
        {{ isBlack ? 'Light' : 'Dark' }}<br />Mode
      </button>
    </span>
    <sort-graph :isBlack="isBlack" />
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
      // Retrieves dark mode preference from localStorage
      isBlack: localStorage.getItem("darkMode") === "true",
    }
  },
  methods: {
    // Switches between dark and light mode and saves to localStorage
    toggleMode() {
      this.isBlack = !this.isBlack
      if (this.isBlack) {
        document.body.classList.add('dark-mode')
      } else {
        document.body.classList.remove('dark-mode')
      }
      localStorage.setItem("darkMode", this.isBlack.toString())
    },
  },
  mounted() {
    if (this.isBlack) {
      // Apply dark mode class to body on initial load if dark mode is enabled
      document.body.classList.add('dark-mode')
    }
  }
}
</script>
