<template>
    <div class="card my-2">
        <!-- Language -->
        <h5 class="card-header">Filter by language:</h5>
        <div class="card-body" v-if="languages.length>0">
            <div class="form-check" v-for="item in languages" :key="item">
                  <input @change="$emit('languageFilter', checkedLanguages)" class="form-check-input" type="checkbox"
                  :id="item" :value="item" v-model="checkedLanguages">
                  {{ item }}
            </div>
        </div>

        <!-- Status -->
        <h5 class="card-header">Filter by status:</h5>
        <div class="card-body" v-if="showStatus.length>0">
            <div class="form-check" v-for="item in showStatus" :key="item">
                  <input @change="$emit('statusFilter', checkedStatus)" class="form-check-input" type="checkbox"
                  :id="item" :value="item" v-model="checkedStatus">
                  {{ item }}
            </div>
        </div>

        <!-- Genres -->
        <h5 class="card-header">Filter by genres:</h5>
        <div class="card-body" v-if="genres.length>0">
            <div class="form-check" v-for="item in genres" :key="item">
                <input @change="$emit('genresFilter', checkedGenres)" class="form-check-input" type="checkbox"
                :id="item" :value="item" v-model="checkedGenres">
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShowsFilter',
    data() {
        return {
            checkedStatus: [],
            checkedGenres: [],
            checkedLanguages: []
        };
    },
    props: [
        'showStatus',
        'genres',
        'languages'
    ],
    created() {

    },
}
</script>