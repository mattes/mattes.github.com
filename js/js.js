// get skype status
// https://gist.github.com/mattes/5253271
var getSkypeStatus = function(user, callback) {
  if(!user) throw new Error('missing user');
  var query = 'select * from skype.user.status where user="' + user + '";';
  $.getJSON('http://query.yahooapis.com/v1/public/yql?q=' + encodeURI(query + '&format=json&env=store://datatables.org/alltableswithkeys&callback=?'), 
  function(data){
    if(data.query.count > 0) {
      if(callback) return callback.call(null, data.query.results.result);
    } else {
      if(callback) return callback.call(null, false); 
    }
  });
}

// set skype status
var setSkypeStatus = function() {
  getSkypeStatus('mkadenbach', function(status){
    if(!status) {
      // try again every 4 seconds
      window.setTimeout(setSkypeStatus, 4000);
    }

    $('#skypeStatus').removeClass('online offline away icon-circle');
    if(status.status == 2) {
      $('#skypeStatus').addClass('online icon-circle').attr('title', 'i am online');
    } else if(status.status >= 3 && status.status <= 7) {
      $('#skypeStatus').addClass('away icon-circle').attr('title', 'i am away');
    } else {
      $('#skypeStatus').addClass('offline').attr('title', 'i am offline');
    }
  });
};


$(document).ready(function() {

  $('#m').attr('href', $.rotate13('znvygb:zngguvnf.xnqraonpu@tznvy.pbz')).append(
         $.rotate13('zngguvnf.xnqraonpu@tznvy.pbz'));

  if (navigator.userAgent.match(/iPhone|iPad/i)) {
    $('#s').attr('href', $.rotate13('fxlcr://zxnqraonpu')).append(
           $.rotate13('fxlcr/zxnqraonpu'));
  } else {
    $('#s').attr('href', $.rotate13('fxlcr:zxnqraonpu?pnyy')).append(
           $.rotate13('fxlcr/zxnqraonpu'));
  }

  window.setTimeout(function() {
    setSkypeStatus();
    window.setInterval(setSkypeStatus, 1000 * 60 * 3 /* 3 minutes */);
  }, 500);

});