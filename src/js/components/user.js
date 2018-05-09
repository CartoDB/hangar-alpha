const Backbone = require('backbone');

module.exports = Backbone.View.extend({
  initialize: function () {
    this.userInformation = null;
    // this._initShowConnected();
    this._initUserStatus();
  },

  _getCookieValue: function(cookieName){
    var cookies = document.cookie.split("; ");
    for(var i = 0; i < cookies.length; i++){
      var keyValue = cookies[i].split("=");
      if(keyValue[0] == cookieName)
        return keyValue[1];
    }
    return null;
  },

  isConnected: function(){
    if(this._getCookieValue("_cartodb_base_url"))
      return true;
    return false;
  },
  
  _addClassToElementList: function(elementList, className){
    for(var i = 0; i < elementList.length; i++)
      elementList[i].classList.add(className);
  },

  _removeClassFromElementList: function(elementList, className){
    for(var i = 0; i < elementList.length; i++)
      elementList[i].classList.remove(className);
  },

  getBaseURL: function(){
    return decodeURIComponent(this._getCookieValue("_cartodb_base_url"));
  },

  _changeURLElement: function(element, url){
    if (element)
      element.href = url;
  },

  _changeTextElement: function(element, text){
    if (element)
      element.innerHTML = text;
  },

  _changeImageElement: function(element, imageUrl){
    if (element)
      element.src = imageUrl;
  },

  _setBaseurlLinks: function(){
    var elements = document.getElementsByClassName("js-user-information");
    for (var i = 0; i < elements.length; i++){
      var dataset = elements[i].dataset;
      if(dataset.addbaselink){
        this._changeURLElement(elements[i], this.getBaseURL() + "/" + dataset.addbaselink)
      }
    }
  },

  _setUserInfo: function(){
    var elements = document.getElementsByClassName("js-user-information");
    for (var i = 0; i < elements.length; i++){
      var dataset = elements[i].dataset;
      if(dataset.addusertext){
        this._changeTextElement(elements[i], this.userInformation.user_data[dataset.addusertext])
      }
      if (dataset.adduserimage){
        this._changeImageElement(elements[i], this.userInformation.user_data[dataset.adduserimage])
      }
    }
  },

  // _updateUserData: function(){
  //   var apiUrl = this.getBaseURL() + "/api/v3/me";
  //   var ownClass = this;
  //   fetch(apiUrl, {
  //           method: 'GET',
  //           credentials: 'include'
  //         }
  //     ).then(function(response) {
  //       return response.json();
  //     }).then(function(jsonResponse) {
  //       ownClass.userInformation = jsonResponse;
  //       ownClass._setUserInfo();
  //     });
  // },

  _updateUserInformation: function(){
    this._setBaseurlLinks();
    // this._updateUserData();
  },

  _initUserStatus: function(){
    if(!this.isConnected())
      this._initDisconnectedSettings();
    else {
      var apiUrl = this.getBaseURL() + "/api/v3/me";
      var ownClass = this;
      fetch(apiUrl, {
              method: 'GET',
              credentials: 'include'
            }
      ).then(function(response) {
        if (!response.ok)
          throw Error(response.statusText);
        return response.json();
      }).then(function(jsonResponse) {
        ownClass.userInformation = jsonResponse;
        if(jsonResponse.user_data){
          ownClass._initConnectedSettings()
          ownClass._setUserInfo();
        }
        else
        {
          ownClass._initDisconnectedSettings();
        }
      }).catch(function(error) {
        ownClass._initDisconnectedSettings();
      });
    }
  },

  _initConnectedSettings: function(){
    var showConnected = document.getElementsByClassName("js-User--showConnected");
    var hideConnected = document.getElementsByClassName("js-User--hideConnected");
    this._addClassToElementList(hideConnected, "User-element--hide");
    this._removeClassFromElementList(showConnected, "User-element--hide");
    this._updateUserInformation();
    if(typeof ga !== 'undefined'){
      ga('send', 'event', 'UserState', 'pageview', "Connected");
    }
  },

  _initDisconnectedSettings: function(){
    var showConnected = document.getElementsByClassName("js-User--showConnected");
    var hideConnected = document.getElementsByClassName("js-User--hideConnected");
    this._addClassToElementList(showConnected, "User-element--hide");
    this._removeClassFromElementList(hideConnected, "User-element--hide");
    if(typeof ga !== 'undefined'){
      ga('send', 'event', 'UserState', 'pageview', "Disconnected");
    }
  },

  // _initShowConnected: function(){
  //   this._initUserStatus()
  // }
});
