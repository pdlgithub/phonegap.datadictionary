appAngular.service('globalConfigService', function ($location) {
    //var endpoint = "" + $location.protocol() + "://" + $location.host() + ":" + $location.port();// + "/";    //  + $location.path();
    var configuration = "";

    // hardcode endpoint to http://192.168.1.101/DataDictionary
    var endpoint = 'http://192.168.1.101';

    this.init = function () {
        console.log('globalConfigService.init() ' + endpoint);
        //console.log('xxxx' + endpoint);

        configuration = { "serviceEndpoint": endpoint };
    }

    this.getConfiguration = function () {
        return configuration;
    }

    this.getServiceEndpoint = function () {
        return configuration.serviceEndpoint;
    }
});




