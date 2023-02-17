<template>
    <div>
        <div class="section2-more-about-me">
            <div class="body-text-wrapper">
                <p class="body-text-section2">
                    <span class="subtitle">contact</span><br><br>
                    mail: <a href="mailto:caleb@domyjobfor.me" target="__blank">caleb@domyjobfor.me</a><br>
                    github: <a href="https://github.com/carreb" target="__blank">/carreb</a><br>
                    instagram: <a href="https://instagram.com/carreb" target="__blank">@carreb</a><br>
                    afc & school mail: <a href="mailto:caleb@mciafc.com">caleb@mciafc.com</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ContactPage',
    }
</script>

<style lang="css" scoped>

.subtitle {
    font-weight: 900;
    font-size: 2.5rem;
}
.section2-more-about-me {
    width: 450px;
    height: 450px;
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
    background: radial-gradient(ellipse at center,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 70%,
            rgba(0, 0, 0, 0) 70.3%);
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
</style>