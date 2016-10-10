var okCoinWebSocket = {};
okCoinWebSocket.init = function (uri, apiKey, secretKey) {
    this.wsUri = uri;
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.lastHeartBeat = new Date().getTime();
    this.overtime = 8000;

    okCoinWebSocket.websocket = new WebSocket(okCoinWebSocket.wsUri);

    okCoinWebSocket.websocket.onopen = function (evt) {
        onOpen(evt)
    };
    okCoinWebSocket.websocket.onclose = function (evt) {
        onClose(evt)
    };
    okCoinWebSocket.websocket.onmessage = function (evt) {
        onMessage(evt)
    };
    okCoinWebSocket.websocket.onerror = function (evt) {
        onError(evt)
    };

    //setInterval(checkConnect,5000);
}
function checkConnect() {
    websocket.send("{'event':'ping'}");
    if ((new Date().getTime() - okCoinWebSocket.lastHeartBeat) > okCoinWebSocket.overtime) {
        onsole.log("socket 连接断开，正在尝试重新建立连接");
        //testWebSocket();
    }
}
function onOpen(evt) {
    console.log("CONNECTED");
    // doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_depth_quarter_20'}");

    //********                            测试数据                                                                 *******/
    //////////////////现货行情//////////////////////////////////////////////////
    doSend("{'event':'addChannel','channel':'ok_sub_spotusd_btc_ticker'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_ltc_ticker'}");

    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_btc_depth_20'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_btc_depth_60'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_ltc_depth_20'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_ltc_depth_60'}");

    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_btc_trades'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_ltc_trades'}");

    //doSend("{'event':'addChannel','channel':'ok_btcusd_kline_3min'}");

    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_btc_kline_1min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_btc_kline_3min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_btc_kline_5min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_btc_kline_15min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_btc_kline_30min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_btc_kline_1hour'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_btc_kline_2hour'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_btc_kline_4hour'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_btc_kline_6hour'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_btc_kline_12hour'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_btc_kline_day'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_btc_kline_3day'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_btc_kline_week'}");

    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_ltc_kline_1min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_ltc_kline_3min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_ltc_kline_5min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_ltc_kline_15min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_ltc_kline_30min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_ltc_kline_1hour'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_ltc_kline_2hour'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_ltc_kline_4hour'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_ltc_kline_6hour'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_ltc_kline_12hour'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_ltc_kline_day'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_ltc_kline_3day'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_spotusd_ltc_kline_week'}");
    //////////////////现货行情//////////////////////////////////////////////////

    //////////////合约行情//////////////////////////////////////////////////////
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_ticker_this_week'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_ticker_next_week'}");
    doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_ticker_quarter'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_ltc_ticker_this_week'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_ltc_ticker_next_week'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_ltc_ticker_quarter'}");

    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_kline_this_week_1min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_kline_this_week_3min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_kline_this_week_5min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_kline_this_week_15min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_kline_this_week_30min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_kline_this_week_1hour'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_kline_this_week_2hour'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_kline_this_week_4hour'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_kline_this_week_6hour'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_kline_this_week_12hour'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_kline_this_week_day'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_kline_this_week_3day'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_kline_this_week_week'}");

    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_kline_next_week_1min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_kline_quarter_1min'}");

    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_ltc_kline_this_week_1min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_ltc_kline_next_week_1min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_ltc_kline_quarter_1min'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_depth_this_week_20'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_depth_this_week_60'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_depth_next_week_20'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_depth_next_week_60'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_depth_quarter_20'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_depth_quarter_60'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_ltc_depth_this_week_20'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_ltc_depth_this_week_60'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_ltc_depth_next_week_20'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_ltc_depth_next_week_60'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_ltc_depth_quarter_20'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_ltc_depth_quarter_60'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_trade_this_week'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_trade_next_week'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_trade_quarter'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_ltc_trade_this_week'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_ltc_trade_next_week'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_ltc_trade_quarter'}");

    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_btc_index'}");
    //doSend("{'event':'addChannel','channel':'ok_sub_futureusd_ltc_index'}");
    //////////////合约行情//////////////////////////////////////////////////////
}

