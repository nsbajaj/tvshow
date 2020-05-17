<template>
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <router-link :to="{ path: '/' }" class="navbar-brand">tvshow</router-link>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
                <router-link :to="{ path: '/' }" class="nav-link" href="#">Home <span class="sr-only">(current)</span></router-link>
            </li>
            <!-- <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li> -->
            </ul>
            <form class="form-inline my-2 my-lg-0">
            <input v-model="input" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <router-link :to="{ path: '/' }">
                <button @click="$emit('search', input)" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </router-link>
            </form>
        </div>
    </nav>
</template>

<script>
export default {
    name: "navbar",
    data() {
        return {
          input: null  
        };
    }
}
</script>