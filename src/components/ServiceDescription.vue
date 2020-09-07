<template>
    <div class="rounded-md border-black border-1 shadow-lg py-2">
        <div class="flex flex-row shadow-md p-2">
            <div class="font-bold">{{displayName}}</div>
            <div v-bind:class="statusTextClass">
                <span class="font-bold">{{statusTextValue}}</span>
            </div>
        </div>
        <div v-if="uptimeStatistics.length > 0" class="px-2 py-4">
            <chart-component :statistics="uptimeStatistics" class="status-bar"></chart-component>
        </div>
        <div v-if="metrics.length > 0">
            <div v-for="metric in metrics" :key="metric.id">
                <line-metric-component
                    v-if="metric.entries.length > 0"
                    :key="metric.id"
                    :title="metric.name"
                    :entries="metric.entries"
                ></line-metric-component>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require("axios");

import chartComponent from "../components/ChartComponent";
import lineMetricComponent from "../components/LineMetricComponent";

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
            pollingAction: null
        };
    },
    computed: {
        metrics: function() {
            if (this.statistics === undefined) {
                return [];
            } else {
                console.log(this.statistics.metrics);
                return this.statistics.metrics;
            }
        },
        uptimeStatistics: function() {
            if (this.statistics === undefined) {
                return [];
            } else {
                return this.statistics.uptime;
            }
        },
        statistics: function() {
            return this.$store.state.serviceStatistics[this.id];
        },
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
        this.$store.dispatch("fetchServiceStatistics", this.id);

        this.pollingAction = setInterval(() => {
            this.$store.dispatch("fetchServiceStatistics", this.id);
        }, this.$store.state.defaults.slowPoll);
    },
    beforeDestroy: function() {
        clearInterval(this.pollingAction);
    },
    components: {
        "chart-component": chartComponent,
        "line-metric-component": lineMetricComponent
    }
};
</script>

<style scoped>
</style>
