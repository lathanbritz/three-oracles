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
            <div class="h-100 p-5 rounded-3">
                <h2>Oracle signals</h2>
                <p>Clone, deploy, configure. Your own oracle today.</p>
                <p>Libraries and services.</p>
                <br/>
                <p><strong>THIS SITE IS UNDER COMPLETE DEVELOPMENT AT THE MOMENT!</strong></p>
                <button class="btn btn-outline-light" type="button">Get Started</button>
            </div>
        </div>
        <div class="col-md-6">
            <div class="h-100 p-5 rounded-3">
                <h2>Feed your contracts</h2>
                <div class="progress progress-striped active">
                    <div class="progress-bar progress-bar-success"
                        style="width:0%">
                    </div>
                </div>
                

                <ul class="list-group" v-for="oracle in oracle_data">
                    <li v-if="oracle.filteredMedian === undefined" class="list-group-item bg-purple">{{oracle.symbol}} <span class="float-end">-</span></li>
                    <li v-else class="list-group-item" :class="oracle.color_bg">{{oracle.symbol}} <span class="float-end">
                        <vue3-autocounter ref='oracle.symbol' :startAmount='oracle.previous' :endAmount='oracle.filteredMedian' :duration='1' separator=',' decimalSeparator='.' :decimals='8' :autoinit='true' />
                        </span>
                    </li>
                </ul>
                <br/>
                <ul class="list-group" v-for="oracle in oracle_data_alts">
                    <li v-if="oracle.filteredMedian === undefined" class="list-group-item bg-purple">{{oracle.symbol}} <span class="float-end">-</span></li>
                    <li v-else class="list-group-item" :class="oracle.color_bg">{{oracle.symbol}} <span class="float-end">
                        <vue3-autocounter ref='oracle.symbol' :startAmount='oracle.previous' :endAmount='oracle.filteredMedian' :duration='1' separator=',' decimalSeparator='.' :decimals='8' :autoinit='true' />
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'

    let socket =  null

    export default {
        name: "Home",
        data() {
            return {
                oracle_data: {},
                oracle_data_alts: {},
                animate: true,
            }
        },
        async mounted() {
            socket = new WebSocket('ws://panicbot.app:7000')
            this.connectWebsocket()
        },
        methods : {
animateValue(id, start, end, duration) {
    // assumes integer values for start and end
    
    var obj = document.getElementById(id);
    var range = end - start;
    // no timer shorter than 50ms (not really visible any way)
    var minTimer = 50;
    // calc step time to show all interediate values
    var stepTime = Math.abs(Math.floor(duration / range));
    
    // never go below minTimer
    stepTime = Math.max(stepTime, minTimer);
    
    // get current time and calculate desired end time
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;
  
    function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(end - (remaining * range));
        obj.innerHTML = value;
        if (value == end) {
            clearInterval(timer);
        }
    }
    
    timer = setInterval(run, stepTime);
    run();
},
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
                        channel: 'currency'
                    }))
                    socket.send(JSON.stringify({
                        request: 'SUBSCRIBE',
                        message: self.key,
                        channel: 'alt'
                    }))
                    console.log('sockets connected! :)')
                }

                //Called when the websocket receives a message.
                socket.onmessage = function (message) {
                    const data  = JSON.parse(message.data)
                    //console.log(data)
                    if (data.currency != null) {
                        console.log(data.currency.symbol)
                        self.fetchData(data.currency)
                        if (self.animate) {
                            self.progressBar()
                        }
                    }
                    if (data.alt != null) {
                        console.log(data.alt.symbol)
                        self.fetchData(data.alt)
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
                const oracle = data.symbol
                

                data.color_bg = 'bg-purple'
                console.log('previous: ' + data.previous)

                if ('previous' in data) {
                    if (data.previous > data.filteredMedian) {
                        data.color_bg = 'bg-pink'
                    }
                    else {
                        data.color_bg = 'bg-green'
                    }
                }
                console.log(data.symbol + ':'+ data.type)
                if (data.type == 'currency') {
                    this.oracle_data[oracle] = data    
                }
                else {
                    this.oracle_data_alts[oracle] = data
                }
            },
            theFormat(number) {
                return number.toFixed(8);
            },
        }
    };
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
</style>
