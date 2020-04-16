<template>
  <div :class="[(Object.keys(person).length) ? 'card' : 'not-display']">
    <img v-if="person.gender == 'Male'" src="../assets/male.png" alt="male" />
    <img v-if="person.gender == 'Female'" src="../assets/female.png" alt="female" />
    <h2 class="text">{{ person.first_name }} {{ person.last_name }}</h2>
    <h3 class="text">{{ person.email }}</h3>
  </div>
</template>
<script>
export default {
  name: "PersonComponent",
  props: {
    person: {
      type: Object,
      required: true
    }
  }
};
</script>
<style scoped>
.text {
  word-wrap: break-word;
  max-width: 95%;
}

.not-display {
  display: none;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  border-radius: 5px 5px 0 0;
  width: 100%;
}
</style>
