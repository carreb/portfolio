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
    <div v-if="musicDataLoaded > 0" class="section4-music-liveapi">
        <h3 class="sub-subtitle recently-ive-been-listening-to">recently i've been listening to:</h3>
        <div class="flex-recent-lastfm-data" v-if="this.musicData.albums != undefined">
            <div class="albums unselectable">
                <h4 class="sub-subtitle music">album</h4>
                <img v-if="getAlbumImage(0, musicData) != 'Loading'" :src="getAlbumImage(0, musicData)" alt="">
                <h5 class="album-albumname">{{ getAlbumName(0, musicData) }}</h5>
                <h6 class="album-artistname">{{ getAlbumArtist(0, musicData) }}</h6>
                <h7 class="album-plays">{{ getAlbumPlays(0, musicData) }} plays this week</h7>
            </div>
            <div class="artists unselectable">
                <h4 class="sub-subtitle music">artist</h4>
                <img :src="artistImage" class="artistImage">
                <h5 class="artist-artistname">{{ getArtistName(0, musicData) }}</h5>
                <h6 class="artist-plays">{{ getArtistPlays(0, musicData) }} plays this week</h6>
            </div>
            <div class="tracks unselectable">
                <h4 class="sub-subtitle music">track</h4>
                <img :src="this.trackImage" class="trackImage">
                <h5 class="track-trackname">{{ getTrackName(0, musicData) }}</h5>
                <h6 class="track-artistname">{{ getTrackArtist(0, musicData) }}</h6>
                <h7 class="track-plays">{{ getTrackPlays(0, musicData) }} plays this week</h7>
            </div>
        </div>
        <div v-else>
            <h1 style="text-align: center;">[loading last.fm data]</h1>
        </div>
    </div>
    <div class="section5-discogs-collection" v-if="musicDataLoaded > 0">
        <h3 class="sub-subtitle" style="text-align: center;">my vinyl collection</h3>
        <p class="discogs-value-text" v-if="this.musicData.collectionValue != undefined">{{ this.musicData.collectionValue.minimum.substring(2) }} minimum - {{ this.musicData.collectionValue.median.substring(2) }} median - {{ this.musicData.collectionValue.maximum.substring(2) }} maximum</p>
        <div class="flex-discogs-items">
            <div class="most-recently-added discogs-section" @click="openDiscogs(musicData.collection.releases[musicData.collection.releases.length - 1])">
                <h4 class="sub-subtitle music">newest addition</h4>
                <img :src="musicData.collection.releases[musicData.collection.releases.length - 1].basic_information.cover_image" class="discogs-image">
                <h5 class="discogs-albumname">{{ musicData.collection.releases[musicData.collection.releases.length - 1].basic_information.title }}</h5>
                <h6 class="discogs-discinfo">{{ parseDiscogsFormats(musicData.collection.releases[musicData.collection.releases.length - 1].basic_information) }}</h6>
                <h7 class="discogs-year">{{ musicData.collection.releases[musicData.collection.releases.length - 1].basic_information.year }}</h7>
            </div>
            <div class="random-disc-1 discogs-section" @click="openDiscogs(musicData.collection.releases[randomDiscNumber1])">
                <h4 class="sub-subtitle music">random disc</h4>
                <img :src="musicData.collection.releases[randomDiscNumber1].basic_information.cover_image" class="discogs-image">
                <h5 class="discogs-albumname">{{ musicData.collection.releases[randomDiscNumber1].basic_information.title }}</h5>
                <h6 class="discogs-discinfo">{{ parseDiscogsFormats(musicData.collection.releases[randomDiscNumber1].basic_information) }}</h6>
                <h7 class="discogs-year">{{ musicData.collection.releases[randomDiscNumber1].basic_information.year }}</h7>
            </div>
            <div class="random-disc-2 discogs-section" @click="openDiscogs(musicData.collection.releases[randomDiscNumber2])">
                <h4 class="sub-subtitle music">random disc</h4>
                <img :src="musicData.collection.releases[randomDiscNumber2].basic_information.cover_image" class="discogs-image">
                <h5 class="discogs-albumname">{{ musicData.collection.releases[randomDiscNumber2].basic_information.title }}</h5>
                <h6 class="discogs-discinfo">{{ parseDiscogsFormats(musicData.collection.releases[randomDiscNumber2].basic_information) }}</h6>
                <h7 class="discogs-year">{{ musicData.collection.releases[randomDiscNumber2].basic_information.year }}</h7>
            </div>
        </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <ContactPage></ContactPage>


    <br>
    <br>
    <br>
    <br>
</template>

<script>
import { toRaw } from 'vue'

