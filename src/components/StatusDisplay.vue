<template>
<div :class="cardClass">
        <span>{{statusMessage}}</span>
</div>
</template>

<script>
export default {
    props: {
        status: Number
    },
    computed: {
        statusMessage: function() {
            switch (this.status) {
                case 0:
                    return "All services are working normally.";
                case 1:
                    return "Some services are experiencing partial outages.";
                case 2:
                    return "Some services are experiencing severe outages.";
                default:
                    return "Service status is unknown.";
            }
        },
        cardClass: function() {
            return {
                "bg-green-500": this.status === 0,
                "bg-orange-500": this.status === 1,
                "bg-red-500": this.status === 2,
                "p-4": true,
                "text-white": true,
                "rounded-md": true,
                "text-md": true
            };
        }
    },
    data() {
        return {};
    }
};
</script>