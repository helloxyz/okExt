var isLock = false
var work_time_mode
var ticket_price_mode = 'normal'
var ticket_type_mode = 'buy'
var defaultCurrency = $('#inlineRadio11').val() == 0 ? 'usd' : 'cny'
var displayCurrency = 'cny'
var ticket_data

// elements

// data
var rate = 6.67
var spotLastPrice

// own create elements
var bid_element
var ask_element
var last_element
var lock_checkbox

initializeData()
initializeUI()

function initializeData() {
    // get exchange rate
    $.get('https://www.okcoin.com/api/v1/exchange_rate.do', function (res) {
        rate = JSON.parse(res).rate
    })
    $(document).on('ticker', function (e, data) {
        if (data && data.last) spotLastPrice = data.last
    })
}

function initializeUI() {
    var body = $('body')
    var ext = $('<div>')
    body.prepend(ext)
    bid_element = $('<input>', { id: 'ext-bid', class: 'ext-price', type: 'hidden' }).appendTo(ext)
    ask_element = $('<input>', { id: 'ext-ask', class: 'ext-price', type: 'hidden' }).appendTo(ext)
    last_element = $('<input>', { id: 'ext-last', class: 'ext-price', type: 'hidden' }).appendTo(ext)
    lock_checkbox = $('<input>', { id: 'ext-lock', type: 'checkbox', checked: false })
    work_time_mode = $('<input>', { id: 'ext-work-time-mode', type: 'checkbox', checked: true })
    ext.append($('<label>', { text: 'Lock', class: 'right-margin' }).prepend(lock_checkbox))
    ext.append($('<label>', { text: 'Work Time Mode', class: 'right-margin' }).prepend(work_time_mode))

    // ticket
    $('.submitBody ul').append($("<li id='ext-type-mode'></li>")
        .append($("<input>", { type: 'radio', name: 'typemode', value: 'buy', checked: true }))
        .append($("<span>", { class: 'right-margin', text: '买入' }))
        .append($("<input>", { type: 'radio', name: 'typemode', value: 'sell' }))
        .append($("<span>", { class: 'right-margin', text: '卖出' })))
    $('.submitBody ul').append($("<li id='ext-price-mode'></li>")
        .append($("<input>", { type: 'radio', name: 'pricemode', value: 'normal', checked: true }))
        .append($("<span>", { class: 'right-margin', text: '正常模式' }))
        .append($("<input>", { type: 'radio', name: 'pricemode', value: 'chase' }))
        .append($("<span>", { class: 'right-margin', text: '追入模式' }))
        .append($("<input>", { type: 'radio', name: 'pricemode', value: 'little' }))
        .append($("<span>", { class: 'right-margin', text: '挂单模式' }))
        .append($("<input>", { type: 'radio', name: 'pricemode', value: 'fish' }))
        .append($("<span>", { class: 'right-margin', text: '钓鱼模式' })))

    $(document).on('ticker-quarter', function (e, data) {
        ticket_data = data
        setTicket()
        setPrice()
    })

    lock_checkbox.change(function (e) {
        isLock = this.checked
    })
    work_time_mode.change(function () {
        applyMode(this.checked)
    })
    applyMode(true, true)
    applyPriceMode()

    setInterval(function () {
        updateAccountInfo()
    }, 1000 * 5)
}

function applyMode(isWorkTimeMode, isFirstLoad) {
    var hiddenItems = '.loaded-logo1,.nickNameTitle,.noticeTips,.importantNotice,.qqGroup,#allFooter,.nav1'
    if (isWorkTimeMode) {
        $(hiddenItems).hide()
        $('.button_green,.button_red,.solidButtonOne,.solidButtonTwo,.redBg,.greenBg,.nav_bg2').each(function () {
            $(this).attr('ori-class', $(this).attr('class'))
            $(this).attr('class', '')
        })
    } else {
        $(hiddenItems).show()
        $('[ori-class]').each(function () {
            $(this).attr('class', $(this).attr('ori-class'))
        })
    }
    if (isFirstLoad) {
        setTimeout(function () {
            $('.noticeTips,.importantNotice').hide()
        }, 1000 * 1);
    }
}

function applyPriceMode() {
    $('#ext-price-mode input').change(function () {
        ticket_price_mode = $(this).val()
        setTicket()
    })
    $('#ext-type-mode input').change(function () {
        ticket_type_mode = $(this).val()
        setTicket()
    })
}

