module.exports = {
    sort: function (colleges) {
        var output = [];

        for (var j = 0; j < colleges.length; j++) {
            output[colleges[j].order - 1] = colleges[j]
        }

        return output.filter(Boolean);
    },

    byType: function (colleges, location) {
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
        return output.filter(Boolean);
    },
    getTimeArray: function (colleges, times) {
        console.log(times[15][14]);
        console.log(colleges[15].order);

        var timeA = new Array(colleges.length);
        var sp, ep;
        for (var i = 0; i < timeA.length; i++) {
            timeA[i] = new Array(2);
        }
        var endTime = colleges[colleges.length-1].close;
        var currentTime = endTime;
        for (var j = colleges.length-1; j > 0; j--) {
            timeA[j][1] = currentTime;
            currentTime -= toTime(15);
            timeA[j][0] = currentTime;
            ep = parseInt(colleges[j].order)-1;
            sp = parseInt(colleges[j - 1].order)-1;
            console.log(sp);
            console.log(ep);
            currentTime -= toDec(times[ep][sp]);
            console.log(timeA)
        }
        return timeA
    }
};
function toTime(Dec) {
    return (Dec/60)*100;
}
function toDec(time) {
    return (time*0.6)
}