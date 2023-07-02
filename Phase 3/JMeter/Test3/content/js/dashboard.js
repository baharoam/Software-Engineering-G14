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

    var data = {"OkPercent": 69.94067989961214, "KoPercent": 30.05932010038786};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.004220853296828656, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0016666666666666668, 500, 1500, "LoginP-1"], "isController": false}, {"data": [0.005555555555555556, 500, 1500, "LoginP-0"], "isController": false}, {"data": [0.0055, 500, 1500, "LoginG"], "isController": false}, {"data": [0.006070640176600441, 500, 1500, "LikeComment-0"], "isController": false}, {"data": [5.518763796909492E-4, 500, 1500, "LikeComment-1"], "isController": false}, {"data": [0.0, 500, 1500, "Dashboard"], "isController": false}, {"data": [0.0025, 500, 1500, "Edit"], "isController": false}, {"data": [0.013960703205791106, 500, 1500, "Poll-0"], "isController": false}, {"data": [0.003695881731784583, 500, 1500, "Invite-0"], "isController": false}, {"data": [0.0036194415718717684, 500, 1500, "Poll-1"], "isController": false}, {"data": [0.004751847940865892, 500, 1500, "Invite-1"], "isController": false}, {"data": [0.012396694214876033, 500, 1500, "Dashboard-0"], "isController": false}, {"data": [0.0, 500, 1500, "Poll"], "isController": false}, {"data": [0.0, 500, 1500, "LoginP"], "isController": false}, {"data": [0.001652892561983471, 500, 1500, "Dashboard-1"], "isController": false}, {"data": [0.0, 500, 1500, "LikeComment"], "isController": false}, {"data": [0.010626992561105207, 500, 1500, "Edit-0"], "isController": false}, {"data": [0.0, 500, 1500, "Invite"], "isController": false}, {"data": [0.010626992561105207, 500, 1500, "Edit-1"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 17532, 5270, 30.05932010038786, 131936.10500798482, 0, 507477, 120524.5, 266313.8, 308696.99999999977, 401731.42999999993, 11.561638993559722, 240.89456065260742, 2.9586219171518087], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["LoginP-1", 900, 155, 17.22222222222222, 102202.77111111107, 1070, 235225, 105914.5, 184925.7, 190428.7, 193820.81, 1.75297128633033, 58.10394517144059, 0.23619462071544603], "isController": false}, {"data": ["LoginP-0", 900, 0, 0.0, 183124.98555555582, 470, 277142, 208945.0, 237257.6, 266185.65, 274026.23, 3.1729355647296487, 4.771797626644197, 0.8490081491561754], "isController": false}, {"data": ["LoginG", 1000, 390, 39.0, 125956.53999999988, 59, 414028, 135574.0, 221837.69999999995, 262326.3499999999, 320930.92000000004, 1.2063992240440191, 43.01543552934687, 0.1509318529206322], "isController": false}, {"data": ["LikeComment-0", 906, 0, 0.0, 98701.75607064021, 203, 210741, 99442.0, 150025.2, 153638.15, 178893.67999999993, 0.7613560541251884, 0.24456449236206934, 0.25353751411786063], "isController": false}, {"data": ["LikeComment-1", 906, 458, 50.55187637969095, 133848.39403973497, 3, 358014, 133582.5, 208819.20000000016, 256683.19999999998, 304038.1899999999, 0.65538478899648, 19.121297540489543, 0.08507659538452858], "isController": false}, {"data": ["Dashboard", 1000, 766, 76.6, 136325.6139999999, 1, 472158, 117198.0, 274927.3, 278699.64999999997, 399613.44000000006, 0.936732172347479, 28.181262659057126, 0.21201615441467822], "isController": false}, {"data": ["Edit", 1000, 435, 43.5, 118971.08500000021, 0, 444488, 88338.0, 246441.19999999998, 287927.9499999999, 377794.72000000003, 0.7602475670177236, 18.902406473393995, 0.23456013216143703], "isController": false}, {"data": ["Poll-0", 967, 0, 0.0, 93677.26473629788, 261, 192511, 98235.0, 153769.40000000005, 170264.0, 179584.8399999997, 0.6790916324253262, 0.21813876486083536, 0.3070502205204356], "isController": false}, {"data": ["Invite-0", 947, 0, 0.0, 86913.80253431886, 735, 224116, 92181.0, 164818.20000000007, 177450.59999999998, 186206.19999999992, 0.6861568045815276, 0.34901355449512406, 0.1393756009306228], "isController": false}, {"data": ["Poll-1", 967, 384, 39.71044467425026, 116942.82006204754, 206, 386661, 123261.0, 199313.80000000005, 245668.99999999977, 279017.8, 0.6787946516316342, 19.56155284301417, 0.09057742909509021], "isController": false}, {"data": ["Invite-1", 947, 329, 34.74128827877508, 92893.25871172124, 9, 378483, 88787.0, 177396.8, 214797.8, 281175.0, 0.7342633485510124, 19.84864523033151, 0.0950872732467621], "isController": false}, {"data": ["Dashboard-0", 605, 0, 0.0, 71428.69752066114, 441, 182808, 82893.0, 124905.39999999997, 149652.6, 156899.21999999997, 0.6498395809232879, 0.33042148306550273, 0.10090282555351832], "isController": false}, {"data": ["Poll", 1000, 417, 41.7, 204095.62800000008, 1, 470740, 225448.5, 319330.1, 356391.6999999998, 422463.80000000005, 0.6997352201926791, 19.77561749227842, 0.3962339517913921], "isController": false}, {"data": ["LoginP", 1000, 255, 25.5, 276494.207, 1585, 507477, 298879.0, 408753.0, 412655.35, 415346.99, 1.945748636516643, 61.21816968046915, 0.7055694987362362], "isController": false}, {"data": ["Dashboard-1", 605, 371, 61.32231404958678, 104949.47272727279, 349, 295317, 104237.0, 184274.19999999998, 202035.99999999977, 285736.99999999936, 0.5679924518027893, 22.42063013276237, 0.07079735461036188], "isController": false}, {"data": ["LikeComment", 1000, 552, 55.2, 214288.83399999986, 0, 497374, 241084.0, 321564.2, 372460.7499999998, 424353.1700000001, 0.7210819112997141, 19.865802431217798, 0.317247873709714], "isController": false}, {"data": ["Edit-0", 941, 0, 0.0, 57630.336875664165, 266, 193493, 48778.0, 126603.2, 146831.8, 177637.9, 0.7600613218443724, 0.3865239451625045, 0.15141846646118357], "isController": false}, {"data": ["Invite", 1000, 382, 38.2, 172268.79899999997, 1, 500948, 190055.0, 291844.7, 329255.85, 397290.84, 0.7180709741350835, 19.025364791274722, 0.22939843155347475], "isController": false}, {"data": ["Edit-1", 941, 376, 39.95749202975558, 66239.97874601488, 12, 300300, 50621.0, 143865.00000000003, 190467.4, 266058.72000000003, 0.85732116745095, 21.940713032580025, 0.10812248600361696], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 1820, 34.53510436432637, 10.381017567875885], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:80 failed to respond", 1, 0.018975332068311195, 0.005703855806525211], "isController": false}, {"data": ["500/Internal Server Error", 3273, 62.106261859582546, 18.668720054757017], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:80 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 163, 3.0929791271347247, 0.9297284964636094], "isController": false}, {"data": ["Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 13, 0.24667931688804554, 0.07415012548482774], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 17532, 5270, "500/Internal Server Error", 3273, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 1820, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:80 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 163, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 13, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:80 failed to respond", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["LoginP-1", 900, 155, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 104, "500/Internal Server Error", 51, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["LoginG", 1000, 390, "500/Internal Server Error", 206, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 160, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:80 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 24, "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["LikeComment-1", 906, 458, "500/Internal Server Error", 324, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 131, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 3, "", "", "", ""], "isController": false}, {"data": ["Dashboard", 1000, 766, "500/Internal Server Error", 628, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 111, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:80 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 27, "", "", "", ""], "isController": false}, {"data": ["Edit", 1000, 435, "500/Internal Server Error", 226, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 180, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:80 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 28, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 1, "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Poll-1", 967, 384, "500/Internal Server Error", 264, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 120, "", "", "", "", "", ""], "isController": false}, {"data": ["Invite-1", 947, 329, "500/Internal Server Error", 187, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 141, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 1, "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Poll", 1000, 417, "500/Internal Server Error", 264, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 123, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:80 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 28, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:80 failed to respond", 1, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 1], "isController": false}, {"data": ["LoginP", 1000, 255, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 202, "500/Internal Server Error", 53, "", "", "", "", "", ""], "isController": false}, {"data": ["Dashboard-1", 605, 371, "500/Internal Server Error", 261, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 110, "", "", "", "", "", ""], "isController": false}, {"data": ["LikeComment", 1000, 552, "500/Internal Server Error", 386, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 133, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:80 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 28, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 5, "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Invite", 1000, 382, "500/Internal Server Error", 209, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 144, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:80 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect", 28, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 1, "", ""], "isController": false}, {"data": ["Edit-1", 941, 376, "500/Internal Server Error", 214, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 161, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 1, "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
