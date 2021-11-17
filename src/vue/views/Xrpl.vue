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
        <div class="col-md-6">
            <h2>login with xumm</h2>
            <div v-if="signin_request">
                <p><img :src="qr_png" style="width: 100%;" /></p>
                <!-- p><a class="btn btn-primary" :href="qr_link" target="_blank" role="button">Open Xumm</a></p -->
            </div>
            <p><a class="btn btn-primary" @click="signin" role="button" id="login">Log In</a></p>
        </div>
        <div class="col-md-6">
            <div class="h-100 p-5 rounded-3">
                <h2>Ledger {{ledger_index}}</h2>
                <div class="progress progress-striped active">
                    <div class="progress-bar progress-bar-success"
                        style="width:0%">
                    </div>
                </div>
                <ul class="list-group" v-for="oracle in oracle_data">
                    <li v-if="oracle.filteredMedian === undefined" class="list-group-item bg-purple">{{oracle.symbol}} <span class="float-end">-</span></li>
                    <li v-else class="list-group-item" :class="oracle.color_bg">
                        <a class="btn btn-dark" data-bs-toggle="collapse" :href="'#' + oracle.symbol" role="button" aria-expanded="false" aria-controls="collapseExample">XRP/{{oracle.symbol}}</a>
                        <span class="float-end">
                        {{numeralFormat(oracle.filteredMedian, '0,0[.]00000000')}}
                        <!--number
                            :ref="oracle.symbol"
                            :from="oracle.previous"
                            :to="oracle.filteredMedian"
                            :format="theFormat"
                            :duration="1"
                            easing="Power1.easeOut"/ -->
                        </span>
                        <div class="collapse" :id="oracle.symbol" >
                            <div class="card card-body">
                                <pre>{{oracle.meta}}</pre>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import { onUnmounted } from 'vue'

    let socket =  null

    export default {
        name: "Xrpl",
        stup() {
            onUnmounted(() => {
            })
        },
        data() {
            return {
                oracle_data: {},
                animate: true,
                client: null,
                ledger_index: null,
                qr_png: null,
                qr_link: null,
                signin_request: null
            }
        },
        async mounted() {
            socket = new WebSocket('ws://localhost:5000')
            this.connectWebsocket()
            
            const {data} = await this.axios.get('http://localhost:5000/api/v2/xumm-sign-in')
            this.signin_request = data
            console.log(data)
        },
        methods : {
            progressBar() {
                console.log('animate progressBar')
                this.animate = false
                $(".progress-bar").animate({
                    width: "100%"  
                }, 30000)
                setInterval(function(){ 
                    $(".progress-bar").animate({
                        width: "100%"  
                    }, 30000)
                }, 30000)
            },
            connectWebsocket() {
                const self = this
                socket.onopen = function (message) {
                    socket.send(JSON.stringify({
                        request: 'SUBSCRIBE',
                        message: self.key,
                        channel: 'oracles'
                    }))
                    console.log('sockets connected! :)')

                    socket.send(JSON.stringify({
                        request: 'SUBSCRIBE',
                        message: self.key,
                        channel: 'users'
                    }))

                    console.log('user signing connected! :)')
                }

                //Called when the websocket receives a message.
                socket.onmessage = function (message) {
                    const data  = JSON.parse(message.data)
                    if (data.oracles != null) {
                        //console.log(data.oracles)
                        self.fetchData(data.oracles)
                        if (self.animate) {
                            self.progressBar()
                        }
                    }
                    if (data.users != null) {
                        console.log('user signed in')
                        console.log(data.users)
                    }
                }

                socket.onerror = function (message) {
                    console.log("There was an error connection to socket websocket! :(")
                    console.log(message)
                    socket.close()
                }

                socket.onclose = function (message) {
                    console.log("socket disconnected!")
                }
            },
            fetchData : function(data) {
                if (data == null) { return {} }

                this.ledger_index = data.ledger_index
                const oracle = { 
                    'symbol': data.limited_amount.currency,
                    'filteredMedian': data.limited_amount.value,
                    'color_bg': 'bg-purple',
                    'meta': JSON.stringify(data.meta, undefined, 2)
                }
            
                
                if (this.oracle_data[oracle.symbol] != null) {
                    if (oracle.filteredMedian < this.oracle_data[oracle.symbol].filteredMedian)  {
                        oracle.color_bg = 'bg-pink'
                    }
                    else {
                        oracle.color_bg = 'bg-green'
                    }    
                }
                if (!('previous' in oracle)) {
                    oracle.previous = 0
                }
                
                this.oracle_data[oracle.symbol] = oracle
            },
            theFormat(number) {
                return number.toFixed(10);
            },
            async signin(event) {
                document.getElementById('login').classList.add('invisible')
                if (this.signin_request == null) {
                    console.log('get new sign in request from xumm!')

                    const {data} = await this.axios.get(this.connection.url + '/api/v2/xumm-sign-in')
                    this.signin_request = data
                    
                }
                this.qr_png = this.signin_request.created.refs.qr_png
                this.qr_link = this.signin_request.created.next.always
                this.suuid = this.signin_request.created.uuid

                console.log(this.signin_request)
                console.log(this.signin_request.created.uuid)
                console.log(this.suuid)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .bg-purple {
        background-color: #974CFF;
    }
    .bg-green {
        background-color: #00e56a;
    }
    .bg-pink {
        background-color: #FF1A8B;
    }
    .collapse {
        width: 100%;
    }
    .accordion-body pre {
        color: #974CFF;
    }
</style>
