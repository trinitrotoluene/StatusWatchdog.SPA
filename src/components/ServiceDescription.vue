<template>
    <div>
        <div>{{displayName}}</div>
        <div>{{description}}</div>
        <canvas ref="serviceCanvas"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js";

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
            uptimeData: null,
            barColors: null
        };
    },
    mounted: function() {
        // todo: get data from API
        this.uptimeData = [100, 100, 99.4, 100, 100, 99.01, 100];
        this.barColors = [
            "green",
            "green",
            "orange",
            "green",
            "green",
            "red",
            "green"
        ];

        const chartContext = this.$refs.serviceCanvas.getContext("2d");
        const chart = new Chart(chartContext, {
            responsive: true,
            maintainAspectRatio: false,
            type: "bar",
            data: {
                labels: [],
                datasets: [
                    {
                        label: "uptime",
                        data: this.uptimeData,
                        backgroundColor: this.barColors,
                        barThickness: 8,

                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [
                        {
                            display: false,
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ],
                    xAxes: [
                        {
                            display: false,
                        }
                    ]
                }
            }
        });
    }
};
</script>

<style scoped>
</style>
