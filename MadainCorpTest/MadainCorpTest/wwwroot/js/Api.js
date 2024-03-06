
//#region Parameters

const fname = '{firstName}';
const lname = '{lastName}';
const category = '[\"category1\",\"category2\",\"category3\"]';
const pretty = true;
let totalRows = 10;

var apiUrl = `http://filltext.com/?rows=${totalRows}&fname=${fname}&lname=${lname}&category=${category}&pretty=${pretty}`;
let currentPage = 0;
const itemsPerPage = 10;
var isCategory1Click = false;
var isCategory2Click = false;
var isCategory3Click = false;

const obj = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
};

var dataList = [];
var fiteredData = [];

//#endregion

//#region Call API
window.addEventListener("load", async function () {
    await GetData().then((x) => {
        if (x != false) {
            dataList = x;
            let tempSpliceData = x;
            FetchData(tempSpliceData);
        }
    })
});


async function GetData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        dataList = data

        return data;
    } catch (error) {
        alert('Error:', error);
        return false;
    }
}



//#endregion


function FetchData(data) {
    let finalDesign = '';
    $('#items').empty();

    if (data != null) {
        for (let i = 0; i < data.length; i++) {
            finalDesign += appendRow(data[i].fname, data[i].lname, data[i].category);
        }
    }
    let ediv = document.getElementById('items');
    ediv.insertAdjacentHTML('beforeend', finalDesign);

}


function appendRow(firstName, lastName, category) {

    let data = '';
    data = '<div class="col-lg-12 item"><div class="card flex-row"><p class="card-img-left example-card-img-responsive" data-letters="';
    data += firstName.charAt(0) + lastName.charAt(0);
    data += '"> </p><div class="card-body">';
    data += '<h4 class="card-title textName">';
    data += firstName + ' ' + lastName;
    data += '</h4>'
    data += '<span class="label label-primary categoryLabel">';
    data += category;
    data += '</span></div></div></div>'

    return data;

}

function filter(category) {
    
    document.getElementById("cat1").style.background = '#5bc0de';
    document.getElementById("cat2").style.background = '#5bc0de';
    document.getElementById("cat3").style.background = '#5bc0de';
    document.getElementById("cat1").style.borderColor = '#5bc0de';
    document.getElementById("cat2").style.borderColor = '#5bc0de';
    document.getElementById("cat3").style.borderColor = '#5bc0de';


    switch (category) {
        case "category1":
                isCategory1Click = !isCategory1Click;
           
            break;
        case "category2":
            isCategory2Click = !isCategory2Click;
            break;
        case "category3":
            isCategory3Click = !isCategory3Click;
            break;
        default:
        //code block
    }
    debugger
    let tempData = [];
    let tempDatalistFilter = [];
    
    tempDatalistFilter = Object.assign(dataList);
    if (isCategory1Click) {
        document.getElementById("cat1").style.background = '#FF0000';
        document.getElementById("cat1").style.borderColor = '#FF0000';

        tempData = (tempDatalistFilter.filter((el) => el.category.toLowerCase() == "category1"));

    }
    if (isCategory2Click) {
        document.getElementById("cat2").style.background = '#FF0000';
        document.getElementById("cat2").style.borderColor = '#FF0000';

        if (isCategory1Click) {
            tempData = (tempDatalistFilter.filter((el) => el.category.toLowerCase() == "category1" || el.category.toLowerCase() == "category2"));

        }
        else {
            tempData = (tempDatalistFilter.filter((el) => el.category.toLowerCase() == "category2"));

        }

    }
    if (isCategory3Click) {
        document.getElementById("cat3").style.background = '#FF0000';
        document.getElementById("cat3").style.borderColor = '#FF0000';

        if (isCategory2Click) {

            if (isCategory1Click) {
                tempData = (tempDatalistFilter.filter((el) => el.category.toLowerCase() == "category1" || el.category.toLowerCase() == "category2" || el.category.toLowerCase() == "category3"));

            }
            else {
                tempData = (tempDatalistFilter.filter((el) => el.category.toLowerCase() == "category2" || el.category.toLowerCase() == "category3"));

            }

        }
        else if (isCategory1Click) {
            tempData = (tempDatalistFilter.filter((el) => el.category.toLowerCase() == "category1" || el.category.toLowerCase() == "category3"));

        }
        else {
            tempData = (tempDatalistFilter.filter((el) => el.category.toLowerCase() == "category3"));

        }


    }
    $('#items').empty();
    if (tempData != null && tempData.length > 0) {
        totalRows = tempData.length;
        fiteredData = Object.assign( tempData);
        let tempSpliceData = Object.assign( tempData);

        FetchData(tempSpliceData);
    }
    else if (!isCategory3Click && !isCategory1Click && !isCategory2Click) {
        totalRows = dataList.length;
        fiteredData = [];
        let tempSpliceData = Object.assign( dataList);

        FetchData(tempSpliceData);

    }

}



//#endregion