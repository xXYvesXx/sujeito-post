<template>
  <div id="home">
    <div class="newpost">
      <h2>Bem vindo de volta!</h2>
      <span>Compartilhe seu dia</span>
      <textarea
        placeholder="O que está fazendo hoje?"
        row="15"
        v-model="input"
      ></textarea>
      <button @click="createPost">Compartilhar</button>
    </div>

    <div class="postarea loading" v-if="loading">
      <h2>Buscando posts...</h2>
    </div>

    <div class="postarea" v-else>
      <article class="post" v-for="post in posts" :key="post.id">
        <h1>{{ post.autor }}</h1>
        <p>{{ post.content | postLength }}</p>
        <div class="action-post">
          <button @click="likePost(post.id, post.likes)">
            {{ post.likes === 0 ? "Like" : post.likes + " Likes" }}
          </button>
          <button @click="togglePostModal(post)">Veja post completo</button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import firebase from "../services/firebaseConnection";

export default {
  name: "Home",
  data() {
    return {
      input: "",
      user: {},
      loading: true,
      posts: [],
      showPostModal: false,
      fullPost: {},
    };
  },
  async created() {
    const user = localStorage.getItem("devpost");
    this.user = JSON.parse(user);

    await firebase
      //está monitorando os posts
      .firestore()
      .collection("posts")
      .orderBy("created", "desc")
      .onSnapshot((doc) => {
        this.posts = [];

        doc.forEach((item) => {
          this.posts.push({
            id: item.id,
            autor: item.data().autor,
            content: item.data().content,
            likes: item.data().likes,
            created: item.data().created,
            userId: item.data().userId,
          });
        });
        this.loading = false;
        console.log(this.posts);
      });
  },
  methods: {
    async createPost() {
      // se não houver nada escrito,não irá fazer nada
      if (this.input === "") {
        return;
      }
      // caso contrário, irá criar o post no db
      await firebase
        .firestore()
        .collection("posts")
        .add({
          created: new Date(),
          content: this.input,
          autor: this.user.nome,
          userId: this.user.uid,
          likes: 0,
        })
        .then(() => {
          (this.input = ""), alert("POST CRIADO COM SUCESSO");
        })
        .catch((error) => {
          console.log("Error ao criar o post: " + error);
        });
    },

    async likePost(id, likes) {
      const userId = this.user.uid;
      const docId = `${userId}_${id}`;

      //Checkando se o post já foi curtido
      const doc = await firebase
        .firestore()
        .collection("likes")
        .doc(docId)
        .get();

      if (doc.exists) {
        await firebase
          .firestore()
          .collection("posts")
          .doc(id)
          .update({
            likes: likes - 1,
          });

        await firebase.firestore().collection("likes").doc(docId).delete();
        return;
      }

      await firebase.firestore().collection("likes").doc(docId).set({
        postId: id,
        userId: userId,
      });

      //Criar o like
      await firebase
        .firestore()
        .collection("posts")
        .doc(id)
        .update({
          likes: likes + 1,
        });
    },

    togglePostModal(post) {
      this.showPostModal = !this.showPostModal;

      if (this.showPostModal) {
        this.fullPost = post;
      } else {
        this.fullPost = {};
      }
    },
  },
  filters: {
    postLength(valor) {
      if (valor.length < 200) {
        console.log(valor);

        return valor;
      }

      return `${valor.substring(0, 200)}...`;
    },
  },
};
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: row;
  margin: 25px;
}

@import "./home.css";
</style>
