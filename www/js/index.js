var app = {
    options: {
        filter: 3
    },
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var compass = navigator.compass.watchHeading(
            this.onCompassSuccess, 
            this.onCompassError, 
            this.options
        );
        var geolocation = navigator.geolocation.watchPosition(
            this.onLocationSuccess, 
            this.onLocationError, 
            {maximumAge: 0, timeout: 2000, enableHighAccurracy: true}
        );
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
        map.setCenter([position.coords.longitude, position.coords.latitude]);
    },
    onLocationError: function(error){
        console.log(error);
    }
};

app.initialize();