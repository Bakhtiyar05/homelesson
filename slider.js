$(document).ready(()=>{
    let x = 0 ;
    let ajax = new XMLHttpRequest();
        ajax.open("GET", "slider.json");
        ajax.send();
        ajax.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                showSlide(this.responseText);
            }
        }

    function showSlide(text) {
        let obj = JSON.parse(text);
        let line = obj.slider.length;
        let arraySlide = [];
        let t;
        
        for( i = 0; i < line; i++ ) {
            arraySlide[i] = '<a href="'+obj.slider[i].url+'" class="slide"><img src="img/'+ obj.slider[i].image+'"/></a>';
        };

        $("#slider").append(arraySlide);
        start();

		function start() {
            changeText( obj, x);
            changeSlide();
			stop();
            t = setInterval( () => { x++;
                if( x >= line ) x = 0;
                    else if( x < 0 ) x = line - 1;
                    changeText( obj, x);
                    changeSlide(); }, 3000);
        };

        function stop() {
            clearInterval(t);
        };

        $("#right").click(function() {
            x++;
            start();
        });

        $("#left").click(function() {
            x--;
            start();
        });

        setInterval(function() {
            $(".slide img").css({
                "width": $("#main").width(),
                "height": $("#main").height()
            });
        });

        function changeText( obj){
            $(".text h1").text(obj.slider[x].text.h1);
            $(".text p").text(obj.slider[x].text.p);
        };
    };
        function changeSlide() {
            $("#slider").animate ({
                left: -100*x + "%",
            });
        }
    });