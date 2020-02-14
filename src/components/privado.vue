<template>
  <section>
    <nav class="navbar navbar-dark bg-primary">
      <router-link to="/privado" class="navbar-brand">Ejemplo Vue+Firebase</router-link>
      <div class="ml-auto">
        <p class="text-white navbar-brand mr-5">{{userMail}}</p>
        <button @click="logOut">Salir</button>
      </div>
    </nav>
    <div class="container">
      <div class="row mt-5">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-header">Agrega una nueva tarea</div>
            <div class="card-body">
              <form @submit.prevent="addNew">
                <div class="form-group">
                  <input
                    v-model="nuevaNota.Texto"
                    type="text"
                    placeholder="texto"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <input @change="subirArchivo" type="file" />
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary form-control">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="col-sm-8 text-center">
          <div class="card">
            <div class="card-header">Lista Tareas</div>
            <div class="card-body">
              <table class="table table-stripped table-border">
                <div v-for="nota in listaNotas" :key="nota.id">
                  <div class="card">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-2">{{nota.Texto}}</div>
                        <div class="col-4 text-secondary">{{nota.Autor}}</div>
                        <div class="col-3">
                          <a :href="nota.archivoSubir.url">{{nota.archivoSubir.name}}</a>
                        </div>
                        <div class="col-3">
                          <button class="btn btn-sm btn-danger" @click="borrar(nota.id)">Borrar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { db } from "../db.js";

import firebase from "firebase";

export default {
  components: {},
  name: "app",
  data: function() {
    return {
      listaNotas: [],
      nuevaNota: {
        Texto: "",
        Autor: "",
        archivoSubir: {
          name: "",
          url: ""
        }
      }
    };
  },

  firestore: {
    listaNotas: db.collection("listaNotas")
  },
  methods: {
    subirArchivo(e) {
      this.nuevaNota.archivoSubir = e.target.files[0];
      firebase
        .storage()
        .ref(this.nuevaNota.archivoSubir.name)
        .put(this.nuevaNota.archivoSubir);
    },
    addNew: function() {
      console.log(
        "puede que tengas que pulsar el boton dos veces para subir archivo"
      );
      //var storageRef = firebase.storage().ref();
      firebase
        .storage()
        .ref(this.nuevaNota.archivoSubir.name)
        .getDownloadURL()
        .then(url => {
          this.nuevaNota.archivoSubir.url = url;
          db.collection("listaNotas").add({
            Texto: this.nuevaNota.Texto,
            Autor: firebase.auth().currentUser.email,
            archivoSubir: {
              name: this.nuevaNota.archivoSubir.name,
              url: this.nuevaNota.archivoSubir.url
            }
          });
        });
    },

    borrar: function(id) {
      db.collection("listaNotas")
        .doc(id)
        .delete();
    },

    logOut: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/login");
        });
    }
  },
  computed: {
    userMail: function() {
      return firebase.auth().currentUser.email;
    }
  }
};
</script>

<style>
</style>
