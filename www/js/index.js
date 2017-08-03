var url = "https://api.mapbox.com/directions/v5/mapbox/driving/";
var ACCESS_TOKEN = 'pk.eyJ1IjoiYmlueWF0b3YiLCJhIjoiY2l5NG9mMTN0MDAyNTJ3bG41Y2lsZ2ZiYiJ9.whhi4GndmK5p4DZ2MRevAg';
var appInterval;
var app = {
    options: {
        filter: 6
    },
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        this.getGeoJson(
            '49.84440327235268,40.378981761424',
            '49.844651853261894,40.38194929692554'
        );
        var compass = navigator.compass.watchHeading(
            this.onCompassSuccess, 
            this.onCompassError, 
            this.options
        );
        appInterval = setInterval(function(){
            navigator.geolocation.getCurrentPosition(
                app.onLocationSuccess, 
                app.onLocationError, 
                {maximumAge: 1000, timeout: 2000, enableHighAccurracy: true}
            );
        }, 3000);
        // var geolocation = navigator.geolocation.watchPosition(
        //     this.onLocationSuccess, 
        //     this.onLocationError, 
        //     {maximumAge: 1000, timeout: 2000, enableHighAccurracy: true}
        // );
    },
    onCompassSuccess: function(heading){
        document.getElementById('compass').innerHTML = heading.magneticHeading;
        map.setBearing(heading.magneticHeading);
    },
    onCompassError: function(error){
        console.log(error);
    },
    onLocationSuccess: function(position){
        if(position.coords.accuracy > 65) return;
        document.getElementById('acc').innerHTML = position.coords.accuracy;
        marker.setLngLat([position.coords.longitude, position.coords.latitude]);
        map.jumpTo({center: [position.coords.longitude, position.coords.latitude]});
    },
    onLocationError: function(error){
        console.log(error);
    },
    getGeoJson: function(start, finish){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                app.showDrivingRoute(JSON.parse(this.responseText).routes[0].geometry.coordinates);
            }
        };
        ajax.open('GET', url + start + ';' + finish + '?geometries=geojson&access_token=' + ACCESS_TOKEN, true);
        ajax.send();
    },
    showDrivingRoute: function(coordinates){
        map.addLayer({
            "id": "route",
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": coordinates
                    }
                }
            },
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#0EB1D2",
                "line-width": 10
            }
        });
    }
};

app.initialize();