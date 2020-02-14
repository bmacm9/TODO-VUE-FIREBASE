<template lang="html">
<div class="row">

    <section class="register col-3 mx-auto">
        <form class="px-4 py-3">
            <div class="form-group">
                <label for="exampleDropdownFormEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" v-model="mail" @keyup.enter="registrar" />
            </div>
            <div class="form-group">
                <label for="exampleDropdownFormPassword1">Password</label><br/>
                <input type="password" placeholder="password" class="form-control" id="exampleDropdownFormPassword1" v-model="pass" @keyup.enter="iniciarSesion" />
            </div>
            <button type="button" class="mt-2 btn btn-primary" @click="registrar">Registrar</button>
        </form>

        <router-link to="/login">Login</router-link>
    </section>

</div>
</template>

<script lang="js">
import firebase from 'firebase'

export default {
    name: 'register',
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
        registrar() {
            firebase.auth().createUserWithEmailAndPassword(this.mail, this.pass)
                .then(() => this.$router.replace("/login"))
                .catch(() => alert("no se ha podido crear el perfil"))
        }
    },
    computed: {

    }
}
</script>

<style scoped>
.register {}
</style>
