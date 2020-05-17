<template>
    <h1 style="padding-top:100px;">{{ id }}</h1>
</template>

<script>

export default {
    name: 'show',
     props: [
        'id'
    ],
    created() {
        console.log("Shows component");
        console.log(this.id);
  },
}
</script>