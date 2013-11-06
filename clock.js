// Wait for the DOM to load, then bind some stuff
window.addEventListener("load", function() {
    var cc = function() {
        for (var i in arguments) {
            console.log(arguments[i])
        }
    }
    var clock = (function() {

        var self = this
        var hourLoop, minLoop, secLoop;
        var hours = 0, minutes = 0, seconds = 0;
        var views = {
            "hours" : document.querySelector(".js-hours"),
            "minutes": document.querySelector(".js-minutes"),
            "seconds": document.querySelector(".js-seconds")
        }

        var updateView = function(name, value) {
            if (arguments.length == 0) {
                for (var view in views) {
                    views[view].innerHTML = "00"
                }
            }
            else { 
                view = views[name]
                value = value < 10 ? "0" + value : value
                view.innerHTML = value
            }
        }

        var incrementHour = function() {
            hours++
            hours %= 12
            updateView("hours", hours)
        }

        var incrementMinute = function() {
            minutes++
            minutes %= 60
            updateView("minutes", minutes)
        }

        var incrementSecond = function() {
            seconds++
            seconds %= 60
            updateView("seconds", seconds)
        }

        var startLoops = function() {
            hourLoop = setInterval(incrementHour, 3600000)
            minLoop = setInterval(incrementMinute, 60000)
            secLoop = setInterval(incrementSecond, 1000)
        }

        var stopLoops = function() {
            clearInterval(secLoop)
            clearInterval(minLoop)
            clearInterval(hourLoop)
        }

        var reset = function() {
            stopLoops()
            hours = minutes = seconds = 0
            updateView()
        }

        return this.publics = {
            start: function() {
                startLoops();
                return this;
            },
            stop: function() {
                stopLoops();
                return this;
            },
            reset: function() {
                reset()
                return this;
            }
        }
    })()

    var startButton = document.querySelector(".js-start")
    var stopButton = document.querySelector(".js-stop")
    var resetButton = document.querySelector(".js-reset")

    startButton.addEventListener("click", clock.start)

    stopButton.addEventListener("click", clock.stop)

    resetButton.addEventListener("click", clock.reset)

})