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

  // more button
  $('.l1.more').click(function(e){
    e.preventDefault();
    $(e.target).parents('li').addClass('hidden');
    $('.l2').removeClass('hidden');
  });

  // less button
  $('.l2.less').click(function(e){
    e.preventDefault();
    $('.l2').addClass('hidden');
    $('.l1.more').removeClass('hidden');
  });

  $('.l2.less').hover(
    function(e){
      $('.l2:not(.less)').addClass('resize-small');
  }, 
    function(e){
      $('.l2').removeClass('resize-small');
  })


  // mail popover
  // $('#m').tooltip({
  //   placement: 'top',
  //   trigger: 'hover',
  //   content: 'Double-click to copy to clipboard',
  //   container: 'body'
  // });

});