/**
 * Created by rdreimann on 23.06.15.
 */
var getAllMails = function () {
  var url = 'http://localhost:4000/mailapi/folders';
  console.log("axios: " + url);
  return axios.get(url);

}