function tradeTest() {
    //现货交易
    //spotTrade();
    //spotCancelOrder(100);
    //spotUserInfo();
    //spotOrderInfo();
    //spotTrades();
    //spotUserinfos();

    //合约交易
    //futureTrade();
    //futureCancelOrder(100);
    //futureUserInfo();
    //futureOrderInfo(100);
    //futureTrades();
    //futureUserinfos();
    //futurePositions();
}
function onClose(evt) {
    console.log("DISCONNECTED");
}
function onMessage(e) {
    if (!e || !e.data) return
    // console.log(new Date().getTime() + ": " + e.data)
    var array = JSON.parse(e.data)
    if (array.event == 'pong') {
        okCoinWebSocket.lastHeartBeat = new Date().getTime();
    } else {
        if (array.length <= 0) return
        var channel = array[0].channel
        var data = array[0].data
        if (!data) return
        if (channel === 'ok_sub_spotusd_btc_ticker') {
            $(document).trigger('ticker', data)
        } else if (channel === 'ok_sub_futureusd_btc_ticker_quarter') {
            $(document).trigger('ticker-quarter', data)
        }
    }
}
function onError(evt) {
    console.log('ERROR: ' + evt.data);
}
function doSend(message) {
    console.log("SENT: " + message);
    okCoinWebSocket.websocket.send(message);
}

//现货下单
function spotTrade() {
    var sign = MD5("amount=0.1&api_key=" + okCoinWebSocket.api_key
        + "&symbol=ltc_usd&type=sell_market&secret_key=" + okCoinWebSocket.secret_key);
    doSend("{'event':'addChannel','channel':'ok_spotusd_trade','parameters':{'api_key':'" + okCoinWebSocket.api_key
        + "','sign':'" + sign + "','symbol':'ltc_usd','type':'sell_market','amount':0.1}}");
}
//现货取消订单
function spotCancelOrder(orderId) {
    var sign = MD5("api_key=" + okCoinWebSocket.api_key + "&order_id=" + orderId
        + "&symbol=ltc_usd&secret_key=" + okCoinWebSocket.secret_key);
    doSend("{'event':'addChannel','channel':'ok_spotusd_cancel_order','parameters':{'api_key':'" + okCoinWebSocket.api_key
        + "','sign':'" + sign + "','symbol':'ltc_usd','order_id':'" + orderId + "'}}");
}
//现货个人信息
function spotUserInfo() {
    var sign = MD5("api_key=" + okCoinWebSocket.api_key + "&secret_key=" + okCoinWebSocket.secret_key);
    doSend("{'event':'addChannel','channel':'ok_spotusd_userinfo','parameters' :{'api_key':'"
        + okCoinWebSocket.api_key + "','sign':'" + sign + "'}}");
}

