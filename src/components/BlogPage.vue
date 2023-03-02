<template>
    <div class="page-header">
        <h1 class="title-huge blog-title">my blog</h1>
        <p class="blog-title-subtext">here you will find a collection of blog posts based on my interests and some of my school work.</p>
    </div>
    <div id="no-posts-found" v-if="this.posts == []">
        <h1 class="empty-posts">blog posts could not be loaded :^(</h1>
    </div>
    <div class="blog-container">
            <div class="posts-flex-container">
                <div id="blog-post" class="blog-post" v-for="(post, index) in posts" :key="post.slug + '_' + index" @click="this.$router.push('/blog/' + post.slug)">
                        <article class="media">
                            <figure>
                                <img v-if="post.featured_image" :src="post.featured_image" class="featured-image">
                                <img v-else src="http://via.placeholder.com/250x250" class="featured-image">
                            </figure>
                            <div class="blog-overview-text">
                                <h2 class="post-title">{{ post.title }}</h2>
                                <p class="post-title">{{ post.summary }}</p>
                            </div>
                        </article>
                </div>
        </div>
    </div>
</template>

<script>
import Butter from 'buttercms';
const butter = Butter(process.env.VUE_APP_BUTTERCMS_KEY)

    export default {
        name: "BlogPage",
        created() {
            // get posts
            butter.post.list({page: 1, page_size: 50})
            .then((res) => {
                this.posts = res.data.data
            })
        },
        data() {
            return {
                posts: []
            }
        }
    }
</script>

<style scoped>
.empty-posts {
    text-align: center;
}

.page-header {
    text-align: center;
    margin-top: 70px;
}

.blog-title-subtext {
    margin-top: -30px;
}

.posts-flex-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column-reverse;
    width: 100%;
    gap: 15px;
    flex: 1;
    margin-top: auto;
    margin-bottom: 160px;
}

.blog-container {
    position: absolute;
    margin: 0;
    width: 100%;
    left: 0;
    right: 0;
}

.featured-image {
    height: 250px;
    width: 250px;
    object-fit: cover;
    float: left;
    border-radius: 10px;
}

.blog-post {
    height: fit-content;
    min-height: 0;
    width: 80%;
    background-color: whitesmoke;
    border-radius: 10px;
    cursor: pointer;
    margin: 0;
    transition: all 200ms ease-out;
    padding-bottom: 10px;
}

.blog-post:hover {
    background-color: #FF92A5;
    color: #FFFFFF
}

.blog-overview-text {
    margin-left: 27%;
    padding-top: 0.5px;
}
</style>