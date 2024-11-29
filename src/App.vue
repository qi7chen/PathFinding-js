<script setup>

import {onMounted} from 'vue'
import Panel from './panel.js'
import Controller from './controller.js'

onMounted(()=>{
  // initialize visualization
  Panel.init()
  Controller.init()
})

</script>

<template>

</template>