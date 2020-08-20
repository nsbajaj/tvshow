<template>
  <div>

    <!-- Runtime -->
    <div class="card my-2" v-if="runtime.length > 0">
      <h5 class="card-header">Filter by runtime:</h5>
      <div class="card-body">
        <!-- Consider adding a watch for user to not press enter everytime to search -->
        <div class="row">
          <div class="col-sm">
            <p>
              Runtime:
            </p>
          </div>
          <div class="col-sm">
            <input
              @change="$emit('runtimeFilter', checkedRuntime)"
              class="form-check-input"
              type="text"
              v-model="checkedRuntime"
              size="4"
              min="0"
              max="120"
            />
          </div>
        </div>

        <input
          @change="$emit('runtimeFilter', checkedRuntime)"
          type="range"
          class="custom-range"
          min="0"
          max="120"
          step="0.5"
          id="customRange3"
          v-model="checkedRuntime"
        />
        <div class="row">
          <div class="col-sm">
            1
          </div>
          <div class="col-sm text-right">
            120
          </div>
        </div>
      </div>
    </div>

    <!-- Show type -->
    <div class="card my-2">
      <h5 class="card-header">Filter by type:</h5>
      <div class="card-body" v-if="types.length > 0">
        <div class="form-check" v-for="item in types" :key="item">
          <input
            @change="$emit('typeFilter', checkedTypes)"
            class="form-check-input"
            type="checkbox"
            :id="item"
            :value="item"
            v-model="checkedTypes"
          />
          {{ item }}
        </div>
      </div>
    </div>

    <!-- Language -->
    <div class="card my-2">
      <h5 class="card-header">Filter by language:</h5>
      <div class="card-body" v-if="languages.length > 0">
        <div class="form-check" v-for="item in languages" :key="item">
          <input
            @change="$emit('languageFilter', checkedLanguages)"
            class="form-check-input"
            type="checkbox"
            :id="item"
            :value="item"
            v-model="checkedLanguages"
          />
          {{ item }}
        </div>
      </div>
    </div>

    <!-- Status -->
    <div class="card my-2">
      <h5 class="card-header">Filter by status:</h5>
      <div class="card-body" v-if="showStatus.length > 0">
        <div class="form-check" v-for="item in showStatus" :key="item">
          <input
            @change="$emit('statusFilter', checkedStatus)"
            class="form-check-input"
            type="checkbox"
            :id="item"
            :value="item"
            v-model="checkedStatus"
          />
          {{ item }}
        </div>
      </div>
    </div>

    <!-- Genres -->
    <div class="card my-2">
      <h5 class="card-header">Filter by genres:</h5>
      <div class="card-body" v-if="genres.length > 0">
        <div class="form-check" v-for="item in genres" :key="item">
          <input
            @change="$emit('genreFilter', checkedGenres)"
            class="form-check-input"
            type="checkbox"
            :id="item"
            :value="item"
            v-model="checkedGenres"
          />
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowsFilter",
  data() {
    return {
      checkedStatus: [],
      checkedGenres: [],
      checkedLanguages: [],
      checkedTypes: [],
      checkedRuntime: 0,
    };
  },
  props: { 
    showStatus: {
      default: null
    },
    genres: {
      default: null
    },
    languages: {
      default: null
    },
    types: {
      default: null
    },
    runtime: {
      default: 0
    }
  },
  created() {
  },
};
</script>
