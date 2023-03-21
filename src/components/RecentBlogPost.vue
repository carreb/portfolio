<template>
    <div>
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
    name: "RecentBlogPost",
    created() {
        // get posts
        butter.post.list({ page: 1, page_size: 1 })
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

<style lang="css" scoped>
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
    margin-bottom: 50px;
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