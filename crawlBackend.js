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
        } else if (location === "Plus") {
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
    orderandtimes: function (colleges, times) {
        let drinksTime = 40;
        let timeArray = this.getTimeArray(colleges, times, drinksTime);
        console.log();
        console.log(timeArray);
        while (!this.checkValidity(colleges, timeArray) && drinksTime > 10) {
            while (!this.checkValidity(colleges, timeArray) && drinksTime > 10) {
                drinksTime -= 2;
                timeArray = this.getTimeArray(colleges, times, drinksTime);
         //       console.log('readycheck: ' + drinksTime)
            }
            if (this.checkValidity(colleges, timeArray)) {
          //      console.log('valid');
                //console.log('list of colleges');
                //console.log(colleges);
                //console.log(timeArray);
                let returner = [timeArray, colleges, drinksTime];
                return (returner)            }
            console.log('shuffling');
            drinksTime = 40;
            colleges = this.shuffle(colleges);
            timeArray = this.getTimeArray(colleges, times, drinksTime);
        }
        //console.log('valid instant');
        //console.log('list of colleges');
       // console.log(colleges);
        console.log(timeArray);
        let returner = [timeArray, colleges, drinksTime];
        return (returner)

    },
    totalTime: function (timeA) {
        let start = timeA[0][0];
        let fin = timeA[timeA.length - 1][1];
        if (fin === '0:00') {
            fin = '24:00'
        }
        let total = (60 * parseInt(fin.substring(0, 2)) - 60 * parseInt(start.substring(0, 2)) + parseInt(fin.substring(3, 5)) - parseInt(start.substring(3, 5)));
    //    console.log('total time :' + total);
        return total;
    },

    getBestValid: function (colleges, times, depth = 10) {
        let collegelist = [];
        let totals = [];
        collegelist.push(this.orderandtimes([...colleges], times));
        totals.push(this.totalTime(collegelist[0][0])-100*colleges.length*collegelist[0][2]);
        for(let i = 1; i < depth; i++){
            collegelist.push(this.orderandtimes(this.shuffle([...colleges]), times));
            let d = 100* colleges.length*collegelist[i][2];
            totals.push(this.totalTime(collegelist[i][0])-d);
        }
        console.log(totals);
        let min = totals.indexOf(Math.min(...totals));
     //   console.log(min);
        return collegelist[min];
    },
    shuffle: function (array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },
    getTimeArray: function (colleges, times, drinksTime) {
        let currentTime = this.convertTime(colleges[colleges.length - 1].close);
        //      console.log(currentTime.hours() + ':'+currentTime.minute());
        const timeA = new Array(colleges.length);
        for (let i = 0; i < timeA.length; i++) {
            timeA[i] = new Array(3);
        }
        let walkTime;
        for (let j = colleges.length - 1; j >= 0; j--) {
            if (currentTime.minute() < 10) {
                timeA[j][1] = String(currentTime.hour() + ":0" + currentTime.minute());

            } else {
                timeA[j][1] = String(currentTime.hour() + ":" + currentTime.minute());
            }
            currentTime.subtract(drinksTime, "m");
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
                //              console.log('current college :' + colleges[j].name + ' pos: ' + colleges[j].order);

                walkTime = times[colleges[j].order - 1][colleges[j - 1].order - 1]
                //          walkTime = times[colleges[colleges.length-j].order - 1][colleges[colleges.length-j - 1].order - 1];
            }

            currentTime.subtract(walkTime, "m");
            //         console.log(currentTime.hours() + ':'+currentTime.minute());

        }
        //   console.log(timeA);
        return timeA
    },
    walkTime: function (colleges, times) {
        let totalWalk = 0;
        for (let j = colleges.length - 1; j >= 0; j--) {
            totalWalk += times[colleges[j].order - 1][colleges[j - 1].order - 1];
        }
        return totalWalk
    },
    /**
     * @return {boolean}
     */
    StrTGeqIntT: function (timeStr, timeInt) {
        if (timeStr === '0:00') {
            timeStr = '24:00'
        }
        let strTotal = parseInt(timeStr.substring(0, 2)) + (parseFloat(timeStr.substring(3, 5) / 60));
        return strTotal >= timeInt;
    },
    /**
     * @return {boolean}
     */
    StrTGIntT: function (timeStr, timeInt) {
        if (timeStr === '0:00') {
            timeStr = '24:00'
        }
        let strTotal = parseInt(timeStr.substring(0, 2)) + (parseFloat(timeStr.substring(3, 5) / 60));
        return strTotal > timeInt;
    },
    checkValidity: function (colleges, timeA) {
        for (let x = 0; x < timeA.length; x++) {
            if (!this.StrTGeqIntT(timeA[x][0], colleges[x].open)) {
                return false
            } else if (this.StrTGIntT(timeA[x][1], colleges[x].close)) {
                return false
            }
        }
        return true
    }
};
