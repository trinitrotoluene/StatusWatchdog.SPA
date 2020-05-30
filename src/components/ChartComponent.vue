<template>
    <div style="position: relative; height: 100px">
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js";

export default {
    props: {
        count: Number,
        statistics: Array
    },
    data() {
        return {
            dataChart: {}
        };
    },
    computed: {
        dataLabels: function() {
            return this.dataValues.map(x => x.up === -1 ? 'Not measured' : 'Uptime: ' + x.up + '%')
        },
        dataValues: function() {
            return this.statistics.map(x => x) // todo probably can remove this
        },
        uptimeValues: function() {
            return this.dataValues.map(x => x.up === -1 ? 0 : x.up)
        },
        dataColors: function() {
            return this.dataValues.map(x => {
                if (x.up === -1) {
                    return 'hsl(0, 0%, 29%)'
                }

                if (x.outages === null) {
                    return "hsl(171, 100%, 41%)"
                } else if (x.outages.some(y => y.type === 2)) {
                    return "#F56565"
                } else {
                    return "#ED8936"
                }
            });
        }
    },
    mounted: function() {
        const chartCtx = this.$refs.chartCanvas.getContext("2d");
        const chart = new Chart(chartCtx, {
            type: "line",
            data: {
                labels: this.dataLabels,
                datasets: [
                    {
                        label: "uptime",
                        fill: false,
                        pointBorderColor: this.dataColors,
                        pointBackgroundColor: this.dataColors,
                        data: this.uptimeValues
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
                                min: 0,
                                max: 100,
                                stepSize: 50
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
                    enabled: false,
                    custom: function(tooltipModel) {
                        // Tooltip Element
                        var tooltipEl = document.getElementById('chartjs-tooltip');

                        // Create element on first render
                        if (!tooltipEl) {
                            tooltipEl = document.createElement('div');
                            tooltipEl.id = 'chartjs-tooltip';
                            tooltipEl.innerHTML = '<table></table>';
                            document.body.appendChild(tooltipEl);
                        }

                        // Hide if no tooltip
                        if (tooltipModel.opacity === 0) {
                            tooltipEl.style.opacity = 0;
                            return;
                        }

                        // Set caret Position
                        tooltipEl.classList.remove('above', 'below', 'no-transform');
                        if (tooltipModel.yAlign) {
                            tooltipEl.classList.add(tooltipModel.yAlign);
                        } else {
                            tooltipEl.classList.add('no-transform');
                        }

                        function getBody(bodyItem) {
                            return bodyItem.lines;
                        }

                        // Set Text
                        if (tooltipModel.body) {
                            var titleLines = tooltipModel.title || [];
                            var bodyLines = tooltipModel.body.map(getBody);

                            var innerHtml = '<thead>';

                            titleLines.forEach(function(title) {
                                innerHtml += '<tr><th>' + title + '</th></tr>';
                            });
                            innerHtml += '</thead><tbody>';

                            bodyLines.forEach(function(body, i) {
                                var colors = tooltipModel.labelColors[i];
                                var style = 'background:' + colors.backgroundColor;
                                style += '; border-color:' + colors.borderColor;
                                style += '; border-width: 2px';
                                var span = '<span style="' + style + '"></span>';
                                innerHtml += '<tr><td>' + span + body + '</td></tr>';
                            });
                            innerHtml += '</tbody>';

                            var tableRoot = tooltipEl.querySelector('table');
                            tableRoot.innerHTML = innerHtml;
                        }

                        // `this` will be the overall tooltip
                        var position = this._chart.canvas.getBoundingClientRect();

                        // Display, position, and set styles for font
                        tooltipEl.style.opacity = 1;
                        tooltipEl.style.position = 'absolute';
                        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                        tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
                        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                        tooltipEl.style.pointerEvents = 'none';
                    }
                }
            }
        });
        this.dataChart = chart;

        this.$watch("statistics", function(newValue, oldValue) {
            this.updateChart();
        });
    },
    methods: {
        updateChart: function() {
            this.dataChart.data.datasets[0].data = this.uptimeValues;
            this.dataChart.data.datasets[0].backgroundColor = this.dataColors;
            this.dataChart.data.labels = this.dataLabels;
            this.dataChart.update();
        }
    }
};
</script>

<style scoped>
</style>
