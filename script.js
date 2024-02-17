let userBrowser = ""
let img
let $ = document
let bodyBackground = $.querySelector(".bodyBackground")
let city = $.querySelector(".city")
let temp = $.querySelector(".temp")
let weather = $.querySelector(".weather")
let weatherIcon = $.querySelector(".weatherIcon")
let secondsBox = $.querySelector(".secondsBox")
let minutesBox = $.querySelector(".minutesBox")
let hoursBox = $.querySelector(".hoursBox")
let date = $.querySelector(".date")
let batteryPercentage = $.querySelector(".batteryPercentage")
let chargeIcon = $.querySelector(".batteryBox i")
let colorBtns = $.querySelectorAll(".colorBtn")
let pathElem = $.querySelector("path")
let notSupportedBatteryInfo = $.querySelector(".notSupportedBatteryInfo")
let isCharging
let chargeIconFlag = true
let notSupportedBatteryInfoFlag = true


window.addEventListener("load", () => {
    specifyBrowser()
    batteryInfo()
    changingChargeIcon()
    weatherInfo()
    dateInfo()
    changeThem()
})


function findBrowser(browserName) {
    userBrowser = browserName
    img = $.querySelector(`.${userBrowser}`)
    img.style.cssText = "filter: none; animation: rotateImages infinite 2s alternate; top:25%; right:33%; width:7rem; height: 7rem;"

}
function specifyBrowser() {
    let useragent = window.navigator.userAgent
    if (useragent.match(/edg/i)) {
        findBrowser("edg")
    }
    else if (useragent.match(/fireFox/i)) {
        findBrowser("firefox")
    }
    else if (useragent.match(/opr/i)) {
        findBrowser("opr")
    }
    else if (useragent.match(/chrome/i)) {
        findBrowser("chrome")
    }
    else if (useragent.match(/safari/i)) {
        findBrowser("safari")
    }
    else {
        alert("خطا در تشخیص مرورگر")
    }
}



function changingChargeIcon(isCharging) {
    if (isCharging) {
        chargeIcon.style.cssText = "display: block;"

        setInterval(() => {
            if (chargeIconFlag) {
                chargeIcon.className = "bi bi-lightning fs-1"
                chargeIconFlag = false
            }
            else {
                chargeIcon.className = "bi bi-lightning-fill fs-1"
                chargeIconFlag = true
            }

        }, 2000);
        console.log("شارژر متصل شد");
    }
    else {
        chargeIcon.style.cssText = "display: none;"
        console.log("شارژر  کنده شد");
    }

}
function changingBatteryCharge() {
    window.navigator.getBattery().then(param => {
        changingChargeIcon(param.charging)
        bodyBackground.style.width = Math.floor(param.level * 100) + "%"
        batteryPercentage.innerHTML = Math.floor(param.level * 100) + "%"
    })
}
function batteryInfo() {
    if (window.navigator.getBattery) {
        changingBatteryCharge()
        window.navigator.getBattery().then(batteryInfo => {
            batteryInfo.addEventListener("levelchange", () => {
                changingBatteryCharge()
            })
        })

        window.navigator.getBattery().then(param => {
            param.addEventListener("chargingchange", function (event) {
                changingChargeIcon(event.currentTarget.charging)
            })
        })
    }
    else {
        notSupportedBatteryInfo.style.display = "block"
        setInterval(() => {
            if (notSupportedBatteryInfoFlag) {
                notSupportedBatteryInfo.style.opacity = 0.4
                notSupportedBatteryInfo.style.transition = "1s"
                notSupportedBatteryInfoFlag = !notSupportedBatteryInfoFlag
            }
            else {
                notSupportedBatteryInfo.style.opacity = 1
                notSupportedBatteryInfo.style.transition = "1s"
                notSupportedBatteryInfoFlag = !notSupportedBatteryInfoFlag
            }

        }, 1500);

    }
}



