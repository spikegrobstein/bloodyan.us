$(function() {
    var anus = $('#anus');
    
    throbbing_anus();
    anal_drippage();
});

function anal_drippage() {
    var drip = $('<img class="drip" src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Red_drop.svg" />');
    
    $('body').append(drip);
    
    anus_p = $(anus).position();
    drip_top = $(anus).height() * .64 / 2;
    drip_left = $(anus).width() / 2 - $(drip).width() / 2;
    
    drip.css({
        position: 'absolute',
        top: drip_top - $(drip).height() * ((Math.random() - .5) * 3),
        left: drip_left - $(drip).width() * ((Math.random() - .5) * 3),
        color: 'red'
    });
    
    drip.animate({
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