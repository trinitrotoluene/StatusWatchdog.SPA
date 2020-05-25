<template>
    <div class="status-page-root">
        <div v-if="error !== null"></div>
        <service-description
            v-else
            v-for="service in services"
            :key="service.id"
            :id="service.id"
            :slug="service.slug"
            :displayName="service.display_name"
            :status="service.status"
            :description="service.description"
        ></service-description>
    </div>
</template>

<script>
const axios = require("axios");
import serviceDescription from '../components/ServiceDescription'

export default {
    name: "StatusPage",
    components: {
        'service-description': serviceDescription
    },
    data() {
        return {
            services: null,
            error: null
        };
    },
    created: function () {
        axios.get("/api/v1/services").then(response => {
            if (response.status !== 200) {
                this.error =
                    "Failed to fetch services from the status server. Request failed with code " +
                    response.status;
            } else {
                this.services = response.data;
            }
        })
        .catch(() => {
            this.error = "Failed to fetch services from the status server."
        });
    }
};
</script>

<style>
</style>