function weatherInfo() {
    let yourCity = window.prompt("please enter your city or country :)")
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${yourCity}&appid=74783a466a3b0113492b21e3b267334e`)
        .then(res => res.json())
        .then(data => {
            if (data.cod == 200) {
                city.innerHTML = data.sys.country + " , "
                city.innerHTML += data.name
                temp.innerHTML = Math.floor(data.main.temp - 273.15) + "°C"
                weather.innerHTML = data.weather[0].main
                weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon.slice(0, 2)}n@2x.png`
            }
            else {
                alert("city or country is incorrect :(")
            }
        })
}


function dateInfo() {
    let today, sec, min, h
    setInterval(() => {
        today = new Date
        sec = String(today.getSeconds())
        min = String(today.getMinutes())
        h = String(today.getHours())
        if (sec.length == 1 && min.length == 1 && h.length == 1) {
            secondsBox.innerHTML = "0" + sec
            minutesBox.innerHTML = "0" + min
            hoursBox.innerHTML = "0" + h
        }
        else if (sec.length == 2 && min.length == 1 && h.length == 1) {
            secondsBox.innerHTML = sec
            minutesBox.innerHTML = "0" + min
            hoursBox.innerHTML = "0" + h
        }
        else if (sec.length == 1 && min.length == 2 && h.length == 1) {
            secondsBox.innerHTML = "0" + sec
            minutesBox.innerHTML = min
            hoursBox.innerHTML = "0" + h
        }
        else if (sec.length == 1 && min.length == 1 && h.length == 2) {
            secondsBox.innerHTML = "0" + sec
            minutesBox.innerHTML = "0" + min
            hoursBox.innerHTML = h
        }
        else if (sec.length == 1 && min.length == 2 && h.length == 2) {
            secondsBox.innerHTML = "0" + sec
            minutesBox.innerHTML = min
            hoursBox.innerHTML = h
        }
        else if (sec.length == 2 && min.length == 1 && h.length == 2) {
            secondsBox.innerHTML = sec
            minutesBox.innerHTML = "0" + min
            hoursBox.innerHTML = h
        }
        else if (sec.length == 2 && min.length == 2 && h.length == 1) {
            secondsBox.innerHTML = sec
            minutesBox.innerHTML = min
            hoursBox.innerHTML = "0" + h
        }
        else if (sec.length == 2 && min.length == 2 && h.length == 2) {
            secondsBox.innerHTML = sec
            minutesBox.innerHTML = min
            hoursBox.innerHTML = h
        }

        date.innerHTML = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`


    }, 1000)

}


function changeCssVar(bodyColor, shadowColor, primaryColor) {
    document.documentElement.style.setProperty("--body-color", bodyColor)
    document.documentElement.style.setProperty("--shadow-color", shadowColor)
    document.documentElement.style.setProperty("--primary-color", primaryColor)
    console.log(pathElem);
    pathElem.setAttribute("fill", primaryColor)

}
function changeThem(params) {
    for (let colorBtn of colorBtns) {

        colorBtn.addEventListener("click", function (event) {
            colorBtns.forEach(function (btn) {
                if (btn.style.opacity == 1) {
                    btn.style.cssText = "opacity: 0.4;"
                }
            })
            event.target.style.cssText = "opacity: 1;"

            // red
            if (getComputedStyle(event.target).backgroundColor == "rgb(255, 0, 0)") {
                changeCssVar("#ffbfbf", "#ff00004a", "#ff1515")
            }
            // green
            else if (getComputedStyle(event.target).backgroundColor == "rgb(0, 128, 0)") {
                changeCssVar("#c4ffc5", "#0088024a", "#009402")
            }
            // blue
            else if (getComputedStyle(event.target).backgroundColor == "rgb(0, 0, 255)") {
                changeCssVar("#c1ccff64", "#0048ff44", "#006eff")
            }
            // orange
            else if (getComputedStyle(event.target).backgroundColor == "rgb(255, 165, 0)") {
                changeCssVar("#ff660064", "#ff852071", "#ff4d00")
            }
            // pink
            else if (getComputedStyle(event.target).backgroundColor == "rgb(255, 192, 203)") {
                changeCssVar("#ffd1d1", "#ff000040", "#ff5454")
            }
        })
    }
}



