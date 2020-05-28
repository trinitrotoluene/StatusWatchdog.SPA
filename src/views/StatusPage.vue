<template>
    <div>
        <div class="my-10">
            <status-display :status="statusSummary"></status-display>
        </div>

        <div v-if="activeIncidents.length > 0" class="text-sm tracking-widest">ACTIVE INCIDENTS</div>
        <div v-if="activeIncidents.length > 0" class="px-5 border-dashed border-2 rounded-lg">
            <incident-card
                v-for="incident in activeIncidents"
                :key="incident.id"
                :id="incident.id"
                :status="incident.caused_status"
                :title="incident.title"
                :createdAt="incident.created_at"
                class="my-5"
            ></incident-card>
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

        <div class="my-10"></div>
        <div v-if="recentIncidents.length > 0" class="text-sm tracking-widest">RECENT INCIDENTS</div>
        <div v-if="recentIncidents.length > 0" class="px-5 border-dashed border-2 rounded-lg">
            <incident-card
                v-for="incident in recentIncidents"
                :key="incident.id"
                :id="incident.id"
                :status="incident.caused_status"
                :title="incident.title"
                :createdAt="incident.created_at"
                class="my-5"
            ></incident-card>
        </div>
    </div>
</template>

<script>
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
    computed: {
        activeIncidents: function() {
            return this.$store.state.incidents;
        },
        recentIncidents: function() {
            return this.$store.state.recentIncidents;
        },
        services: function() {
            return this.$store.state.services;
        },
        statusSummary: function() {
            if (this.services.some(x => x.status === 2)) {
                return 2;
            } else if (this.services.some(x => x.status === 1)) {
                return 1;
            }

            return 0;
        }
    },
    data() {
        return {
            pollingAction: null
        };
    },
    created: function() {
        this.triggerPollApi();

        this.pollingAction = setInterval(() => {
            this.triggerPollApi();
        }, 3000);
    },
    beforeDestroy: function() {
        clearInterval(this.pollingAction);
    },
    methods: {
        triggerPollApi: function() {
            this.$store.dispatch("fetchIncidents");
            this.$store.dispatch("fetchServices");
            this.$store.dispatch("fetchRecentIncidents");
        }
    }
};
</script>

<style>
</style>
