<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      class="carousel"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide img-blank img-alt="Blank image">
        <template v-slot:img>
          <img
  class="d-block img-fluid w-100"
  :src="require('@/assets/img/products/cousscous.jpg')"
  alt="image slot"
/>


        </template>
        <h2>OUR COUSCOUS</h2>
        <p>
          With our fresh and high-quality fish, you can prepare a delicious fish couscous that will delight your guests. Thanks to our carefully selected fish, bring the authentic taste of the sea to your traditional dishes.
        </p>
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-blank img-alt="Blank image">
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            :src="require('@/assets/img/products/charmoula.jpg')"

            alt="image slot"
          />
        </template>
        <h2>OUR CHARMOULA</h2>
        <p>
          With our fresh and flavorful fish, create the perfect Charmoula, a traditional marinade bursting with Mediterranean flavors. Whether for grilling, baking, or stewing, our high-quality fish.
        </p>
      </b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide img-blank img-alt="Blank image">
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            :src="require('@/assets/img/products/ma9rouna.jpg')"
            alt="image slot"
          />
        </template>
        <h2>Pasta with Manani</h2>
        <p>
          With our premium Manani fish, prepare a delightful pasta dish that combines the rich flavors of the sea with the comforting taste of tradition. 
        </p>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide img-blank img-alt="Blank image">
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            :src="require('@/assets/img/products/resto.jpg')"
            alt="image slot"
          />
        </template>
        <h2>YOUR RESTAURANT</h2>
        <p>
          Enhance your restaurant's menu with a dish made from fresh, high-quality fish. Offer your customers an unforgettable culinary experience with the authentic taste of the sea
        </p>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    }
  }
};
</script>
<style scoped>
img {
  object-fit: cover;
  height: 600px;
  width: 100%;
}
.carousel h2 {
  text-shadow: -1px 0 #000000, 0 1px #050504, 0.5px 0 #3a261c, 0 -1px #24201b;
  background: #24201b38;
  padding: 20px 0;
}
</style>