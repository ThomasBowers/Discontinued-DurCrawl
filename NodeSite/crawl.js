/*Type is a string containing "bailey", "hill" or "other"*/
function getByType(type) {
    var allColleges = require('colleges.json');
    var collegeList = [];
    for (var i = 0; i < allColleges.length; i++) {
        if (allColleges[i][5] === type) {
            collegeList.push(allColleges[i])
        }
    }
    return collegeList
}
/*Gets college where the string name is the name of the college*/
function getByName(name) {
    var allColleges = require('colleges.json');
    for (var i = 0; i < allColleges.length; i++) {
        if (allColleges[i][0] === name) {
            return allColleges[i]
        }
    }
    return 0;
}