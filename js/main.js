$(document).ready(function () {
    
    var topArtists = 'https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=ac83636465b06e3626587c01f7d85bba&format=json';
    $.get(topArtists, function(response){
        for(var i = 0; i <=11; i++){
            var artist = response.artists.artist[i].name;
            var artistImage = response.artists.artist[i].image[3]['#text'];
            $('#topArtists').append($("<div id='content'>" + "<span>" + artist + "</span>" + "<img src='" + artistImage + "'>" + "</div>").hide().fadeIn(1000));
        }
    })
    $('#topArtists, #results').on('click', '#content', function(){
        $("html, body").scrollTop($("#info").offset().top);
          var newArtist = $(this).text();
            var newUrl = 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + newArtist + '&api_key=ac83636465b06e3626587c01f7d85bba&format=json';
            $.get(newUrl, function (response) {

                var summary = response.artist.bio.summary;
                var image = response.artist.image[3]['#text'];
                $('#summary').html(summary);
                $('#image').empty();
                $('#image').append("<img src='" + image + "'>");
                $('#results').empty();
                $('#results').html("<h1>Related Artists</h1>");
                for (var i = 0; i <= 5; i++) {
                    var similar = response.artist.similar.artist[i].name;
                    var simImage = response.artist.similar.artist[i].image[3]['#text'];
                    $('#results').append($("<div id='content'>" + "<span>" + similar + "</span>" + "<img src='" + simImage + "'>" + "</div>").hide().fadeIn(1000));
                }
            })
    });

    $('#artist').on('keyup', function (e) {
        e.preventDefault();
        var artist = $('#artist').val();
        var url = 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artist + '&api_key=ac83636465b06e3626587c01f7d85bba&format=json';

        if (e.keyCode === 13) {
            $.get(url, function (response) {
                
                var summary = response.artist.bio.summary;
                var image = response.artist.image[5]['#text'];
                $('#summary').html(summary);
                $('#image').empty();
                $('#image').append($("<img src='" + image + "'>").hide().fadeIn(500));
                $('#results').empty();
                $('#results').html("<h1>Related Artists</h1>");
                for (var i = 0; i <= 5; i++) {
                    var similar = response.artist.similar.artist[i].name;
                    var simImage = response.artist.similar.artist[i].image[3]['#text'];
                    $('#results').append($("<div id='content'>" + "<span>" + similar + "</span>" + "<img src='" + simImage + "'>" + "</div>").hide().fadeIn(1000));
                }
            })
            $('#artist').val("");
        };
    })
});
