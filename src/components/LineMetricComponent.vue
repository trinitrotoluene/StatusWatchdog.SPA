<template>
    <div>
        <div class="p-2">{{title}}</div>
        <div class="px-2" style="position: relative; height: 100px">
            <canvas ref="chartCanvas"></canvas>
        </div>
    </div>
</template>

<script>
import Chart from "chart.js";

export default {
    props: {
        title: String,
        entries: Array
    },
    computed: {
        data: function() {
            return this.entries.map(x => x.value);
        },
        tags: function() {
            return this.entries.map(x => x.tag);
        },
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
        const chart = new Chart(chartCtx, this.chartOptions);

        this.$watch("data", function(data, newData) {
            this.updateChart(newData);
        });
    },
    methods: {
        updateChart: function(data) {}
    }
};
</script>
