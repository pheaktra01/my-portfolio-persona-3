<template>
  <div class="skill-row">
    <span>{{ name }}</span>

    <div class="bar">
      <div
        class="fill"
        :style="{ width: value + '%' }"
      />
    </div>

    <span>{{ value }}%</span>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  value: Number
})
</script>

<style scoped>
.skill-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.bar {
  flex: 1;
  height: 10px;
  background: rgba(255,255,255,.1);
  overflow: hidden;
}

.fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    #00d4ff,
    #0077ff
  );
}
</style>