<template>
    <div id="blog-post" v-if="postLoaded">
        <div class="blog-post-title-information">
            <h1 class="blog-post-title title-huge">{{ post.data.title }}</h1>
        </div>
        <div class="blog-post-body" v-html="post.data.body" v-if="postLoaded"></div>
        <router-link v-if="post.meta.previous_post" class="navbar" :to="'/blog/' + post.meta.previous_post">{{ post.meta.previous_post.title }}</router-link>
        <router-link v-if="post.meta.next_post" :to="'/blog/' + post.meta.next_post" class="navbar">{{ post.meta.next_post.title }}</router-link>
    </div>
</template>

<script>
import Butter from 'buttercms';
const butter = Butter(process.env.VUE_APP_BUTTERCMS_KEY)

export default {
    name: 'BlogPost',
    data() {
        return {
            post: {},
            postLoaded: false
        }
    },
    methods: {
        getPost() {
            butter.post.retrieve(this.$route.params.slug)
            .then((res) => {
                this.post = res.data
                this.postLoaded = true
            }).catch((res) => {
                console.log(res)
            })
        }
    },
    created() {
        this.getPost()
    }
}
</script>

<style lang="css" scoped>

.blog-post-title-information {
    text-align: center;
}

.blog-post-body {
    width: 80%;
    margin: auto;
    left: 0;
    right: 0;
    text-align: center;
}

</style>