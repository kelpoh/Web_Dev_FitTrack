<script setup lang="ts">
  import session from "../stores/session";
  import { ref, reactive } from "vue";
  import { RouterLink } from "vue-router";
  import { getPosts, type Post } from "../stores/posts";

  const posts = reactive([] as Post[]);
  getPosts().then( x => posts.push(...x.posts));

</script>

<template>

  <!-- Direct user to login view if user is not logged in-->

  <section class="section is-medium">
    
    <div class="columns">

      <div class="column is-half is-offset-one-quarter">

        <div v-if="session.user == null" class="activity">
          <h1 class="box has-text-centered">
            Please <router-link to="/login"> log in </router-link>
            to see activity feed.
          </h1>
        </div>

        <!-- Generic post layout -->

        <div v-else class="card mt-4 mb-4" v-for="post in posts" :key="post._id">

          <div v-if="(post.postImg !== '' && post.postImg !== null && post.postImg !== undefined)" class="card-image">
            <figure class="image is-4by3">
              <img 
              :src="`data:image/png;base64,${post.postImg}`" 
              alt="Post image">
            </figure>
          </div>

          <div class="card-content">

            <div class="media">
              <div class="media-left">

                <figure v-if="(post.profileImg == null || post.profileImg == undefined || post.profileImg =='')" class="image is-48x48">
                  <img 
                    class="is-rounded" 
                    src="@/assets/images/avatar.png" 
                    alt="Profile Picture"
                  />
                </figure>

                <figure v-else class="image is-48x48">
                  <img class="is-rounded" :src="`data:image/png;base64,${post.profileImg}`" alt="Profile Picture" />
                </figure>

              </div>

              <div class="media-content">
                <p class="title is-4">{{ post.displayName }}</p>
                <p class="subtitle is-6 has-text-grey"> @{{ post.username }}</p>
              </div>
            </div>

            <div class="content">
              <p class="ml-2">
                {{ post.postText }}
                <a 
                  v-if="(post.postTag !=='' && post.postTag !== null)" 
                  class="has-text-info-dark">#{{ post.postTag }}
                </a>
              </p>
              <p class="ml-2 has-text-grey is-size-7"> 
                {{ post.timeDate }}
              </p>
            </div>

            <nav class="level">
              <div class="level-left">
                <a class="level-item" aria-label="like">
                    <span class="icon is-small">
                      <i class="fas fa-heart" aria-hidden="true"></i>
                    </span>
                </a>
              </div>

              <div class="level-right">
                <button class="delete is-small" aria-label="delete"></button>
              </div>
            </nav>

          </div>

          <!-- End post layout-->

        </div>
      </div>
    </div>
  </section>
</template>