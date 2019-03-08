var moment = require('moment');
module.exports = {
    sort: function (colleges) {
        var output = [];

        for (var j = 0; j < colleges.length; j++) {
            output[colleges[j].order - 1] = colleges[j]
        }
        return output.filter(Boolean);

    },

    byType: function (colleges, location, startC) {
        var output = [];
        if (location === "all") {
            for (var j = 0; j < colleges.length; j++) {
                output[colleges[j].order - 1] = colleges[j]
            }
        } else if (location === "plus") {
            for (var j = 0; j < colleges.length; j++) {
                if (colleges[j].type !== "Hill") {
                    output[colleges[j].order - 1] = colleges[j]
                }
            }
        } else {
        }
        for (var j = 0; j < colleges.length; j++) {
            if (colleges[j].type === location) {
                output[colleges[j].order - 1] = colleges[j]
            }
        }
        output = output.filter(Boolean);
        var slicemark;
        for (var j = 0; j < output.length; j++) {
            if (output[j].order === startC) {
                slicemark = j;
            }
        }
        var first = output.slice(slicemark, output.length);
        var second = output.slice(0, slicemark);
        return first.concat(second);

    },
    openClose: function (colleges) {
        let openings = [[], []];
        for (let x = 0; x < colleges.length; x++) {
            openings[0].push();
            openings[1].push();
        }
        let tOpen, tClose, tString;
        for (let x = 0; x < colleges.length; x++) {
            tOpen = this.convertTime(colleges[x].open);
            tClose = this.convertTime(colleges[x].close);
            if (tOpen.hour() === 0) {
                if (tOpen.minute() === 0) {
                    tString = "00:00"
                } else {
                    tString = String("00:" + tOpen.minute())
                }
            } else if (tOpen.minute() === 0) {
                tString = String(tOpen.hour() + ":00");
            } else {
                tString = String(tOpen.hour() + ":" + tOpen.minute());
            }
            openings[0][x] = tString;
            if (tClose.hour() === 0) {
                if (tClose.minute() === 0) {
                    tString = "00:00"
                } else {
                    tString = String("00:" + tClose.minute())
                }
            } else if (tClose.minute() === 0) {
                tString = String(tClose.hour() + ":00");
            } else {
                tString = String(tClose.hour() + ":" + tClose.minute());
            }
            openings[1][x] = tString;
        }
        return openings
    },
    convertTime: function (rawtime) {
        var time = new moment();
        time.format('HH:mm');
        time.hour(parseInt(rawtime));
        time.minute((rawtime - parseInt(rawtime)) * 60);
        return time
    },
    getTimeArray: function (colleges, times) {
        let currentTime = this.convertTime(colleges[colleges.length - 1].close);
        var timeA = new Array(colleges.length);
        for (var i = 0; i < timeA.length; i++) {
            timeA[i] = new Array(3);
        }
        var walkTime;
        for (var j = colleges.length - 1; j >= 0; j--) {
            if (currentTime.minute() < 10) {
                timeA[j][1] = String(currentTime.hour() + ":0" + currentTime.minute());

            } else {
                timeA[j][1] = String(currentTime.hour() + ":" + currentTime.minute());
            }
            currentTime.subtract(15, "m");
            if (currentTime.minute() < 10) {
                timeA[j][0] = String(currentTime.hour() + ":0" + currentTime.minute());

            } else {
                timeA[j][0] = String(currentTime.hour() + ":" + currentTime.minute());
            }
            if (j === colleges.length - 1) {
                timeA[j][3] = 0
            } else {
                timeA[j][3] = walkTime
            }
            if (j !== 0) {
                walkTime = times[colleges[j].order - 1][colleges[j - 1].order - 1];
            }

            currentTime.subtract(walkTime, "m");
        }
        return timeA
    },
    walkTime: function (colleges, times) {
        let totalWalk = 0;
        for (let j = colleges.length - 1; j >= 0; j--) {
            totalWalk += times[colleges[j].order - 1][colleges[j - 1].order - 1];
        }
        return totalWalk
    },
    getTimeArraySS: function (colleges, times, start) {
        let startTime = this.convertTime(start);
        let totalWalk = this.walkTime(colleges, times);
        startTime.add(totalWalk, "m");
        let currentTime = this.convertTime(colleges[colleges.length - 1].close);
        var timeA = new Array(colleges.length);
        for (let i = 0; i < timeA.length; i++) {
            timeA[i] = new Array(3);
        }
        for (let j = colleges.length - 1; j >= 0; j--) {
            if (currentTime.minute() < 10) {
                timeA[j][1] = String(currentTime.hour() + ":0" + currentTime.minute());

            } else {
                timeA[j][1] = String(currentTime.hour() + ":" + currentTime.minute());
            }
            currentTime.subtract(15, "m");
            if (currentTime.minute() < 10) {
                timeA[j][0] = String(currentTime.hour() + ":0" + currentTime.minute());

            } else {
                timeA[j][0] = String(currentTime.hour() + ":" + currentTime.minute());
            }
            if (j === colleges.length - 1) {
                timeA[j][3] = 0
            } else {
                timeA[j][3] = walkTime
            }
            if (j !== 0) {
                walkTime = times[colleges[j].order - 1][colleges[j - 1].order - 1];
            }

            currentTime.subtract(walkTime, "m");
        }
        return timeA
    },
    getTimeArray2: function (colleges, times, startC) {
        var currentTime = new moment();
        currentTime.format('HH:mm');
        currentTime.hour(parseInt(colleges[colleges.length - 1].close));
        currentTime.minute(0);
        var timeA = new Array(colleges.length);
        for (var i = 0; i < timeA.length; i++) {
            timeA[i] = new Array(3);
        }
        var walkTime;
        for (var j = startC - 1; j >= 0; j--) {
            if (currentTime.minute() < 10) {
                timeA[j][1] = String(currentTime.hour() + ":0" + currentTime.minute());

            } else {
                timeA[j][1] = String(currentTime.hour() + ":" + currentTime.minute());
            }
            currentTime.subtract(15, "m");
            if (currentTime.minute() < 10) {
                timeA[j][0] = String(currentTime.hour() + ":0" + currentTime.minute());

            } else {
                timeA[j][0] = String(currentTime.hour() + ":" + currentTime.minute());
            }
            if (j === startC - 1) {
                timeA[j][3] = 0
            } else {
                timeA[j][3] = walkTime
            }
            if (j !== 0) {
                walkTime = times[colleges[j].order - 1][colleges[j - 1].order - 1];
            }

            currentTime.subtract(walkTime, "m");
        }
        for (var j = colleges.length - 1; j >= startC; j--) {
            if (currentTime.minute() < 10) {
                timeA[j][1] = String(currentTime.hour() + ":0" + currentTime.minute());

            } else {
                timeA[j][1] = String(currentTime.hour() + ":" + currentTime.minute());
            }
            currentTime.subtract(15, "m");
            if (currentTime.minute() < 10) {
                timeA[j][0] = String(currentTime.hour() + ":0" + currentTime.minute());

            } else {
                timeA[j][0] = String(currentTime.hour() + ":" + currentTime.minute());
            }
            if (j === colleges.length - 1) {
                timeA[j][3] = 0
            } else {
                timeA[j][3] = walkTime
            }
            if (j !== 0) {
                walkTime = times[colleges[j].order - 1][colleges[j - 1].order - 1];
            }

            currentTime.subtract(walkTime, "m");
        }
        return timeA
    },
};
