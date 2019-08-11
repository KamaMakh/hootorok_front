ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
            center: [60.00, 30.00],
            zoom: 10
        }),

        myPlacemark = new ymaps.Placemark([60.00, 30.00], {
            balloonContent: '<strong>База отдыха "Хуторок"</strong>'
        });
    myMap.geoObjects
        .add(myPlacemark);
    myMap.controls.remove('searchControl');
}