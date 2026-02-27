<template>
  <div id="options">
    <select v-model="selection" @change="emitSelection" :class="{ 'dark': isBlack, 'light': !isBlack }" required>
      <option disabled>--Select an algorithm--</option>
      <div v-for="i in algorithms" :key="i.name">
        <option>{{ i.name }}</option>
      </div>
    </select>
    <input
      type="number"
      min="1"
      max="1000"
      value="10"
      v-model.number="localN"
      @change="emitN"
      :class="{ 'dark': isBlack, 'light': !isBlack }"
    />
  </div>
</template>

<style scoped>
#options select,
input {
  margin: 2vmin;
  font-size: 4vmin;
  align-items: center;
}

#options {
  text-align: center;
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      selection: '',
      algorithms: [
        { id: 'quick', name: 'Quick Sort', min: 10, max: 1000 },
        { id: 'bogo', name: 'Bogo Sort', min: 2, max: 8 },
        { id: 'bubble', name: 'Bubble Sort', min: 10, max: 1000 },
        { id: 'merge', name: 'Merge Sort', min: 10, max: 1000 },
        { id: 'selection', name: 'Selection Sort', min: 10, max: 1000 },
        { id: 'insertion', name: 'Insertion Sort', min: 10, max: 1000 },
      ],
      localN: 10,
    }
  },
  methods: {
    emitN() {
      this.$emit('update-n', this.localN)
    },
    emitSelection() {
      this.$emit('selection', this.selection);
    }
  },
  props: {
    isBlack: {
      type: Boolean
    }
  }
}
</script>
