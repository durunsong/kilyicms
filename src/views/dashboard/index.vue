<template>
  <component :is="isAdmin ? Admin : Editor"></component>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user";
import Admin from "./components/Admin.vue";
import Editor from "./components/User.vue";

const userStore = useUserStore();
const isAdmin = userStore.roles.includes("admin");
</script>
