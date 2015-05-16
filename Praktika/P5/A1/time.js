module.exports = {
  jsonSecMinHour : function() {
    var date = new Date();
    return {"hour": date.getHours(),
            "minute": date.getMinutes(),
            "second": date.getSeconds()};
  }
}
