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
            <h2>rURUD69hsgJYtrt1xJ4drhs45qRirg36CU</h2>
            <p>This data is pulled off the XRPL account <a href="https://testnet.xrpl.org/accounts/rURUD69hsgJYtrt1xJ4drhs45qRirg36CU">rURUD69hsgJYtrt1xJ4drhs45qRirg36CU</a> on the ledger close events.</p>
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
                        <vue3-autocounter ref='oracle.symbol' :startAmount='oracle.previous' :endAmount='oracle.filteredMedian' :duration='1' separator=',' decimalSeparator='.' :decimals='8' :autoinit='true' />
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
                qr_link: null
            }
        },
        async mounted() {
            socket = new WebSocket('wss://panicbot.app:5000')
            this.connectWebsocket()
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

                let code = data.limited_amount.currency
                if (code.length > 3) {
                    code = this.currencyHexToUTF8(code)
                }

                this.ledger_index = data.ledger_index
                const oracle = { 
                    'symbol': code,
                    'filteredMedian': data.limited_amount.value,
                    'color_bg': 'bg-purple',
                    'meta': JSON.stringify(data.meta, undefined, 2)
                }
            
                oracle.previous = 0
                oracle.filteredMedian = oracle.filteredMedian * 1
                if (this.oracle_data[oracle.symbol] != null) {
                    oracle.previous = this.oracle_data[oracle.symbol].filteredMedian * 1

                    if (oracle.filteredMedian < oracle.previous)  {
                        oracle.color_bg = 'bg-pink'
                    }
                    else {
                        oracle.color_bg = 'bg-green'
                    }
                }

                //console.log(oracle)
                this.oracle_data[oracle.symbol] = oracle
            },
            theFormat(number) {
                return number.toFixed(8)
            },
            currencyHexToUTF8(code){
                if(code.length === 3)
                    return code

                let decoded = new TextDecoder()
                    .decode(this.hexToBytes(code))
                let padNull = decoded.length

                while(decoded.charAt(padNull-1) === '\0')
                    padNull--

                return decoded.slice(0, padNull)
            },
            hexToBytes(hex){
                let bytes = new Uint8Array(hex.length / 2)

                for (let i = 0; i !== bytes.length; i++){
                    bytes[i] = parseInt(hex.substr(i * 2, 2), 16)
                }

                return bytes
            }
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
