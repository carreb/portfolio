<template>
    <div class="top-content-introduction">
        <br>
        <h1 class="title-huge unselectable">hi!</h1>
        <img src="@/assets/ryo.png" class="ryo-pic">
        <h3 class="subtitle">overview</h3>
        <p class="main-body-text">
            i'm caleb (they/them). i'm interested in a/v tech, film, music, and web development. i like to collect LPs of my favorite albums.
            <br>the picture is ryo from bocchi the rock, she is my biggest outfit inspo fr fr
            <br>on this site you will find some widgets relating to a few of my interests, as well as a portfolio of my previous projects in various categories
            <br>there is also a blog section where i write about my interests as well as some of the processes i go through behind my stuff.
        </p>
    </div>
    <div class="section2-more-about-me">
        <div class="body-text-wrapper">
            <p class="body-text-section2">
                <span class="subtitle">more about me</span><br><br>
                i'm {{ new Date().getFullYear() - 2006 }} years old and am currently
                a student at martingrove collegiate institute. at mci i am a co-president for the <a
                    href="https://mciafc.com" target="__blank">afc</a> and i typically take the role
                of stage manager during productions.
            </p>
        </div>
    </div>
    <div class="section3-music">
        <h3 class="subtitle">music</h3>
        <p class="music-section-intro-text">
            i've been in love with music ever since i was a little kid, the <a href="https://trans-siberian.com" target="__blank">trans-siberian orchestra</a> started playing on the tv and i was absolutely jamming out to it.
            my parents checked them out, saw that they were touring in toronto soon, and we went. we've been going to their shows every year since.
            we've gotten to know some of the band members too, which is pretty cool. i have a pretty big collection of drumsticks from the east-side drummer <a href="https://en.wikipedia.org/wiki/Jeff_Plate" target="__blank">jeff plate</a>.
            that's all to say that i've been a music lover ever since i was a kid. the next portion of the website will be dedicated to my current favorite albums, artists, and tracks, as well as my lp collection.
        </p>
    </div>
    <div v-if="musicDataLoaded" class="section4-music-liveapi">
        <h3 class="sub-subtitle recently-ive-been-listening-to">recently i've been listening to:</h3>
        <div class="flex-recent-lastfm-data" v-if="this.musicData.albums != undefined">
            <div class="albums unselectable">
                <h4 class="sub-subtitle music">album</h4>
                <img v-if="getAlbumImage(0) != 'Loading'" :src="getAlbumImage(0)" alt="">
                <h5 class="album-albumname">{{ getAlbumName(0) }}</h5>
                <h6 class="album-artistname">{{ getAlbumArtist(0) }}</h6>
                <h7 class="album-plays">{{ getAlbumPlays(0) }} plays this week</h7>
            </div>
            <div class="artists unselectable">
                <h4 class="sub-subtitle music">artist</h4>
                <img :src="artistImage" class="artistImage">
                <h5 class="artist-artistname">{{ getArtistName(0) }}</h5>
                <h6 class="artist-plays">{{ getArtistPlays(0) }} plays this week</h6>
            </div>
        </div>
    </div>
</template>

<script>
    import { toRaw } from 'vue'

    export default {
        name: 'LandingPage',
        data() {
            return {
                musicData: {},
                musicDataLoaded: -2,
                artistImage: 'Loading',
                lastfmKey: process.env.VUE_APP_LASTFM_KEY,
                spotifyKey: process.env.VUE_APP_SPOTIFY_KEY
            }
        },
        mounted() {
            this.getMusicData();
        },
        methods: {
            getMusicData() {
                // get artists
                fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&period=7day&user=notcarreb&api_key=${this.lastfmKey}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        this.musicData.artists = data;
                        let artistName = this.musicData.artists.topartists.artist[0].name;
                        console.log(toRaw(this.musicData.artists))
                            fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=1`, {
                            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.spotifyKey}` }
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                this.artistImage = data.artists.items[0].images[0].url.toString();
                            })
                        this.musicDataLoaded += 1;
                    })
                // get tracks
                fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&period=7day&user=notcarreb&api_key=${this.lastfmKey}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        this.musicData.tracks = data;
                        console.log(toRaw(this.musicData.tracks))
                        this.musicDataLoaded += 1;
                    })
                // get albums
                fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&period=7day&user=notcarreb&api_key=${this.lastfmKey}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        this.musicData.albums = data;
                        console.log(toRaw(this.musicData.albums))
                        this.musicDataLoaded += 1;
                    })
                console.log(toRaw(this.musicData))
            },
        },
        computed: {
            getAlbumImage() {
                return function(num) {
                    if (this.musicData.albums != undefined) {
                        return this.musicData.albums.topalbums.album[num].image[3]["#text"];
                    }
                    return "Loading"
                }
            },
            getAlbumName() {
                return function(num) {
                    if (this.musicData.albums != undefined) {
                        return this.musicData.albums.topalbums.album[num].name;
                    }
                    return "Loading"
                }
            },
            getAlbumArtist() {
                return function(num) {
                    if (this.musicData.albums != undefined) {
                        return this.musicData.albums.topalbums.album[num].artist.name;
                    }
                    return "Loading"
                }
            },
            getAlbumPlays() {
                return function(num) {
                    if (this.musicData.albums != undefined) {
                        return this.musicData.albums.topalbums.album[num].playcount;
                    }
                    return "Loading"
                }
            },
            getArtistName() {
                return function(num) {
                    if (this.musicData.artists != undefined) {
                        return this.musicData.artists.topartists.artist[num].name;
                    }
                    return "Loading"
                }
            },
            getArtistPlays() {
                return function(num) {
                    if (this.musicData.artists != undefined) {
                        return this.musicData.artists.topartists.artist[num].playcount;
                    }
                    return "Loading"
                }
            },
            isEmpty() {
                return function(obj) {
                    return Object.keys(obj).length === 0;
                }
            }
        }
    }
