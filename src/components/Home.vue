<template>
  <div>
    <section class="hero is-primary is-medium">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Github Cheatsheet Emoji
          </h1>
          <h2 class="subtitle">
            https://github.com/mfikria/github-emojis
          </h2>
        </div>
      </div>
    </section>
    <div class="container is-fullhd">
      <section class="section">
        <b-input v-model="keywords" size="is-large" placeholder="Search..." type="search" icon-pack="fas" icon="search" />
      </section>
      <section class="section">
        <div class="columns is-desktop is-multiline">
          <div
            v-for="(emoji) in filteredEmojis"
            :key="emoji.key"
            class="column is-3 is-half-mobile float-left cursor-pointer hover:bg-grey-lightest"
            @click="doCopy(`:${emoji.key}:`)">
            <div class="flex justify-center">
              <figure class="image is-64x64">
                <img :src="emoji.image">
              </figure>
            </div>
            <div class="text-center">
              :{{ emoji.key }}:
            </div>
          </div>
        </div>
        <div v-if="filteredEmojis.length === 0 && !isLoading" class="notification is-warning">
          <span v-if="keywords">No matching results</span>
          <span v-else>No data</span>
        </div>
        <div class="mt-10">
          <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  const axios = require('axios');
  export default {
    name: 'Home',
    data () {
      return {
        emojis: {},
        keywords: '',
        url: 'https://api.github.com/emojis',
        isLoading: true
      }
    },
    computed: {
      filteredEmojis () {
        const keys = Object.keys(this.emojis)
        return keys.filter(key => key.includes(this.keywords.toLowerCase().trim()))
          .map(key => ({key, image: this.emojis[key]}))
      }
    },
    mounted () {
      axios.get(this.url)
        .then(({ data }) => {
          this.emojis = data;
          this.isLoading = false;
        })
    },
    methods: {
      doCopy (text) {
        this.$copyText(text).then(() => {
          this.$toast.open('Copied!')
        })
      }
    }
  }
</script>
