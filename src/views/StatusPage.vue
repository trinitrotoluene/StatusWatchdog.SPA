<template>
    <div>
        <div v-if="error !== ''">{{ error }}</div>
        <div class="section">
            <div class="my-10">
                <status-display :status="statusSummary"></status-display>
            </div>

            <div class="text-sm tracking-widest">ACTIVE INCIDENTS</div>
            <div class="px-5 border-dashed border-2 rounded-lg">
                <incident-card
                    v-for="incident in activeIncidents"
                    :key="incident.id"
                    :id="incident.id"
                    :status="incident.caused_status"
                    :title="incident.title"
                    :since="new Date(incident.created_at)"
                    class="my-5"
                ></incident-card>
            </div>
        </div>
        <div class="my-10"></div>
        <div class="text-sm tracking-widest">SERVICES</div>
        <div class="px-5 border-dashed border-2 rounded-lg">
            <service-description
                v-for="service in services"
                :key="service.id"
                :id="service.id"
                :slug="service.slug"
                :displayName="service.display_name"
                :status="service.status"
                :description="service.description"
                class="my-5"
            ></service-description>
        </div>
    </div>
</template>

<script>
const axios = require("axios");
import serviceDescription from "../components/ServiceDescription";
import statusDisplay from "../components/StatusDisplay";
import incidentCard from "../components/IncidentCard";

export default {
    name: "StatusPage",
    components: {
        "service-description": serviceDescription,
        "status-display": statusDisplay,
        "incident-card": incidentCard
    },
    data() {
        return {
            activeIncidents: [],
            services: [],
            error: ""
        };
    },
    computed: {
        statusSummary: function() {
            if (this.services.some(x => x.status === 2)) {
                return 2;
            } else if (this.services.some(x => x.status === 1)) {
                return 1;
            }

            return 0;
        }
    },
    created: function() {
        this.fetchServiceMetadata();
    },
    methods: {
        fetchServiceMetadata: function() {
            axios
                .get("/api/v1/services")
                .then(response => {
                    if (response.status !== 200) {
                        this.error =
                            "Failed to fetch services from the status server. Request failed with code " +
                            response.status;
                    } else {
                        this.services = response.data;
                    }
                })
                .catch(() => {
                    this.error =
                        "Failed to fetch services from the status server.";
                });

            axios
                .get("/api/v1/incidents")
                .then(response => {
                    if (response.status !== 200) {
                        this.error =
                            "Failed to fetch active incidents from the status server. Request failed with code " +
                            response.status;
                    } else {
                        this.activeIncidents = response.data;
                    }
                })
                .catch(() => {
                    this.error =
                        "Failed to fetch incidents from the status server.";
                });
        }
    }
};
</script>

<style>
</style>