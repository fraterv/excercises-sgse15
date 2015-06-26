/**
 * Created by rdreimann on 23.06.15.
 */
var getAllMails = function () {
  var url = 'http://localhost:4000/mailapi/folders';
  console.log("axios: " + url);
  return axios.get(url);

}

var deleteFolder = function(folder) {
  var url = 'http://localhost:4000/mailapi/deletefolder/'+folder;
  console.log("axios::deleteFolder: "+url);
  return axios.delete(url);
}

var updateFolderName= function(oldname, newname) {
  var url = 'http://localhost:4000/mailapi/updfoldername/'+oldname;
  var para = {folder: newname};
  console.log("axios::updateFolderName: "+url +newname);

  return axios.put(url,para);
}


var getMailsByFolder = function(folder) {
  var url ='http://localhost:4000/mailapi/shbyfolder/'+folder;
  console.log("axios::getMailsByFolder: "+ url);
  return axios.get(url);
}