function setTicket() {
    var futureTradePrice = $('#futureTradePrice')
    if (ticket_price_mode === 'normal') {
        futureTradePrice.val('')
    } else if (ticket_price_mode === 'chase') {
        if (ticket_type_mode === 'buy') {
            futureTradePrice.val((ticket_data.sell + 0.02).toFixed(2))
        } else {
            futureTradePrice.val((ticket_data.buy - 0.02).toFixed(2))
        }
    } else if (ticket_price_mode === 'fish') {
        if (ticket_type_mode === 'buy') {
            futureTradePrice.val((Math.floor(ticket_data.buy) + 0.02).toFixed(2))
        } else {
            futureTradePrice.val((Math.ceil(ticket_data.sell) - 0.02).toFixed(2))
        }
    } else if (ticket_price_mode === 'little') {
        if (ticket_type_mode === 'buy') {
            futureTradePrice.val((ticket_data.buy + 0.01).toFixed(2))
        } else {
            futureTradePrice.val((ticket_data.sell - 0.01).toFixed(2))
        }
    }
}

function updateAccountInfo() {
    var nav = $('.futureNav')
    if (!nav.hasClass('ext-initialized')) {
        nav.find('tr td').each(function () {
            $(this).append("<br />").append("<span class='ext-account highline'><span>")
        })
        nav.addClass('ext-initialized')
    }
    nav.find('tr td').each(function () {
        var value = $(this).find('span:first').text()
        if (value && value.substr(0, 1) === '฿') {
            $(this).find('.ext-account').text(getAmount(value, 'btc'))
        }
    })
}

// set price to input element
function setPrice() {
    if (!ticket_data) return
    if (work_time_mode) {
        $('.redBg,.greenBg').attr('class', '')
    }
    $('#futureHoldedEntrust').find('tr').each(function () {
        // price input
        var priceInput = $(this).find('.futurePriceInput')
        if (priceInput.length <= 0) return
        var type = $(this).attr('id').indexOf('buy') >= 0 ? 'buy' : 'sell'
        var price = 0
        if (type == 'buy') {
            price = Number(ticket_data.sell) - 0.01
        } else {
            price = Number(ticket_data.buy) + 0.01
        }
        if ($(this).find('.ext-amount-lock').length <= 0) {
            priceInput.parent('td').append("<input class='ext-amount-lock' type='checkbox'>")
        }
        if (!isLock && !$(this).find('.ext-amount-lock').prop('checked')) {
            priceInput.val(price.toFixed(2))
        }

        var priceCost = $(this).find("span[id$='PriceCost']")
        var priceCostTd = priceCost.parent('td')
        if (priceCostTd.find('.ext-price-cost').length <= 0) {
            priceCostTd.append("<br />")
            priceCostTd.append($("<span>", { class: 'ext-price-cost highline' }))
        }
        priceCostTd.find('.ext-price-cost').text(getAmount(priceCost.text()))

        // transaction fee
        var amount = $(this).find("span[id$='Amount']")
        var amountTd = amount.parent('td')
        if (amountTd.find('.ext-transaction-fee').length <= 0) {
            amountTd.append("<br />")
            amountTd.append($("<span>", { class: 'ext-transaction-fee highline' }))
        }
        amountTd.find('.ext-transaction-fee').text(getAmount(100 * amount.text() * 0.0003))


        // Profit
        var profit = $(this).find("td[id$='Profit']")
        if (profit.length > 0) {
            profit.text('')
            profit.append($("<span>", { id: profit.attr('id'), class: 'ext-profit-ori' }))
            profit.append("<br />")
            profit.append($("<span>", { class: 'ext-profit highline right-margin' }))
            profit.attr('id', '')
        }
        $(this).find('.ext-profit').text(getAmount($(this).find('.ext-profit-ori').text(), 'btc'))

        if ($(this).find('.ext-position-btn-td').length <= 0) {
            var btn = $('<input>', { type: 'button', value: '报价' })
            $(this).append($("<td class='ext-position-btn-td'></td>").append(btn))
            btn.click(function () {
                $(this).find('ext-position-lock-td input').attr('checked', false)
            })
        }
    })
}

function getAmount(amount, inCurrency, outCurrency) {
    if (typeof amount === 'string') {
        var first = amount.substr(0, 1)
        if (first === '฿' || first == '$' || first === '￥') {
            amount = amount.substring(1)
        }
    }
    inCurrency = inCurrency || defaultCurrency
    outCurrency = outCurrency || displayCurrency
    var usdAmount = amount
    if (inCurrency === 'cny') {
        usdAmount = amount / rate
    } else if (inCurrency === 'btc') {
        usdAmount *= spotLastPrice
    }
    if (outCurrency === 'usd') {
        return '$' + Number(usdAmount).toFixed(2)
    } else if (outCurrency === 'cny') {
        return '￥' + Number(usdAmount * rate).toFixed(2)
    } else if (outCurrency === 'btc') {

    }
}
