<template>
    <header class="masterhead">
        <div class="container h-100">
            <div class="h-100 showcase-wrapper">
                <div class="text-white py-5 showcase-header">
                    <h1    style="font-size: 4rem; font-weight: bold;"  class="font-weight-light text-inner-shadow-violet">EL MARCHII</h1>
                    <div class="w-100 text-center mt-5">
                        <router-link :to="{name:'catalog'}">
                            <button class="btn-shopping font-weight-bold py-2 px-3 text-uppercase pulse" 
        style="margin-top: 240px ; margin-right: 500px;  position: relative;">
    Start shopping
    <span>
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
    </span>
</button>

                        </router-link>
                    </div>
                </div>
               
            </div>
        </div>
    </header>
</template>
<script>
    export default {
        name: "ShowcaseImage"
    };
</script>
<style scoped>
    .masterhead {
        height: 95vh;
        background: linear-gradient(0deg, rgba(15, 13, 13, 0.3), rgba(23, 19, 21, 0.3)), url('~@/assets/img/showcase-bg.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    .showcase-header-bg {
        background: #f9f9f912;
        padding: 10px 15px;
    }

    .masterhead h1 {
        font-family: "Anton", sans-serif;
        letter-spacing: 2px;
        text-shadow: 3px 3px 5px #452855, -1px -1px 5px #040404, 1px -1px 5px #460768, -1px 1px 5px #15091c, 1px 1px 5px #7119a2;
    }

    .btn-shopping {
        border: 3px solid #fbfbfb0f;
        color: #6f1b9d;
/*        border-radius: 14px;*/
        font-size: 16px;
        font-family: 'Cabin', sans-serif;
        font-weight: bold;
    }

    p {
        font-family: 'Cabin', sans-serif;
    }

    .btn-shopping:hover {
        color: aliceblue;
        border: 3px solid aliceblue;
        transition: 1s;
        background: #6f1b9d;
    }

    .img-cont {
        background: #ffffff08;
        border-radius: 50%;
    }

    .showcase-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

    }

    img {
        object-fit: cover;
    }

    @media screen and (max-width: 600px) {
        .showcase-wrapper {
            flex-direction: column;
        }
        .showcase-image {
          order: 1;
        }
        .showcase-header {
          order: 2;
        }
        img{
            height: 200px;
        }
    }
</style>