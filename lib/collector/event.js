module.exports = function Event(message) {
    var jsonMessage = JSON.parse(message);
    var timestamp = Math.round((new Date()).getTime() / 1000);
    var type = jsonMessage.type;
    var time = jsonMessage.time;
    var data = JSON.stringify(jsonMessage.data);

    this.getSqlRow = function () {
        return "(to_timestamp(" + timestamp + "),'" + type + "','" + time + "','" + data + "' )";
    }
}