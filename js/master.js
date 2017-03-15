(function() {
        var selectedCar,
            saveButton = document.querySelector(".fa-download").parentNode,
            removeButton = document.querySelector(".fa-refresh").parentNode;

        if (window.localStorage.getItem("savedCar")) {
            var data = window.localStorage.getItem("savedCar", selectedCar);

            data = JSON.parse(data);
            renderCarInfo(data);
        }

        //expanded AJAX example
        $(".thumbInfo img").on("click", function() {

            //do an AJAX call
            $.ajax({
                    url: "includes/ajaxQuery.php",
                    data: { model: this.id },
                    type: "GET"
                }) //don't put a semicolon here so we can chain methods together

            .done(function(data) {
                    console.log(data);

                    if (data && data !== "null") {
                        selectedCar = data;

                        data = JSON.parse(data);
                        renderCarInfo(data);
                    } else {
                        alert("your ajax call didn't work");
                    }

                }) //don't put a semicolon here either

            .fail(function(ajaxCall, status, error) {
                console.log(status, ", ", error);
                console.log(ajaxCall); //outputs the ajax call as an object
            }); //the end of the chain, terminate the ajax function

            //terminate the ajax function

        });

        function renderCarInfo(car) {
            var currentThumb = $('#' + car.model);

            var animIndex = parseInt(currentThumb.data('roundaboutindex'), 8);
            $('#cars').roundabout('animateToChild', animIndex);

            $(".thumbInfo img").addClass("nonActive"); //for collections, use jQuery (more than one element)
            $("#" + car.model).removeClass("nonActive");

            $(".subhead span").text(" mini Cooper " + car.model);
            $(".modelName").text(car.modelName);
            $(".priceInfo").text(car.pricing);
            $(".modelDetails").text(car.modelDetails);
        }

        function saveData() {
            if (window.localStorage) {
                window.localStorage.setItem("savedCar", selectedCar);
            }
        }

        function removeData() {
            localStorage.clear();
        }

        saveButton.addEventListener("click", saveData, false);
        removeButton.addEventListener("click", removeData, false);

        $(window).load(function)() {
            // set ip the roundabout container

            $('#cars').roundabout({
                childSelector: 'img',
                minOpacity: 0.8,
                minScale: 0.4,
                duration: 1200
            });

            $('#cars').css('opacity', 1);

        });

})();
