<template>
    <div class="projectspage">
        <h1>select a project type:</h1>
        <div class="flex-options-project-types" v-for="projectType in projectTypes" :key="projectType.key">
            <router-link :to="'/projects/' + projectType.key">
                <div class="project-type-option">
                    <h2>{{ projectType.name }}</h2>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProjectsPage',
        data() {
            return {
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
                    },
                    {
                        name: "music & record collecting",
                        key: "music"
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