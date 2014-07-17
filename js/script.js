$(function() {
  $('.countdown').easydate({
    locale: {
      'future_format': '%s <strong>%t</strong>!',
      'past_format': '%t %s', 
      'second': 'Second', 
      'seconds': 'Seconds', 
      'minute': 'Minute', 
      'minutes': 'Minutes', 
      'hour': 'Hour', 
      'hours': 'Hours', 
      'day': 'Day', 
      'days': 'Days', 
      'week': 'Week', 
      'weeks': 'Weeks', 
      'month': 'Month', 
      'months': 'Months', 
      'year': 'Year', 
      'years': 'Years', 
      'yesterday': 'Yesterday',
      'tomorrow': 'Tomorrow', 
      'now': 'Just Now', 
      'ago': 'Ago', 
      'in': 'Just' 
    },
    units: [
      { name: 'day', limit: 5259486, in_seconds: 86400 }
    ]
  });

  $('#pictures').css({
    height: $(window).height() - $('header').outerHeight(true) - $('#menu').height() + 'px'
  });

  $.getJSON(
    'http://graph.facebook.com/223883624375985/photos?callback=?',
    function(r) {
      var pics = r.data,
          panelHeight = $('#pictures').height();
          
      for (var i = 0; i < pics.length; i++) {
        $('#pictures .panel').css({position: 'relative', left: '50%'}).append(
          $('<a>').attr({'href': pics[i].link, target: '_blank'}).append(
            $('<img>')
            .attr({src: pics[i].source, height: panelHeight, width: (panelHeight / pics[i].height) * pics[i].width})
            .css({outline: '1px solid #333'})
            .on('load', function() { $(this).css({outline: 'none'}) })
          )
        );
      }
      
      function focusPicture(i) {
        var offset = 0;
        for (var j = 0; j < i; j++) {
          offset += $('#pictures .panel img:eq(' + j + ')').outerWidth(true);
        }
        offset += ($('#pictures .panel img:eq(' + i + ')').outerWidth()) / 2;
        $('#pictures .panel img:not(:eq(' + i + '))').animate({opacity: .3});
        $('#pictures .panel img:eq(' + i + ')').animate({opacity: 1});
        $('#pictures .panel').animate({marginLeft: -1 * offset + 'px', opacity: 1});
      }
      window.focusPicture = focusPicture;
      
      var i = 2;
      focusPicture(i);
      
      setInterval(function() {
        if (i == pics.length) i = 0;
        focusPicture(i++);
      }, 7000);
    }
  );

  var sections = [];
  $('#menu li a').each(function(i, e) {
    var href = $(e).attr('href');
    if (href.match(/^#[a-zA-Z0-9_\-]+$/)) sections.unshift($(href));
    else {
      $(e).click(function() {
        $('#menu li a').closest('li').removeClass('current');
        $(this).closest('li').addClass('current');
        return true;
      });
    }
  });
  
  $('#menu li a').on('touchstart', function(e) {
    $(this).click();
  });
  
  $(window).scroll(function(e) {
    var w = Math.round($(window).height() / 2);
    for (var i = 0; i < sections.length; i++) {

      if (sections[i].offset().top - w < $(this).scrollTop()) {
        $('#menu li a').closest('li').removeClass('current');
        $('#menu li a[href=#' + sections[i].attr('id') + ']').closest('li').addClass('current');
        return;
      }
    }
  }).scroll();
  
  if ($.QueryString['request_invitation']) {
    var shade = $('<div/>').css({
      backgroundColor: '#000',
      opacity: .5,
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '10001'
    }).appendTo('body');
    
    $('#request_invitation').show().css({maxHeight: $(window).height() - 20 + 'px'}).css({
      left: $(window).width() / 2 - $('#request_invitation').outerWidth() / 2,
      top: $(window).height() / 2 - $('#request_invitation').outerHeight() / 2
    });
    
    $.getJSON('/services/request_invitation.php?email=' + $.QueryString.email, function(r) {
      r.Email = $.QueryString.email;
      for (var field in r) {
        $('#request_invitation').find('[name="' + field + '"]').val(r[field]);
      }
    });
    
    $('#request_invitation .close').click(function() {
      shade.fadeOut('fast');
      $('#request_invitation').fadeOut('fast');
    });
    
    $('#request_invitation_form').submit(function(e) {
      $('#request_invitation_form .success').animate({opacity: .2});
      $.post('/services/request_invitation.php', $(this).serialize(), function(r) {
        if ($.trim(r) == 'OK') {
          $('#request_invitation_form .success').animate({opacity: 1});
        } else {
          $('#request_invitation_form .success')
          .css({opacity: 1, fontSize: '14px', color: '#CC0000', width: '168px', right: '7px', bottom: '32px'})
          .text('Error. Please refresh and try again.');
        }
      });
      
      e.preventDefault();
      return false;
    });
  }
});
