var anus;

$(function() {
    anus = $('#anus');
    
    throbbing_anus();
    anal_drippage();
});

function anal_drippage() {
    var drip = $('<div style="display:none;" class="drip">&bull;</div>');
    
    $('body').append(drip);
    
    anus_p = $(anus).position();
    drip_top = $(anus).height() * .45 / 2;
    drip_left = $(anus).width() / 2 - $(drip).width() / 2;
    
    drip.css({
        position: 'absolute',
        top: drip_top - $(drip).height() * ((Math.random() - .5) * .5),
        left: drip_left - $(drip).width() * ((Math.random() - .5) * 2),
        color: 'red'
    });
    
    $(drip).show()
        .animate({
            top: $(drip).position().top + 150 + 'px',
            opacity: '0'
        }, 1000, 'easeInQuint', function() {
            drip.remove();
        });
    
    setTimeout(anal_drippage, 750 * Math.random());
}

function throbbing_anus(throbbing) {
    var opac = throbbing ? '.2' : '.4'
    
    $(anus).animate({
        opacity: opac
    }, 1500 + 100 * Math.random(), function() {
        throbbing_anus(!throbbing);
    })
}