</script>

<style lang="css" scoped>
.top-content-introduction {
        text-align: center;
        margin-top: 0;
    }
    
    .title-huge {
        font-weight: 900;
        font-size: 4rem;
    }

    .subtitle {
        font-weight: 900;
        font-size: 2.5rem;
    }

    .albums {
        width: 300px;
    }
    .artists {
        width: 300px;
    }

    .artistImage {
        width: 300px;
        height: 300px;
        object-fit: cover;
    }
    
    .sub-subtitle {
        font-weight: 500;
        font-size: 2rem;
    }

    .sub-subtitle.music {
        font-weight: 500;
        font-size: 1.7rem;
        text-align: center;
        margin-top: 0;
        margin-bottom: 5px;
    }

    .album-albumname {
        font-size: 25px;
        font-weight: 600;
        position: relative;
        margin: 0;
        margin-bottom: 0;
    }

    .album-artistname {
        font-size: 20px;
        font-weight: 400;
        position: relative;
        margin-top: 0px;
        margin-left: 3px;
        margin-bottom: 2px;
    }
    .album-plays {
        font-size: 15px;
        font-weight: 200;
        position: relative;
        margin-top: 10px;
        margin-left: 3px;
    }
    
    .artist-artistname {
        font-size: 25px;
        font-weight: 600;
        position: relative;
        margin: 0;
        margin-bottom: 0;
    }

    .artist-plays {
        font-size: 15px;
        font-weight: 200;
        position: relative;
        margin-top: 10px;
        margin-left: 3px;
    }

    .ryo-pic {
        width: 200px;
        height: 200px;
        object-fit: cover;
        object-position: 0% 0%;
        border-radius: 50%;
    }

    .section2-more-about-me {
        width: 400px;
        height: 400px;
        border-radius: 50%;
        color: white;
        position: relative;
        top: 50px;
        margin: auto;
        left: 0;
        right: 0;
    }

    .main-body-text {
        font-size: 20px;
    }

    .body-text-wrapper {
        background: radial-gradient(
            ellipse at center,
                rgba(0, 0, 0, 1) 0%,
                rgba(0, 0, 0, 1) 70%,
                rgba(0, 0, 0, 0) 70.3%
        );
        width: 100%;
        height: 100%;
        position: relative;
        margin: 0;
        color: white;
    }

    .body-text-wrapper::before {
        content: "";
        float: left;
        height: 100%;
        width: 50%;
        shape-outside: polygon(0 0,
                98% 0,
                50% 6%,
                23.4% 17.3%,
                6% 32.6%,
                0 50%,
                6% 65.6%,
                23.4% 82.7%,
                50% 94%,
                98% 100%,
                0 100%);
        shape-margin: 7%;
    }

    .body-text-section2::before {
        content: "";
        float: right;
        height: 100%;
        width: 50%;
        shape-outside: polygon(2% 0%,
                100% 0%,
                100% 100%,
                2% 100%,
                50% 94%,
                76.6% 82.7%,
                94% 65.6%,
                100% 50%,
                94% 32.6%,
                76.6% 17.3%,
                50% 6%);
        shape-margin: 7%;
    }

    .body-text-section2 {
        font-size: 21px;
        height: 100%;
        line-height: 1.25;
        padding: 0;
        text-align: center;
        text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.3);
    }

    .section3-music {
        width: 70%;
        margin: auto;
        left: 0;
        right: 0;
        position: relative;
        top: 50px;
        text-align: center;
    }
    .music-section-intro-text {
        font-size: 20px;
    }
    .section4-music-liveapi {
        width: 80%;
        margin: auto;
        left: 0;
        right: 0;
        position: relative;
        top: 50px;
    }

    .recently-ive-been-listening-to {
        text-align: center;
    }
</style>