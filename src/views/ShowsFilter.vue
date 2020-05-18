<template>
    <div class="card my-2">
        <h5 class="card-header">Filter by status:</h5>
        <div class="card-body">
            <div class="form-check" v-for="item in showStatus" :key="item.status">
                  <input @change="$emit('statusFilter', checkedStatus)" class="form-check-input" type="checkbox"
                  :id="item.status" :value="item.status" v-model="checkedStatus">
                  {{ item.status }}
            </div>
            <!-- <span>Checked names: {{ checkedStatus }}</span> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShowsFilter',
    data() {
        return {
            showStatus: [
                { status: 'Running' },
                { status: 'Ended' },
                { status: 'To Be Determined' },
                { status: 'In Development' }
            ],
            checkedStatus: []
        };
    }
}
</script>