//查询订单信息
function spotOrderInfo() {
    var sign = MD5("api_key=" + okCoinWebSocket.api_key + "&order_id=20914907&secret_key=" + okCoinWebSocket.secret_key + "&symbol=ltc_usd");
    doSend("{'event':'addChannel','channel':'ok_spotusd_orderinfo','parameters' :{'api_key':'"
        + okCoinWebSocket.api_key + "','symbol':'ltc_usd','order_id':'20914907','sign':'" + sign + "'}}");
}
//订阅交易数据
function spotTrades() {
    var sign = MD5("api_key=" + okCoinWebSocket.api_key + "&secret_key=" + okCoinWebSocket.secret_key);
    doSend("{'event':'addChannel','channel':'ok_sub_spotusd_trades','parameters' :{'api_key':'"
        + okCoinWebSocket.api_key + "','sign':'" + sign + "'}}");
}
//订阅账户信息
function spotUserinfos() {
    var sign = MD5("api_key=" + okCoinWebSocket.api_key + "&secret_key=" + okCoinWebSocket.secret_key);
    doSend("{'event':'addChannel','channel':'ok_sub_spotusd_userinfo','parameters' :{'api_key':'"
        + okCoinWebSocket.api_key + "','sign':'" + sign + "'}}");
}
//合约下单
function futureTrade() {
    var sign = MD5("amount=1&api_key=" + okCoinWebSocket.api_key +
        "&contract_type=this_week&lever_rate=20&match_price=1&price=1.5&symbol=ltc_usd&type=0&secret_key=" + okCoinWebSocket.secret_key);
    doSend("{'event': 'addChannel','channel':'ok_futureusd_trade','parameters': {'api_key': '"
        + okCoinWebSocket.api_key + "','sign': '" + sign + "','symbol': 'ltc_usd','contract_type': 'this_week','amount': '1','price': '1.5','type': '0','match_price': '1','lever_rate': '20'}}");
}
//合约取消订单
function futureCancelOrder(orderId) {
    var sign = MD5("api_key=" + okCoinWebSocket.api_key + "&contract_type=this_week&order_id=" + orderId
        + "&symbol=ltc_usd&secret_key=" + okCoinWebSocket.secret_key);
    doSend("{'event': 'addChannel','channel': 'ok_futureusd_cancel_order','parameters': {'api_key': '"
        + okCoinWebSocket.api_key + "','sign': '" + sign + "','symbol': 'ltc_usd','order_id': '" + orderId
        + "','contract_type': 'this_week'}}");
}
//合约个人信息
function futureUserInfo() {
    var sign = MD5("api_key=" + okCoinWebSocket.api_key + "&secret_key=" + okCoinWebSocket.secret_key);
    doSend("{'event':'addChannel','channel':'ok_futureusd_userinfo','parameters' :{'api_key':'"
        + okCoinWebSocket.api_key + "','sign':'" + sign + "'}}");
}
//查询合约订单
function futureOrderInfo(orderId) {
    var sign = MD5("api_key=" + okCoinWebSocket.api_key + "&contract_type=this_week&current_page=1&order_id=" + orderId
        + "&page_length=1&symbol=ltc_usd&secret_key=" + okCoinWebSocket.secret_key + "&status=1");
    doSend("{'event': 'addChannel','channel': 'ok_futureusd_orderinfo','parameters': {'api_key': '"
        + okCoinWebSocket.api_key + "','sign': '" + sign + "','symbol': 'ltc_usd','order_id': '" + orderId
        + "','contract_type': 'this_week','status':'1','current_page':'1','page_length':'1'}}");
}

//订阅合约交易数据
function futureTrades() {
    var sign = MD5("api_key=" + okCoinWebSocket.api_key + "&secret_key=" + okCoinWebSocket.secret_key);
    doSend("{'event':'addChannel','channel':'ok_sub_futureusd_trades','parameters' :{'api_key':'"
        + okCoinWebSocket.api_key + "','sign':'" + sign + "'}}");
}

//订阅合约账户信息
function futureUserinfos() {
    var sign = MD5("api_key=" + okCoinWebSocket.api_key + "&secret_key=" + okCoinWebSocket.secret_key);
    doSend("{'event':'addChannel','channel':'ok_sub_futureusd_userinfo','parameters' :{'api_key':'"
        + okCoinWebSocket.api_key + "','sign':'" + sign + "'}}");
}

//订阅合约持仓信息
function futurePositions() {
    var sign = MD5("api_key=" + okCoinWebSocket.api_key + "&secret_key=" + okCoinWebSocket.secret_key);
    doSend("{'event':'addChannel','channel':'ok_sub_futureusd_positions','parameters' :{'api_key':'"
        + okCoinWebSocket.api_key + "','sign':'" + sign + "'}}");
}
okCoinWebSocket.init("wss://real.okcoin.com:10440/websocket/okcoinapi", "2e581185-de2b-46f8-8bb2-79b57c33dfde", "BB6349447B3F81EB3C87CD135318273F");