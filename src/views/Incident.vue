<template>
    <div class="py-10">
        <div class="text-sm tracking-widest">INCIDENT REPORT</div>
        <div class="px-5 border-dashed border-2 rounded-lg">
            <div class="my-5 text-xl text-gray-700 font-bold">{{incident.title}}</div>
            <incident-update-step
                v-for="update in incident.updates"
                :key="update.id"
                :state="update.state"
                :message="update.message"
                :createdAt="update.created_at"
                class="my-5"
            ></incident-update-step>
        </div>
    </div>
</template>

<script>
const axios = require("axios");
import incidentUpdateStep from "../components/IncidentUpdateStep";

export default {
    name: "Incident",
    components: {
        "incident-update-step": incidentUpdateStep
    },
    data() {
        return {
            incident: {
                updates: []
            }
        };
    },
    created: function() {
        this.$store.dispatch('fetchIncidentUpdates', this.$route.params.id);
    }
};
</script>

<style>
</style>