import ContactPage from './ContactPage.vue'

    export default {
        name: 'LandingPage',
        data() {
            return {
                musicData: {},
                musicDataLoaded: -4,
                artistImage: '',
                trackImage: '',
                randomDiscNumber1: 0,
                randomDiscNumber2: 0,
                lastfmKey: process.env.VUE_APP_LASTFM_KEY,
                spotifyKey: process.env.VUE_APP_SPOTIFY_KEY,
                spotifyClientId: process.env.VUE_APP_SPOTIFY_CLIENT_ID,
                spotifyClientSecret: process.env.VUE_APP_SPOTIFY_CLIENT_SECRET
            }
        },
        components: {
            ContactPage,
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
                            .then(async (res) => {
                                let data = await res.json();
                                if (res.status != 401) {
                                    console.log(data)
                                    console.log(data.artists.items[0].images[0].url.toString())
                                    this.artistImage = data.artists.items[0].images[0].url.toString();
                                } else {
                                    // request a new token using client credentials flow
                                    fetch(`https://accounts.spotify.com/api/token`, {
                                        headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Basic ${btoa(this.spotifyClientId + ":" + this.spotifyClientSecret)}` },
                                        body: "grant_type=client_credentials",
                                        method: "POST"
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        this.spotifyKey = data.access_token;
                                        return this.getMusicData()
                                    })
                                }
                            })
                        this.musicDataLoaded += 1;
                    })
                // get tracks
                fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&period=7day&user=notcarreb&api_key=${this.lastfmKey}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        this.musicData.tracks = data;
                        console.log(toRaw(this.musicData.tracks))
                        let trackName = this.musicData.tracks.toptracks.track[0].name;
                        fetch(`https://api.spotify.com/v1/search?q=${trackName}&type=track&limit=1`, {
                            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.spotifyKey}` }
                            })
                            .then(async (res) => {
                                let data = await res.json();
                                if (res.status != 401) {
                                    console.log(data)
                                    this.trackImage = data.tracks.items[0].album.images[0].url.toString();
                                } else {
                                    // request a new token using client credentials flow
                                    fetch(`https://accounts.spotify.com/api/token`, {
                                        headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Basic ${btoa(this.spotifyClientId + ":" + this.spotifyClientSecret)}` },
                                        body: "grant_type=client_credentials",
                                        method: "POST"
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        this.spotifyKey = data.access_token;
                                        return this.getMusicData()
                                    })
                                }
                            })
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
                // get discogs collection
                fetch(`https://api.discogs.com/users/carreb/collection/folders/0/releases?token=${process.env.VUE_APP_DISCOGS_TOKEN}`)
                    .then(response => response.json())
                    .then(data => {
                        this.musicData.collection = data;
                        console.log(toRaw(this.musicData.collection))
                        // sort the collection by newest "date_added" field
                        this.musicData.collection.releases.sort((a, b) => {
                            let dateA = new Date(a.date_added);
                            let dateB = new Date(b.date_added);
                            return dateA - dateB
                        });
                        
                        // generate random numbers for discogs items to display, cannot be the same number, also cannot be the last item in the array
                        let randomNums = [];
                        while (randomNums.length < 2) {
                            let randomNum = Math.floor(Math.random() * this.musicData.collection.releases.length);
                            if (randomNum != randomNums[0] && randomNum != this.musicData.collection.releases.length - 1) {
                                randomNums.push(randomNum);
                            }
                        }

                        this.randomDiscNumber1 = randomNums[0];
                        this.randomDiscNumber2 = randomNums[1];
                        this.musicDataLoaded += 1;
                    })
                // get discogs value
                fetch(`https://api.discogs.com/users/carreb/collection/value?token=${process.env.VUE_APP_DISCOGS_TOKEN}`)
                    .then(response => response.json())
                    .then(data => {
                        this.musicData.collectionValue = data;
                        this.musicDataLoaded += 1;
                    })
            },
            openDiscogs(disc) {
                // trim out the "api" part of the url
                disc.basic_information.resource_url = disc.basic_information.resource_url.replace("api.", "");
                // change releases to release in url
                disc.basic_information.resource_url = disc.basic_information.resource_url.replace("releases", "release");
                window.open(disc.basic_information.resource_url, '_blank');
            }
        },
        computed: {
            getAlbumImage() {
                return function(num, MusicData) {
                    if (MusicData.albums != undefined) {
                        return MusicData.albums.topalbums.album[num].image[3]["#text"];
                    }
                    return "Loading"
                }
            },
            getAlbumName() {
                return function(num, MusicData) {
                    if (MusicData.albums != undefined) {
                        return MusicData.albums.topalbums.album[num].name;
                    }
                    return "Loading"
                }
            },
            getAlbumArtist() {
                return function(num, MusicData) {
                    if (MusicData.albums != undefined) {
                        return MusicData.albums.topalbums.album[num].artist.name;
                    }
                    return "Loading"
                }
            },
            getAlbumPlays() {
                return function(num, MusicData) {
                    if (MusicData.albums != undefined) {
                        return MusicData.albums.topalbums.album[num].playcount;
                    }
                    return "Loading"
                }
            },
            getArtistName() {
                return function(num, MusicData) {
                    if (MusicData.artists != undefined) {
                        return MusicData.artists.topartists.artist[num].name;
                    }
                    return "Loading"
                }
            },
            getArtistPlays() {
                return function(num, MusicData) {
                    if (MusicData.artists != undefined) {
                        return MusicData.artists.topartists.artist[num].playcount;
                    }
                    return "Loading"
                }
            },
            isEmpty() {
                return function(obj) {
                    return Object.keys(obj).length === 0;
                }
            },
            getTrackName() {
                return function(num, MusicData) {
                    if (MusicData.tracks != undefined) {
                        return MusicData.tracks.toptracks.track[num].name;
                    }
                    return "Loading"
                }
            },
            getTrackArtist() {
                return function(num, MusicData) {
                    if (MusicData.tracks != undefined) {
                        return MusicData.tracks.toptracks.track[num].artist.name;
                    }
                    return "Loading"
                }
            },
            getTrackPlays() {
                return function(num, MusicData) {
                    if (MusicData.tracks != undefined) {
                        return MusicData.tracks.toptracks.track[num].playcount;
                    }
                    return "Loading"
                }
            },
            reverseArray() {
                return function(arr) {
                    return arr.reverse();
                }
            },
            parseDiscogsFormats() {
                return function(Disc) {
                    let formats = []
                    for (let i = 0; i < Disc.formats.length; i++) {
                        if (Disc.formats[i].name == "Vinyl") {
                            if (Disc.formats[i].qty > 1) {
                                formats.push(`${Disc.formats[i].qty}x ${Disc.formats[i].descriptions[0]}, ${Disc.formats[i].descriptions[1]}`)
                            } else {
                                formats.push(`${Disc.formats[i].descriptions[0]}, ${Disc.formats[i].descriptions[1]}`)
                            }
                            if (Disc.formats[i].text != undefined) {
                                formats.push(Disc.formats[i].text)
                            }
                        }
                    }
                    return formats.join(", ")
                }
            },
            getMostExpensiveDisc() {
                return function() {
                    if (this.musicData.collection != undefined) {
                        let mostExpensiveDisc = this.musicData.collection.releases[0];
                        for (let i = 0; i < this.musicData.collection.releases.length; i++) {
                            fetch(this.musicData.collection.releases[i].basic_information.resource_url)
                                .then(response => response.json())
                                .then(data => {
                                    console.log(fetch(mostExpensiveDisc.basic_information.resource_url).then(response => response.json()).then(data => data.lowest_price))
                                    if (data.lowest_price > fetch(mostExpensiveDisc.basic_information.resource_url).then(response => response.json()).then(data => data.lowest_price)) {
                                        mostExpensiveDisc = data;
                                    }
                                })
                        }
                        return mostExpensiveDisc;
                    }
                    return "Loading"
                }
            },
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
    .discogs-section {
        width: 300px;
        cursor: pointer;
    }

    .discogs-image {
        width: 300px;
        height: 300px;
        object-fit: cover;
    }

    .discogs-albumname {
        font-size: 25px;
        font-weight: 600;
        position: relative;
        margin: 0;
        margin-bottom: 0;
    }

    .discogs-discinfo {
        font-size: 20px;
        font-weight: 400;
        position: relative;
        margin-top: 0px;
        margin-left: 3px;
        margin-bottom: 2px;
    }
    
    .discogs-year {
        font-size: 15px;
        font-weight: 200;
        position: relative;
        margin-top: 10px;
        margin-left: 3px;
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

    .discogs-value-text {
        font-size: 15px;
        text-align: center;
        font-weight: 600;
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

    .track-trackname {
        font-size: 25px;
        font-weight: 600;
        position: relative;
        margin: 0;
        margin-bottom: 0;
    }

    .track-artistname {
        font-size: 20px;
        font-weight: 400;
        position: relative;
        margin-top: 0px;
        margin-left: 3px;
        margin-bottom: 2px;
    }

    .track-plays {
        font-size: 15px;
        font-weight: 200;
        position: relative;
        margin-top: 10px;
        margin-left: 3px;
    }

    .tracks {
        width: 300px;
    }

    .trackImage {
        width: 300px;
        height: 300px;
        object-fit: cover;
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
    .section5-discogs-collection {
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

    .flex-recent-lastfm-data {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 10px;
    }

    .flex-discogs-items {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 10px;
    }

        .section6-projects-bumper {
        width: 70%;
        margin: auto;
        left: 0;
        right: 0;
        position: relative;
        top: 50px;
        text-align: center;
    }
</style>