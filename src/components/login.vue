<template lang="html">
<div class="row">
    <section class="login col-3 mx-auto">
        <form class="px-4 py-3">
            <div class="form-group">
                <label for="exampleDropdownFormEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" v-model="mail" @keyup.enter="iniciarSesion" />
            </div>

            <div class="form-group">
                <label for="exampleDropdownFormPassword1">Password</label>
                <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password" v-model="pass" @keyup.enter="iniciarSesion" /><br />
            </div>

            <div class="form-group">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="dropdownCheck">
                    <label class="form-check-label" for="dropdownCheck">
                        Remember me
                    </label>
                </div>
            </div>
            <button type="button" class="btn btn-primary" @click="iniciarSesion" @keyup.enter="iniciarSesion">LogIn</button>
        </form>

        <router-link to="/register">Registrarse</router-link>

    </section>
</div>
</template>

<script lang="js">
import firebase from 'firebase'

export default {
    name: 'login',
    props: [],
    mounted() {

    },
    data() {
        return {
            mail: "",
            pass: ""
        }
    },
    methods: {
        iniciarSesion() {
            firebase.auth().signInWithEmailAndPassword(this.mail, this.pass)
                .then(() => this.$router.replace("/privado"))
                .catch(() => alert("Email o contraseña incorrecta"))
        }
    },
    computed: {}
}
</script>

<style scoped>
.login {}
</style>
