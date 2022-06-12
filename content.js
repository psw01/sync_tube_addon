var Link = window.location.toString()
var Hook = ''

zoom = 1
var mouseDown = 0;

document.body.onmousedown = function() {
    ++mouseDown;
}
document.body.onmouseup = function() {
    --mouseDown;
}


if (!localStorage.getItem('PP_hook'))
    ask_hook();
Hook = localStorage.getItem('PP_hook');
setTimeout(function(){
		
		
if (Link != '') {
    var sending_prompt = confirm("send to discord ?");
    if (!localStorage.getItem('PP_username'))
        localStorage.setItem('PP_username', prompt("Username: "));
    var username = localStorage.getItem('PP_username');
    if (sending_prompt)
        fetch(
            Hook, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    content: Link
                }),
            }
        );
}
}, 3000);
document.addEventListener('keydown', (event) => {
    if (event.code == 'Enter') {
        input = document.getElementsByClassName('searchInput')[0].value
        if (input == '/username')
            localStorage.setItem('PP_username', prompt("Username: "));
        if (input == '/set hook')
            ask_hook()
        if (input == '/resize')
            resize()
        document.getElementsByClassName('searchInput')[0].value = ''
    }
    if (event.code == 'Escape'){
        scaler(!document.body.children[0].hidden)
    }
    if(event.key.toLowerCase() == 'r'){
        $(".view").css({ left: 0, top: 0 })
    }
    if (event.key == 'Control') {
        $(".view").css('background-color','rgba(255, 255, 255, 0.25)')
        $("#player").css("z-index","-99")
        
    }

}, false);

$(".view").draggable({
    appendTo: "body",
    cursor: "crosshair"
})


document.addEventListener('keyup', (event) => {
    if(event.key == "Control"){
        $(".view").css('background-color','black')
        $("#player").css("z-index","99")
    }
})

function ask_hook() {
    localStorage.setItem('PP_hook', prompt("hook: "));
}

function resize() {
    pp = prompt('Size: ', '99')
    document.getElementsByClassName('left_wrapper')[0].style.width = `${pp}%`
}

function scaler(toggle) {
    elm = document.body.children
    elm[0].hidden = elm[2].hidden = elm[3].hidden = toggle
    document.querySelector('main').style.padding = 0
    document.querySelector('.info').style.position = 'absolute'
    document.querySelectorAll("body > *:not(.left_wrapper) > *").forEach(e => { e.hidden = toggle });
    document.getElementsByClassName('left_wrapper')[0].style.width = (toggle) ? "99%" : "60%"
}







//line 69 (: