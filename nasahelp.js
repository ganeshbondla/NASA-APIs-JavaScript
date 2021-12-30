// fetching earth near objects using nasa apis

// get list of objects
async function GetListOfNasaData()
{
    try
    {

        let response = await fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=<your nasa api-key here>");

        let data = await response.text();

        const obj = JSON.parse(data);

        console.log(obj);

        //passing objects data to data tables
        const nearObjects = obj['near_earth_objects']['2015-09-07'];

        //print total number fo near elemnts
        document.getElementById("nasaData_total_elements").innerText = "Total Near Objects : " + nearObjects.length + "";

        var temp = "";

        nearObjects.forEach(element => {
            temp += "<tr>";
            temp += "<td>" + element.id + "</td>";
            temp += "<td>" + element.name + "</td>";
            temp += "<td>" + element.absolute_magnitude_h + "</td>";
            temp += "<td><button id='" + element.id + "' onclick='FindDetailsOfSingleObject(" + element.id + ")' class='btn btn-sm btn-primary'>View Details</button></td>";
            temp += "</tr>";
        });

        document.getElementById('mainData').innerHTML = temp;

    } 
    catch(error)
    {
        console.log(error);
    }
}


//get single object details
async function FindDetailsOfSingleObject(objId)
{
    //loding button
    $("#"+objId).html('<i class="fa fa-spinner fa-spin"></i> fetching data...');

    try
    {
        let singleObj = await fetch("http://www.neowsapp.com/rest/v1/neo/" + objId + "?api_key=<your nasa api-key here>");

        let singleObjectResponse = await singleObj.json();

        console.log(singleObjectResponse);

        //modal header title
        document.getElementById("nameOfObjectHere").innerHTML = "Object : <i>" + singleObjectResponse.name + "</i>";

        //passing object data to modal body
        var modalBodyData = "";

        modalBodyData += "<tr>";
        modalBodyData += "<th class='align-middle'>Object Id</th>";
        modalBodyData += "<td class='align-middle'>" + singleObjectResponse.id + "</td>";
        modalBodyData += "<tr>";
        modalBodyData += "<tr>";
        modalBodyData += "<th class='align-middle'>Estimated Diameter ( In KM's )</th>";
        modalBodyData += "<td class='align-middle'>estimated_diameter_max : " + singleObjectResponse["estimated_diameter"]["kilometers"]["estimated_diameter_max"] + "<hr>estimated_diameter_min : " + singleObjectResponse["estimated_diameter"]["kilometers"]["estimated_diameter_min"] + "</td>";
        modalBodyData += "<tr>";

        document.getElementById('singleObjectDataHere').innerHTML = modalBodyData;
        
        $("#singleElementData").modal();

        //back to non-loading button
        $("#"+objId).html('View Details');
    }
    catch(error)
    {
        console.log(error);
    }

}

GetListOfNasaData()


