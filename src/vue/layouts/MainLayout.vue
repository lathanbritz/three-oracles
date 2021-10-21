<template>
    <div class='dashboard dashboard-compact'>
        <Nav />

        <main class="container flex-shrink-0 mb-4">
            <router-view />
        </main>

        <footer class="container footer mb-2 mt-auto">
            <div class="border-top py-3 fs-6 text-center">
                Data provided from oracles powers on-chain financial instruments, amm's, contracts, cheques, loans, the list is endless.
            </div>
        </footer>
    </div>
    
</template>

<script>
    import Nav from "../components/Nav.vue"
    import Refs from "../components/Refs.vue"

    export default {
        name: "MainLayout",
        components: {
            Nav,
            Refs,
        },
    }
</script>

<style lang="scss" scoped>

</style>
