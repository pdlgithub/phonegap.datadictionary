appAngular.service('dictionaryService', function ($http, $location, globalConfigService) {
    //var endpoint = "" + $location.protocol() + "://" + $location.host() + ":" + $location.port();// + "/";    //  + $location.path();

    // initialize endpoint from service
     var endpoint = globalConfigService.getServiceEndpoint();

    // initalize endpoint from app.constant
    //var globalVariables = app.constant('globalVariables');
   // var endpoint = globalVariables.serviceEndpoint;
    
    console.log('dictionaryService', endpoint)

    // get
    this.get = function () {
        console.log("dictionaryService.get() hit");
        return $http.get(endpoint + '/DataDictionary/api/ReportMapping');
    };


    // getByReportName
    // NOTE: to avoid error - "...A potentially dangerous Request.Path value was detected from the client (&amp;)..."
    //       updated web.config system.web.httpRuntime set attribute requestPathInvalidCharacters="&lt;,&gt;,*,%,:,\,?"
    this.getByReportName = function (reportName) {
        console.log("dictionaryService.getByReportName() hit");

        return $http.get(endpoint + '/DataDictionary/api/ReportMapping/ByReportName/' + encodeURIComponent(reportName));
    };

    // get by Glossary_id
    this.getByGlossaryId = function (id) {
        console.log("dictionaryService.getByGlossaryId() hit");
        return $http.get(endpoint + '/DataDictionary/api/ReportMapping/ByGlossaryId/' + id)
    };


    // post
    this.post = function (data) {
        console.log("dictionaryService.post() hit");
        return $http.post(endpoint + '/DataDictionary/api/ReportMapping', data);
    };


    // delete
    this.delete = function (id) {
        console.log("dictionaryService.delete() hit");
        return $http.delete(endpoint + '/DataDictionary/api/ReportMapping/' + id);
    };

    // get list of reports
    this.getReportList = function () {
        console.log("dictionaryService.getReportList() hit");
        return $http.get(endpoint + '/DataDictionary/api/ReportMapping/ReportList');
    };

});