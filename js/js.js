// get skype status
// https://gist.github.com/mattes/5253271
var getSkypeStatus = function(user, callback) {
  if (!user) throw new Error('missing user');
  var query = 'select * from skype.user.status where user="' + user + '";';
  $.getJSON('http://query.yahooapis.com/v1/public/yql?q=' + encodeURI(query + '&format=json&env=store://datatables.org/alltableswithkeys&callback=?'),
  function(data) {
    if (data.query.count > 0) {
      if (callback) return callback.call(null, data.query.results.result);
    } else {
      if (callback) return callback.call(null, false);
    }
  });
};

// set skype status
var setSkypeStatus = function() {
  getSkypeStatus('mkadenbach', function(status) {
    if (!status) {
      // try again every 4 seconds
      window.setTimeout(setSkypeStatus, 4000);
    }

    $('#skypeStatus').removeClass('online offline away icon-off');
    if (status.status == 2) {
      $('#skypeStatus').addClass('online icon-off').attr('title', 'i am online');
    } else if (status.status >= 3 && status.status <= 7) {
      $('#skypeStatus').addClass('away icon-off').attr('title', 'i am away');
    } else {
      $('#skypeStatus').addClass('offline').attr('title', 'i am offline');
    }
  });
};

// get recent kippt user clips
// https://gist.github.com/mattes/5560714
var getKipptReads = function(userId, callback) {
  if (!userId) throw new Error('missing user id');
  var query = 'use "store://OdRiZuDnzAn82XXFXFeQBg" as kippt.user.clips; select * FROM kippt.user.clips WHERE user_id="' + userId + '";';
  $.getJSON('http://query.yahooapis.com/v1/public/yql?q=' + encodeURI(query + '&format=json&env=store://datatables.org/alltableswithkeys&callback=?'),
  function(data) {
    if (data.query.count > 0) {
      if (callback) return callback.call(null, data.query.results.json);
    } else {
      if (callback) return callback.call(null, false);
    }
  });
};

// insert kippt reads
var insertKipptReads = function() {
  var maxItems = 5; // kippt delivers 15?
  getKipptReads(58319, function(results) {
    if (results.objects.length == 0) return;
    $('#kipptContainer').show();
    for (var i = 0; i < maxItems; i++) {
      var item = results.objects[i];
      $('#kipptClips').append('<li>' + item.title + '&nbsp; <a href="' + item.url + '">' + item.url_domain + '</a></li>');
    }
  });
};

// load tweet and insert it
var getAndInsertTweet = function() {
  $.getJSON('http://twttr.kb-server.de/?callback=?',
  function(data) {
    if (data.hasOwnProperty('html') && data.html) {
      $('#twitterFav').show();
      $('#twitterFav').append('<p>' + data.html.replace('<p>', '').replace('</p>', '').replace('&mdash; Matthias (@mkadenbach)', ' <span style="white-space:nowrap"><i class="icon-twitter"></i>') + '</span></p>');
    }
  });
};

// async script loading
var loadScript = function(url) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  document.body.appendChild(script);
};

// callback for google maps init
var initializeGoogleMap = function() {
  var MAP;
  var darmstadtLatlng = new google.maps.LatLng(49.878089, 8.662747);
  var centerLatLng = new google.maps.LatLng(49.878099, 8.656368);

  MAP = new google.maps.Map(document.getElementById('map-canvas'), {
    scrollwheel: false,
    disableDefaultUI: true,
    zoomControl: true,
    backgroundColor: '#ffffff',
    zoom: 14,
    center: centerLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // create marker
  var marker = new google.maps.Marker({
    position: darmstadtLatlng,
    clickable: true,
    title: $('#googleMapsLink').text(),
    map: MAP
  });

  // click event for marker
  google.maps.event.addListener(marker, 'click', function() {
    window.location = $('#googleMapsLink').attr('href');
  });

  // set center of map after window resize
  $(window).resize(function() {
    window.setTimeout(function() {
      MAP.setCenter(centerLatLng);
    }, 50);
  });
};



// on ready ...
$(document).ready(function() {

  // 1) decode say hellos...
  $('#m').attr('href', $.rotate13('znvygb:zngguvnf.xnqraonpu@tznvy.pbz')).append(
         $.rotate13('zngguvnf.xnqraonpu@tznvy.pbz'));

  if (navigator.userAgent.match(/iPhone|iPad/i)) {
    $('#s').attr('href', $.rotate13('fxlcr://zxnqraonpu')).append(
           $.rotate13('fxlcr/zxnqraonpu'));
  } else {
    $('#s').attr('href', $.rotate13('fxlcr:zxnqraonpu?pnyy')).append(
           $.rotate13('fxlcr/zxnqraonpu'));
  }

  // 2) load tweet
  getAndInsertTweet();

  // 3) load google map
  loadScript('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initializeGoogleMap&language=en');

  // 4) fetch kippt clips
  insertKipptReads();

  // 5) fetch skype status
  window.setTimeout(function() {
    setSkypeStatus();
    window.setInterval(setSkypeStatus, 1000 * 60 * 3 /* 3 minutes */);
  }, 700);

});
