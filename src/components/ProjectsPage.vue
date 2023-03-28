<template>
    <div class="projectspage" v-if="pageEnabled">
        <h1>select a project type:</h1>
        <div class="flex-options-project-types" v-for="projectType in projectTypes" :key="projectType.key">
            <router-link :to="'/projects/' + projectType.key">
                <div class="project-type-option">
                    <h2>{{ projectType.name }}</h2>
                </div>
            </router-link>
        </div>
    </div>
    <div class="projectspage" v-else>
        <h1>this page is currently unavailable</h1>
    </div>
</template>

<script>
    export default {
        name: 'ProjectsPage',
        data() {
            return {
                pageEnabled: false,
                projectTypes: [
                    {
                        name: "web",
                        key: "web"
                    },
                    {
                        name: "a/v & stage direction",
                        key: "av"
                    },
                    {
                        name: "film",
                        key: "film"
                    }
                ]
            }
        }
    }
</script>

<style lang="css" scoped>
.projectspage {
    text-align: center;
}
</style>