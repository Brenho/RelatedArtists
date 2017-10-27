$(document).ready(function () {
    
    //Get and display top artists on page load
    var topArtists = 'https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=ac83636465b06e3626587c01f7d85bba&format=json';
    
    $.get(topArtists, function(response){
        for(var i = 0; i <=11; i++){
            var artist = response.artists.artist[i].name;
            var artistImage = response.artists.artist[i].image[3]['#text'];
            //Append and fadeIn to #topArtists 
            $('#topArtists').append($("<div id='content'>" + "<span>" + artist + "</span>" + "<img src='" + artistImage + "'>" + "</div>").hide().fadeIn(1000));
        }
    });
    
    //Display new search when clicking on top artists or related artists
    $('#topArtists, #results').on('click', '#content', function(){
        //
        $("html, body").scrollTop($("#info").offset().top);
            var newArtist = $(this).text().toLowerCase();
            var newUrl = 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + newArtist + '&api_key=ac83636465b06e3626587c01f7d85bba&format=json';
            
        $.get(newUrl, function (response) {

                var summary = response.artist.bio.summary;
                var image = response.artist.image[3]['#text'];
                $('#summary').html(summary);
                //Clear previous image
                $('#image').empty();
                $('#image').append("<img src='" + image + "'>");
                //Clear previous related artists
                $('#results').empty();
                $('#results').html("<h1>Related Artists</h1>");
                //Loop through related artists names and images
                for (var i = 0; i <= 5; i++) {
                    var similar = response.artist.similar.artist[i].name;
                    var simImage = response.artist.similar.artist[i].image[3]['#text'];
                    //Append and fadeIn to #results
                    $('#results').append($("<div id='content'>" + "<span>" + similar + "</span>" + "<img src='" + simImage + "'>" + "</div>").hide().fadeIn(1000));
                }
            })
    });
    
    //Display search results when entering input value
    $('#artist').on('keyup', function (e) {
        e.preventDefault();
        var artist = $('#artist').val().toLowerCase();
        var url = 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artist + '&api_key=ac83636465b06e3626587c01f7d85bba&format=json';
        
        //Check that enter has been pressed
        if (e.keyCode === 13) {
            $.get(url, function (response) {
                
                var summary = response.artist.bio.summary;
                var image = response.artist.image[5]['#text'];
                $('#summary').html(summary);
                //Clear previous image
                $('#image').empty();
                $('#image').append($("<img src='" + image + "'>").hide().fadeIn(500));
                //Clear previous related artists
                $('#results').empty();
                $('#results').html("<h1>Related Artists</h1>");
                //Loop through related artists names and images
                for (var i = 0; i <= 5; i++) {
                    var similar = response.artist.similar.artist[i].name;
                    var simImage = response.artist.similar.artist[i].image[3]['#text'];
                    //Append and fadeIn to #results
                    $('#results').append($("<div id='content'>" + "<span>" + similar + "</span>" + "<img src='" + simImage + "'>" + "</div>").hide().fadeIn(1000));
                }
            })
            //Clear input
            $('#artist').val("");
        };
    })
});
