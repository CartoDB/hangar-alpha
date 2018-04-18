const Backbone = require('backbone');
const $ = require('jquery');

module.exports = Backbone.View.extend({
  el: '.js-Navbar',

  events: {
    'click .js-Navbar-button': '_openMobileMenu'
  },

  initialize: function () {
    this.$navMobile = this.$('.js-Navbar-mobile');
    this.$navButton = this.$('.js-Navbar-button');
    this.$navLogo = this.$('.js-Navbar-logo');
    this.model = new Backbone.Model({ hidden: true });
    this.model.on('change:hidden', this._toggleNavbar, this);
    this._initShowConnected();
  },

  _onClickNavbarButton: function () {
    this.model.set('hidden', !this.model.get('hidden'));
  },

  _toggleNavbar: function () {
    const isHidden = this.model.get('hidden');

    this.$navMobile.toggleClass('is-active', !isHidden);
    $('body').toggleClass('u-overflow', !isHidden);
    $('.Announcement').display(isHidden);
    this._toggleViewportScrolling(!isHidden);
  },

  _openMobileMenu: function () {
    this.$navButton.toggleClass('open');
    this.$navLogo.toggleClass('open');
    this._onClickNavbarButton();
  },

  _toggleViewportScrolling: function (bool) {
    document.body.ontouchmove = function (e) {
      if (!bool) return true;
      e.preventDefault();
    };
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

  _isConnected: function(){
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

  _getBaseURL: function(){
    return decodeURIComponent(this._getCookieValue("_cartodb_base_url"));
  },

  _changeURLElement: function(elementId, url){
    var element = document.getElementById(elementId);
    element.href = url;
  },

  _changeTextElement: function(elementId, text){
    var element = document.getElementById(elementId);
    element.innerHTML = text;
  },

  _changeImageElement: function(elementId, imageUrl){
    var element = document.getElementById(elementId);
    element.src = imageUrl;
  },

  _setAccountLinks: function(){
    var baseURL = this._getBaseURL();
    this._changeURLElement("hangar-user-map-link", baseURL + "/dashboard");
    this._changeURLElement("hangar-user-dataset-link", baseURL + "/dashboard/datasets");
    this._changeURLElement("hangar-user-account-link", baseURL + "/profile");
    this._changeURLElement("hangar-user-subscription-link", baseURL + "/dashboard");
    this._changeURLElement("hangar-user-close-session-link", baseURL + "/logout");
  },


  _setUserData: function(data){
    this._changeImageElement("hangar-user-avatar", data.user_data.avatar_url);
    this._changeTextElement("hangar-user-fullname", data.user_data.name + " " + data.user_data.last_name);
    this._changeTextElement("hangar-user-email", data.user_data.email);
  },

  _updateUserData: function(){
    var apiUrl = this._getBaseURL() + "/api/v3/me";
    var ownClass = this;
    fetch(apiUrl, {
            method: 'GET',
            credentials: 'include'
          }
      ).then(function(response) {
        return response.json();
      }).then(function(jsonResponse) {
        ownClass._setUserData(jsonResponse)
      });
  },

  _updateUserInformation: function(){
    this._setAccountLinks();
    this._updateUserData();
  },

  _initShowConnected: function(){
    var showConnected = document.getElementsByClassName("js-Navbar--showConnected");
    var hideConnected = document.getElementsByClassName("js-Navbar--hideConnected");
    if (this._isConnected()){
      this._addClassToElementList(hideConnected, "Navbar-list--hide");
      this._removeClassFromElementList(showConnected, "Navbar-list--hide");
      this._updateUserInformation();
    } else {
      this._addClassToElementList(showConnected, "Navbar-list--hide");
      this._removeClassFromElementList(hideConnected, "Navbar-list--hide");
    }
  }
});
