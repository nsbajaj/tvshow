<template>
    <h1 style="padding-top:100px;">{{ show.show.id }}</h1>
</template>

<script>

export default {
    name: 'show',
     props: [
        'show'
    ],
    created() {
        //console.log("Shows component");
  },
}
</script>