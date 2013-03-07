$(document).ready(function() {


  $('#m').attr('href', $.rotate13('znvygb:zngguvnf.xnqraonpu@tznvy.pbz')).append(
         $.rotate13('zngguvnf.xnqraonpu@tznvy.pbz'));

  if (navigator.userAgent.match(/iPhone/i)) {
    $('#s').attr('href', $.rotate13('fxlcr://zxnqraonpu')).append(
           $.rotate13('fxlcr/zxnqraonpu'));
  } else {
    $('#s').attr('href', $.rotate13('fxlcr:zxnqraonpu?pnyy')).append(
           $.rotate13('fxlcr/zxnqraonpu'));
  }


  // set skype status
  var setSkypeStatus = function() {
    $.get('http://kb-server.de/skype-status', function(data, textStatus, s) {
      // 1 = offline
      // 2 = online
      // 3 = away
      // 4 = not available
      // 5 = Do Not Disturb
      // 7 = skype me        
      if(textStatus == 'success') {
        skypeStatus = parseInt(data, 10);
        console.log('skypeStatus:', skypeStatus);

        $('#skypeStatus').removeClass('online offline away');
        if(skypeStatus == 2) {
          $('#skypeStatus').addClass('online');
        } else if(skypeStatus >= 3 && skypeStatus <= 7) {
          $('#skypeStatus').addClass('away');
        } else {
          $('#skypeStatus').addClass('offline');
        }
      }
    }, 'jsonp');  
  };
  
  window.setTimeout(function() {
    setSkypeStatus();
    window.setInterval(setSkypeStatus, 1000 * 60 * 3 /* 3 minutes */);
  }, 4000);


});