<template>
  <q-page class=" text-h2 flex flex-center">
    <h1>Познакомьтесь с базой отдыха Хуторок</h1>
    <router-link to="/thermal">
      <img id="thermal" alt="Бассейны с термальной водой" src="../../assets/thermal-water.jpg">
      <label for="thermal">Бассейны с термальной водой</label>
    </router-link>
    <router-link to="/rooms">
      <img id="rooms" alt="Уютные домики и комфортные номера" src="../../assets/rooms.jpg">
      <label for="rooms">Уютные домики и комфортные номера</label>
    </router-link>
    <router-link to="/map">
      <img id="virtualBase" alt="Виртуальная прогулка по базе" src="../../assets/virtual-base.jpg">
      <label for="virtualBase">Виртуальная прогулка по базе</label>
    </router-link>
  </q-page>
</template>

<script>
  export default {
    name: 'InfoAboutHutorok',
    data() {
      return {

      }
    }
  }

</script>

<style scoped>

</style>
