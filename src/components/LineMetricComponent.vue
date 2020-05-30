<template>
    <div style="position: relative; height: 100px">
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js";

export default {
    props: {
        title: String,
        data: Array,
        tags: Array
    },
    computed: {
        chartOptions: function() {
            return {
                type: "line",
                data: {
                    labels: this.tags,
                    datasets: [
                        {
                            label: this.title,
                            fill: false,
                            data: this.data
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: 10
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [
                            {
                                display: true,
                                ticks: {
                                    min: 0
                                }
                            }
                        ],
                        xAxes: [
                            {
                                display: false
                            }
                        ]
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            };
        }
    },
    mounted: function() {
        const chartCtx = this.$refs.chartCanvas.getContext("2d");
        const chart = new Chart(chartCtx.this.chartOptions);

        this.$watch("data", function(data, newData) {
            this.updateChart(newData);
        });
    },
    methods: {
        updateChart: function(data) {}
    }
};
</script>
