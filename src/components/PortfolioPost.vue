<template>
    <div id="blog-post" v-if="postLoaded">
        <div class="blog-post-title-information">
            <h1 class="blog-post-title title-huge">{{ post.data.title }}</h1>
            <h2 class="subtitle-portfolio">Event Ran on {{ parseDate(post.data.published) }}</h2>
            <!-- <router-link to="/blog">go back</router-link> -->
        </div>
        <div class="blog-post-body" v-html="post.data.body" v-if="postLoaded"></div>
        <!-- <router-link v-if="post.meta.previous_post" class="navbar" :to="'/blog/' + post.meta.previous_post.slug">{{ post.meta.previous_post.title }}</router-link>
        <router-link v-if="post.meta.next_post" :to="'/blog/' + post.meta.next_post.slug" class="navbar">{{ post.meta.next_post.title }}</router-link> -->
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
    },
    computed: {
        parseDate() {
            return function (date) {
                // Create the date string manually
                // Format: Month Day, Year
                let dateObj = new Date(date)
                let month = dateObj.toLocaleString('default', { month: 'long' })
                let day = dateObj.getDate()
                let year = dateObj.getFullYear()
                return month + " " + day + ", " + year
            }
        }
    }
}
</script>

<style lang="css">
/* Styles here are GLOBAL unless overriden. Be careful what you name them */
.blog-post-title-information {
    text-align: center;
}

.blog-post-body {
    width: 80%;
    margin: auto;
    left: 0;
    right: 0;
    text-align: left;
    margin-bottom: 100px;
}

.subtitle-portfolio {
    margin-top: -30px;
    font-weight: 200;
    font-size: 1rem;
}

.image-gallery {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: default;
    justify-content: center;
    align-items: center;
    gap: 5px;
}
.image-gallery > figure > img {
    margin: 0;
    padding: 0;
    width: 500px;
    height: 300px;
    aspect-ratio: 16 / 9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    object-fit: cover;
}

.image-gallery > figure {
    padding: 0;
    margin: 0;
}

figcaption {
    font-style: italic;
    color: #666;
}

</style>