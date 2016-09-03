
 // global variables 
  var topics = [ "bear", "lion", "horse", "skunk", "cow", "border collie"];
  var topicsCounter;
//
// objects and functions
//
  function makeButtons (animalName) {
            var btn = document.createElement("button");        // Create a <button> element
            btn.id = animalName;
            btn.class = "animalButton";
            var temp = document.createTextNode(animalName);       // Create a text node
            btn.appendChild(temp);                              
            document.getElementById("buttons").appendChild(btn);
  }

//
// Begin activity
//
    topicsCounter = topics.length;
    for (i = 0; i < topicsCounter; i++) {
           makeButtons( topics [i]);   
            } 

    $(".add-animal").on("click", function() { 
          debugger;
          var newAnimal = $('#nameInput').val().trim();
          makeButtons (newAnimal);
       } );

	  $("button").on('click', function() { 	
         	
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + this.id + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
            		
                var results = response.data;

               for (var i = 0; i < results.length; i++) {          
                  var gifDiv = $("<div></div>");          //create a div for the image
                  $(gifDiv).css("padding", 10);           //10 px padding
                  $(gifDiv).css("float", "left");         // float left
                
                  var gifDivImage = $("<img></img>");     //build up the image params for display
                  $(gifDivImage).attr("src", results[i].images.fixed_height_still.url);
                  $(gifDivImage).attr("data-still", results[i].images.fixed_height_still.url);
                  $(gifDivImage).attr("data-animate", results[i].images.fixed_height.url);
                  $(gifDivImage).attr("data-state", "still");
                  $(gifDivImage).attr("class", "animalImage");                

                  $(gifDiv).append(gifDivImage);  //append the completed image to the div 

                  var rating = results[i].rating;  //add the image rating to the div
                  var p = $('<div>').text("Rating: " + rating );
                  $(gifDiv).append(p);  

                  $('#gifs').append(gifDiv);

                } // end for


              $('.animalImage').on('click', function() {    //WHY $(this)  ??????????????
                var state = $(this).attr('data-state'); 
                   if ( state == 'still'){
                       $(this).attr('src', $(this).data('animate'));
                       $(this).attr('data-state', 'animate');
                  }else{
                       $(this).attr('src', $(this).data('still'));
                       $(this).attr('data-state', 'still');
                   }
                });
               
              } );  // end .done

	 } );  //end onClick
