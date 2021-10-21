<template>
    <header class="header" id="header">
        <div class="header_toggle"> <i class='bx bx-menu' id="header-toggle"></i> </div>
    </header>
    <div class="l-navbar" id="nav-bar">
        <nav class="nav">
            <div> 
                <router-link :to="routes[0].path" class="nav_link" :title="routes[0].name" :class="{ active: isActive(routes[0].path) }">
                    <i class="bx bx-tone nav_icon" v-if="routes[0].path === '/'"></i> <span class="nav_name">Main</span>
                    {{ routes[0].path !== "/" ? routes[0].name : "" }}
                </router-link>
                <div class="nav_list">
                    <router-link :to="routes[1].path" class="nav_link" :title="routes[1].name" :class="{ active: isActive(routes[1].path) }">
                        <i class="bx bx-trip nav_icon" v-if="routes[1].path === '/monitor'"></i> <span class="nav_name">Monitor</span>
                        {{ routes[1].path !== "/monitor" ? routes[1].name : "" }}
                    </router-link>
                    <router-link :to="routes[2].path" class="nav_link" :title="routes[2].name" :class="{ active: isActive(routes[2].path) }">
                        <i class="bx bx-x nav_icon" v-if="routes[2].path === '/xrpl'"></i> <span class="nav_name">XRPL</span>
                        {{ routes[2].path !== "/xrpl" ? routes[2].name : "" }}
                    </router-link>
                </div>
            </div> 
            
            <a @click="logout" v-if="access === true" class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">SignOut</span> </a>
        </nav>
    </div>
</template>

<script>
    import $ from 'jquery'
    import { computed } from "vue"
    import { useRouter } from "vue-router"
    import { routes as rts } from "../router"

    export default {
        data() {
            return {
                access: null
            }
        },
        setup() {
            const routes = rts
            const router = useRouter()
            const activeRoute = computed(() => router.currentRoute.value.path)
            const isActive = (path) => path === activeRoute.value
            const path = activeRoute.value
            const pathName = computed(() => router.currentRoute.value.name)

            return { isActive, routes, path, pathName }
        },
        mounted() {
            const mobileScreen = window.matchMedia("(max-width: 990px )")

            if (this.pathName === 'Home') {
                // console.log('adding black')
                document.body.classList.add('text-white', 'bg-dark', 'front')
            }

            const showNavbar = (toggleId, navId, bodyId, headerId) => {
                const toggle = document.getElementById(toggleId),
                nav = document.getElementById(navId),
                bodypd = document.getElementById(bodyId),
                headerpd = document.getElementById(headerId)

                // Validate that all variables exist
                if(toggle && nav && bodypd && headerpd){
                    toggle.addEventListener('click', ()=>{
                        console.log('clickeeedd')
                        // show navbar
                        nav.classList.toggle('show')
                        // change icon
                        toggle.classList.toggle('bx-x')
                        // add padding to body
                        bodypd.classList.toggle('body-pd')
                        // add padding to header
                        headerpd.classList.toggle('body-pd')
                    })
                }
            }

            showNavbar('header-toggle','nav-bar','body-pd','header')

            /*===== LINK ACTIVE =====*/
            const linkColor = document.querySelectorAll('.nav_link')

            function colorLink(){
                if (linkColor){
                    linkColor.forEach(l=> l.classList.remove('active'))
                    this.classList.add('active')
                }
            }
            linkColor.forEach(l=> l.addEventListener('click', colorLink))
        },
        updated() {
            document.body.classList.remove('text-white', 'bg-dark', 'front')
            if (this.pathName === 'Home') {
                document.body.classList.add('text-white', 'bg-dark', 'front')
            }
        },
        destroyed () {
            console.log('destroyed')
            document.body.classList.remove('text-white', 'bg-dark', 'front')
        },
    }
</script>

<style lang="scss" scoped>
    i.bx-x {
        font-size: 2rem;
        margin-left: -0.5rem;
    }
</style>
