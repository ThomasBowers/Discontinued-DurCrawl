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
                if (colleges[j].type !== "hill") {
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
            if(output[j].order === startC){
                slicemark = j;
            }
        }
        var first = output.slice(slicemark, output.length);
        var second = output.slice(0, slicemark);
        return first.concat(second);

    },
    getTimeArray: function (colleges, times) {
        var currentTime = new moment();
        currentTime.format('HH:mm');
        currentTime.hour(parseInt(colleges[colleges.length - 1].close));
        currentTime.minute(0);
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
