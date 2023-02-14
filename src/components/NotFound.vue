<template>
    <div class="center">
        <h1>uh oh ...</h1>
        <p>it looks like the page you were looking for ({{ currentRoute }}) doesn't exist... try something else</p>
        <p>[http error code 404]</p>
    </div>
</template>

<script >
    export default {
        name: "NotFound",
        computed: {
            currentRoute() {
                return this.$route.path
            }
        }
    }
</script>

<style scoped>

.center {
    text-align: center;
}

</style>