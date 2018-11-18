

//initial array of animals

var animals = ["Dog", "Cat", "Bird", "Trump", "Lion", "Falcon"];

// Generic function for capturing the movie name from the data-attribute
function alertAnimalName() {
    var animalName = $(this).attr("data-name");
    alert(animalName);
}

// Function for displaying animal data
function renderButtons() {
    // Deleting the animals prior to adding new manimals
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {
        // Then dynamicaly generating buttons for each animal in the array
        //This code $("<button>") is all jQuery needs to create the start and 
        //end tag. (<button></button>)
        var button = $("<button>");
        // Adding a class of animal to our button
        button.addClass("animal");
        // Adding a data-attribute
        button.attr("data-name", animals[i]);
        // Providing the initial button text
        button.text(animals[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(button);
    }
}


// This function handles events where one button is clicked
$("#add-animal").on("click", function () {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();

    // Adding the animal from the textbox to our array
    animals.push(animal);
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();


})


// Function for displaying the animal info
// We're adding a click event listener to all elements with the class "animal"
// We're adding the event listener to the document because it will work for dynamically 
//generated elements $(".animals").on("click") will only add listeners to elements
// that are on the page at that time
$("#buttons-view").on("click", ".animal", function () {
    var x = $(this).data("name");
    /*  alert("button !");
     console.log(x); */

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=icOnWtYlXbcvioJN8Fd8z58VqhxmF0om&limit=10";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .done(function (response) {
            console.log(response.data[0].rating);
            $("#GIFArea").empty();

            for (var i = 0; i < response.data.length; i++) {
                /*var animalDiv = $("<div>");
                var p = $("<p>").text("Rating : " + response.data[i].rating );
                var animalImage = $("<img>");
                animalImage.attr("src", response.data[i].images.downsized.url);
                animalDiv.append(p);
                animalDiv.append(animalImage);
                $("#GIFArea").append(animalDiv);*/
                //Crear una nueva imagen
                var animalImage = $("<img>");
                animalImage.attr("src", response.data[i].images.downsized.url);
                animalImage.attr("data-state", "animate");
                animalImage.attr("data-animate", response.data[i].images.downsized.url);
                animalImage.attr("data-still", response.data[i].images.downsized_still.url);
                animalImage.addClass("animalGif");

                $("#GIFArea").prepend("<p> Rating : " + response.data[i].rating + "</p>");
                $("#GIFArea").prepend(animalImage);

            }
        });

    $("#GIFArea").on("click", ".animalGif", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });



})







