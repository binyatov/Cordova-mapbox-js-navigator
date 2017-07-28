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
        var watcher = navigator.compass.watchHeading(this.onCompassSucess, this.onCompassError, this.options);
    },
    onCompassSucess: function(heading){
        map.setBearing(heading.magneticHeading);
    },
    onCompassError: function(error){
        console.log(error);
    }
};

app.initialize();