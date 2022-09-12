$(document).ready(function () {
    $.getJSON('ir.json', function (data) {
        var $select = $('#cities');
        $.each(data.city, function (a, b) {
            var $option = $("<option/>").attr("value", b.city).text(b.city);
            $select.append($option);
        });
    });
    // console.log(2);
    document.getElementById("btn").onclick = function () {
        geo()
    };
    var city;

    function geo() {
        var cityName = document.getElementById("cities").value;
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=c0e42332729c344a89b55f4fd7fe1c86",
            async: false,
            success: function (response) {
                $.ajax({
                    type: "GET",
                    url: "https://api.openweathermap.org/data/2.5/weather?lat=" + response[0].lat + "&lon=" + response[0].lon + "&appid=c0e42332729c344a89b55f4fd7fe1c86",
                    success: function (response) {
                        var tdHtml;
                        tdHtml = tdHtml + `<tr>
                        <td>${response.cod}</td>
                        <td>${response.name}</td>
                        <td>${response.weather[0].id}</td>
                        <td>${response.weather[0].main}</td>
                        <td>${response.weather[0].description}</td>
                        <td>${response.wind.speed}</td>
                        <td>${response.wind.deg}</td>
                        </tr>`

                        $("#tableBody").html(
                            tdHtml
                        );
                    }
                });
            }
        });
    }
});