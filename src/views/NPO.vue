<template>
    <v-container>
        <v-layout>
            <v-flex>
                <NPOCard :id="Number(id)" />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import NPOCard from "../components/NPOCard.vue";
export default {
  name: "NPO",
  props: ["id"],
  components: {
    NPOCard
  }
};
</script>