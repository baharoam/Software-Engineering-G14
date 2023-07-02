/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.06236842105263158, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.12, 500, 1500, "LoginP-1"], "isController": false}, {"data": [0.14, 500, 1500, "LoginP-0"], "isController": false}, {"data": [0.095, 500, 1500, "LoginG"], "isController": false}, {"data": [0.04, 500, 1500, "LikeComment-0"], "isController": false}, {"data": [0.015, 500, 1500, "LikeComment-1"], "isController": false}, {"data": [0.025, 500, 1500, "Dashboard"], "isController": false}, {"data": [0.055, 500, 1500, "Edit"], "isController": false}, {"data": [0.095, 500, 1500, "Poll-0"], "isController": false}, {"data": [0.02, 500, 1500, "Invite-0"], "isController": false}, {"data": [0.01, 500, 1500, "Poll-1"], "isController": false}, {"data": [0.015, 500, 1500, "Invite-1"], "isController": false}, {"data": [0.085, 500, 1500, "Dashboard-0"], "isController": false}, {"data": [0.0, 500, 1500, "Poll"], "isController": false}, {"data": [0.07, 500, 1500, "LoginP"], "isController": false}, {"data": [0.035, 500, 1500, "Dashboard-1"], "isController": false}, {"data": [0.0, 500, 1500, "LikeComment"], "isController": false}, {"data": [0.135, 500, 1500, "Edit-0"], "isController": false}, {"data": [0.0, 500, 1500, "Invite"], "isController": false}, {"data": [0.23, 500, 1500, "Edit-1"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1900, 0, 0.0, 5857.258421052627, 248, 35499, 3595.0, 10570.9, 25835.6, 32008.72, 28.044280442804425, 662.4219614852399, 7.678447878228782], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["LoginP-1", 100, 0, 0.0, 7534.499999999999, 505, 28571, 3862.0, 26711.4, 27833.55, 28566.44, 2.5771867429513944, 87.51507050216483, 0.39261829287150146], "isController": false}, {"data": ["LoginP-0", 100, 0, 0.0, 4244.92, 338, 11865, 4319.5, 7347.0, 8506.349999999999, 11854.609999999995, 6.363752068219423, 9.570486508845615, 1.702800846379025], "isController": false}, {"data": ["LoginG", 100, 0, 0.0, 9773.219999999998, 503, 28171, 4486.5, 25957.1, 26432.05, 28157.039999999994, 2.368153077414924, 80.43131283006134, 0.3630859698770929], "isController": false}, {"data": ["LikeComment-0", 100, 0, 0.0, 2855.709999999999, 505, 17794, 2491.5, 3782.7000000000003, 5163.249999999998, 17711.65999999996, 1.8897161646320724, 0.6052997089837107, 0.6292902462300163], "isController": false}, {"data": ["LikeComment-1", 100, 0, 0.0, 5470.89, 1033, 26990, 3595.0, 6541.100000000001, 20502.149999999998, 26987.699999999997, 1.7817054484552615, 60.501827779237786, 0.27143168941310625], "isController": false}, {"data": ["Dashboard", 100, 0, 0.0, 11862.91, 920, 31561, 7673.5, 28587.300000000003, 29776.1, 31549.339999999993, 2.0340499969489247, 70.10383110138723, 0.6257087392958119], "isController": false}, {"data": ["Edit", 100, 0, 0.0, 4233.419999999998, 749, 9767, 3762.0, 7778.7, 8411.949999999995, 9765.15, 3.695491500369549, 127.36803775175537, 1.2991962305986697], "isController": false}, {"data": ["Poll-0", 100, 0, 0.0, 2252.7999999999993, 888, 6599, 2025.5, 3462.1000000000004, 4533.049999999998, 6597.619999999999, 1.7726096359059806, 0.5677890240011344, 0.8014826771723331], "isController": false}, {"data": ["Invite-0", 100, 0, 0.0, 4265.270000000003, 872, 27807, 2735.0, 4497.700000000001, 25204.299999999996, 27804.649999999998, 1.8466879651345312, 0.9377712322948791, 0.3751084929179516], "isController": false}, {"data": ["Poll-1", 100, 0, 0.0, 5180.780000000002, 1179, 28165, 3738.5, 6089.5, 19956.9, 28158.369999999995, 1.8115613847575225, 61.51620186907846, 0.2759800547091538], "isController": false}, {"data": ["Invite-1", 100, 0, 0.0, 2856.4900000000002, 744, 5503, 2773.5, 4105.8, 4563.249999999998, 5498.299999999997, 3.4928396786587497, 118.60943366879148, 0.5321122947956689], "isController": false}, {"data": ["Dashboard-0", 100, 0, 0.0, 7070.469999999999, 277, 27570, 3235.5, 23651.400000000027, 25917.899999999998, 27559.839999999997, 2.2053148086889403, 1.1198864262873525, 0.3424268111147866], "isController": false}, {"data": ["Poll", 100, 0, 0.0, 7433.24, 2816, 31034, 5735.5, 8324.2, 25674.399999999998, 31027.409999999996, 1.7359905562113742, 59.50606050578085, 1.0493927288035554], "isController": false}, {"data": ["LoginP", 100, 0, 0.0, 11778.94, 971, 35499, 8736.5, 34486.9, 34958.0, 35495.5, 2.5549310168625445, 90.60169623467041, 1.0728714230965763], "isController": false}, {"data": ["Dashboard-1", 100, 0, 0.0, 4792.170000000001, 510, 28598, 3266.5, 6036.900000000001, 19452.299999999996, 28573.699999999986, 2.0467477178762947, 69.50209583768267, 0.31180922264521677], "isController": false}, {"data": ["LikeComment", 100, 0, 0.0, 8326.5, 1656, 29933, 6387.0, 19677.900000000067, 28335.35, 29926.199999999997, 1.7658173085412583, 60.52792350369056, 0.8570421897900443], "isController": false}, {"data": ["Edit-0", 100, 0, 0.0, 2241.6699999999987, 411, 5426, 2224.0, 3600.9, 4814.349999999999, 5422.999999999998, 3.729812390436761, 1.8950288011450525, 0.7430485621573235], "isController": false}, {"data": ["Invite", 100, 0, 0.0, 7120.039999999998, 2672, 32012, 5276.0, 8259.600000000002, 28914.999999999996, 32008.719999999998, 1.771887237096231, 61.06932218114889, 0.6298505413115509], "isController": false}, {"data": ["Edit-1", 100, 0, 0.0, 1993.9699999999991, 248, 5406, 1940.5, 4032.000000000001, 4507.599999999999, 5399.259999999997, 4.495796430337634, 152.66697317695457, 0.684906487434249], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1900, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
