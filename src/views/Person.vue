<template>
  <div class="container">
    <div class="row">
      <!-- Post Content Column -->
      <div class="col-lg-8" v-if="person">
        <!-- Title -->
        <h1 class="mt-4">{{ person.name }}</h1>

        <hr />

        <!-- Preview Image -->
        <img
          class="img-fluid rounded"
          v-if="person.image"
          :src="person.image.medium"
          :alt="person.name"
        />
        <img
          v-else
          class="mr-3 img-fluid rounded"
          src="https://lightwidget.com/wp-content/uploads/2018/05/local-file-not-found-295x300.png"
          :alt="person.name"
        />
        <hr />

        <!-- Post Content -->
        <p class="lead">
          Birthday: {{ person.birthday }}
        </p>

        <hr />

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur
          natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit
          illo dolorum ab tempora nihil dicta earum fugiat. Temporibus,
          voluptatibus.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos,
          doloribus, dolorem iusto blanditiis unde eius illum consequuntur neque
          dicta incidunt ullam ea hic porro optio ratione repellat perspiciatis.
          Enim, iure!
        </p>

        <blockquote class="blockquote">
          <p class="mb-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.
          </p>
          <footer class="blockquote-footer">
            Someone famous in
            <cite title="Source Title">Source Title</cite>
          </footer>
        </blockquote>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error,
          nostrum, aliquid, animi, ut quas placeat totam sunt tempora commodi
          nihil ullam alias modi dicta saepe minima ab quo voluptatem obcaecati?
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, dolor
          quis. Sunt, ut, explicabo, aliquam tenetur ratione tempore quidem
          voluptates cupiditate voluptas illo saepe quaerat numquam recusandae?
          Qui, necessitatibus, est!
        </p>

        <hr />

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Person",
  data() {
    return {
      person: null,
    };
  },
  props: ["id"],
  methods: {
    searchPerson: function(data) {
      if (data && String(data).trim().length > 0) {
        fetch("http://api.tvmaze.com/people/" + data)
          .then(function(response) {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response;
          })
          .then((response) => response.json())
          .then((data) => {
            this.person = data;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        //console.log("Please enter data");
      }
    },
  },
  created() {
    this.searchPerson(this.id);
  },
};
</script>
