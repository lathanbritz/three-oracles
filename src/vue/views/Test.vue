<template>
    <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center">
        <div class="col-md-5 p-lg-5 mx-auto my-5">
            <h1 class="display-4 fw-normal">XRPL ORACLES</h1>
            <p class="lead fw-normal">BY THREE</p>
            <!-- a class="btn btn-outline-secondary" href="#">Coming soon</a -->
        </div>
        <div class="product-device shadow-sm d-none d-md-block"></div>
        <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
    </div>
    <div class="row align-items-md-stretch">
        <div class="col-md-12">
            <div class="h-100 p-5 bg-dark text-white rounded-3">
                <h2>Test</h2>
                <pre>{{data}}</pre>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import { onUnmounted } from 'vue'
    // import { Client } from 'xrpl'

    export default {
        name: "Test",
        stup() {
            onUnmounted(() => {
            })
        },
        data() {
            return {
                data: null
            }
        },
        async mounted() {
            // const client = new Client('wss://xrplcluster.com')
            // console.log('connecting')
            // await client.connect()
            // console.log('connected')
            // this.data = await client.request({command: 'server_info'})
            // console.log(this.data)
            // console.log('disconnecting')
            // await client.disconnect()
            // console.log('disconnected')
        }
    }
</script>

<style lang="scss" scoped>
</style>
