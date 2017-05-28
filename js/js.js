$(document).ready(function() {

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
