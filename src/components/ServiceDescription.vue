<template>
    <div class="rounded-md border-black border-1 shadow-lg">
        <div class="flex flex-row shadow-md p-2">
            <router-link :to="{ name: 'service', params: { id: slug }}" class>{{displayName}}</router-link>
            <div v-bind:class="statusTextClass">
                <span class="font-bold">{{statusTextValue}}</span>
            </div>
        </div>
        <div class="px-2 py-4">
            <chart-component :statistics="statistics" class="status-bar"></chart-component>
        </div>
    </div>
</template>

<script>
const axios = require("axios");

import chartComponent from "../components/ChartComponent";

export default {
    name: "ServiceDescription",
    props: {
        id: Number,
        slug: String,
        displayName: String,
        description: String,
        status: Number
    },
    data() {
        return {
            statistics: []
        };
    },
    computed: {
        statusTextClass: function() {
            return {
                "ml-auto": true,
                "status-text": true,
                "text-green-500": this.status == 0,
                "text-orange-500": this.status == 1,
                "text-red-500": this.status == 2
            };
        },
        statusTextValue: function() {
            switch (this.status) {
                case 0:
                    return "Normal";
                case 1:
                    return "Partial Outage";
                case 2:
                    return "Major Outage";
                default:
                    return "Unknown";
            }
        }
    },
    created: function() {
        this.fetchServiceStatistics();
    },
    methods: {
        fetchServiceStatistics: function() {
            axios
                .get("/api/v1/services/" + this.id + "/uptime" + "?limit=50")
                .then(response => {
                    this.statistics = response.data;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    components: {
        "chart-component": chartComponent
    }
};
</script>

<style scoped>
</style>
