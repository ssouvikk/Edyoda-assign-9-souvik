var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
var tbody = document.querySelector('#table-data table tbody');
var apiData = '';

var xhttp = new XMLHttpRequest();
xhttp.open("GET", url , true);
xhttp.send();

xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4) {
        var responseArr = apiData = JSON.parse(xhttp.responseText);
        for (var i = 0; i < responseArr.length; i++) {
            var tr = createTr(responseArr[i].id, responseArr[i].firstName, responseArr[i].lastName, responseArr[i].email, responseArr[i].phone);
            
            var rowId = document.createAttribute("id");
            rowId.value = "rowId"+ i;
            tr.setAttributeNode(rowId);

            var att = document.createAttribute("onClick");
            att.value = "clickedOn("+ i +")";
            tr.setAttributeNode(att);

            tbody.appendChild(tr);
        }
    }
}

function createTr(id, firstName, lastName, email , phone) {
    var tr = document.createElement('tr');
    tr.classList.add('data-row');

    var td = '';
    for (var i = 0; i < 5 ; i++) {
      td = document.createElement("td");
      td.classList.add('column'+(i+1));
      if(i==0){
        td.innerText = id;
      }else if(i==1){
        td.innerText = firstName;
      }else if(i==2){
        td.innerText = lastName;
      }else if(i==3){
        td.innerText = email;
      }else if(i==4){
        td.innerText = phone;
      }
      tr.appendChild(td)
    }
    return tr;
}

function clickedOn(idd) {
    console.clear()
    // document.querySelectorAll('#info-content div')[0].innerHTML = '<div><b>User selected:</b>'+ apiData[idd].firstName + ' ' + apiData[idd].lastName +'</div>';
    var htmlVal = '<div><b>User selected:</b> '+apiData[idd].firstName + ' ' +apiData[idd].lastName +'</div>'+
          '<div>'+
              '<b>Description: </b>'+
              '<textarea cols="50" rows="5" readonly>'+
                  apiData[idd].description+
              '</textarea>'+
          '</div>'+
          '<div><b>Address:</b>'+apiData[idd].address.streetAddress+' </div>'+
          '<div><b>City:</b> '+apiData[idd].address.city+ '</div>'+
          '<div><b>State:</b> '+apiData[idd].address.state+'</div>'+
          '<div><b>Zip:</b> '+apiData[idd].address.zip+'</div>';
    document.getElementById('info-content').innerHTML = htmlVal;
    document.getElementById('info-content').style.display = "block";
    var activeRow = document.querySelector('#table-data .active')
    if(activeRow){
      activeRow.classList.remove("active");
    }
    var row = document.getElementById('rowId'+idd);
    row.classList.add('active')
}

var searchBox = document.getElementById('search-box')
var searchFn = document.createAttribute("onkeyup");
searchFn.value = "search()"
searchBox.setAttributeNode(searchFn);

function search() {
    console.clear()
    var searchVal = document.getElementById("search-box").value.toUpperCase()
    var names = document.querySelectorAll('.column2')
    var tableRows = document.querySelectorAll('tbody tr');
    for(i=1;i<names.length;i++){
      if(names[i].innerText.toUpperCase().indexOf(searchVal)>-1){
        console.log('rowId'+(i-1))
          document.getElementById('rowId'+(i-1)).style.display = "block";
      }else{
          document.getElementById('rowId'+(i-1)).style.display = "none";
      }
    }
}