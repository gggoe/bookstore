<template>
    <div id="app">
        <Navbar></Navbar>
        <div class="container">
            <router-view>

            </router-view>
        </div>
    </div>
</template>

<script>
    import {Navbar} from './components'

    export default {
        name: 'app',
        components: {
            Navbar
        }
    }
</script>

<style>

</style>
