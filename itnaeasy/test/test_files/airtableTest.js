function getRecord(){

//alert("hi223");
	var Airtable = require('airtable');
	var base = new Airtable({apiKey: 'keyCMvZLwfukgJcLm'}).base('apperZh8Z4nPnCdER');

	base('Minutes Calculation').find('recQV7QRRZa94uig4', function(err, record) {
    if (err) { console.error(err); return; }
    console.log(record.get('Customer Names'));
	console.log(record.get('Call Start Time'));
 });

}

function retData(){

alert("hii339");

	var Airtable = require('airtable');
	var base = new Airtable({apiKey: 'keyfkx4FggBUftrZr'}).base('appG8XGSRNTM9PVdi');
	var recordID = "";
	
	base('Imported table').select({
		// Selecting the first 3 records in Grid view:
		//maxRecords: 10,
		view: "Grid view",
	}).eachPage(function page(records, fetchNextPage) {
		// This function (`page`) will get called for each page of records.
	
		records.forEach(function(record) {
			console.log('Retrieved', record.get('PRODUCT_CODE'));
			if(document.getElementById("mobileNumber")){
				if(document.getElementById("mobileNumber").value == record.get('PRODUCT_CODE')){
					alert("record : "+record.get('PRODUCT_CODE'));
					alert(" S. No.   : "+record.get(' S. No.  '));
					document.getElementById("readBox2").value = record.get(' S. No.  ');
					document.getElementById("readBox3").value = record.get('PRODUCT_NAME');
					document.getElementById("recordID").value = record.getId();
					alert(" S. No.   : "+record.get(' S. No.  '));
					recordID = record.getId();
				}
			}
		});

		// To fetch the next page of records, call `fetchNextPage`.
		// If there are more records, `page` will get called again.
		// If there are no more records, `done` will get called.
		fetchNextPage();

	}, function done(err) {
		alert("done : "+recordID);
		return recordID;
		if (err) { console.error(err); return; }
	});
}

function submitSession(){
	var Airtable = require('airtable');
	var base = new Airtable({apiKey: 'keyCMvZLwfukgJcLm'}).base('apperZh8Z4nPnCdER');
	var callDate = getCallDate();
	//alert(callDate);
	var customerName = document.getElementById("referID").value;
	if(customerName == ""){
		alert("Search the customer first");
		return false;
	}
	var callStart = getCallStartTime();
	//alert(callStart);
	if(document.getElementById("startTime").value == ""){
		alert("Start the session of "+document.getElementById("clientName").value+" first");
		return false;
	}
	var callEnd = getCallEndTime();
	//alert(callEnd);
	if(document.getElementById("endTime").value == ""){
		alert("End the session of "+document.getElementById("clientName").value+" first");
		return false;
	}

	//return false;
	
	base('Minutes Calculation').create({
	"Call Date": callDate,
	"Customer Names": [
		customerName
	],
	"Call Start Time": callStart,
	"Call End Time": callEnd
	}, function(err, record) {
		if (err) { console.error(err); return; }
		console.log(record.getId());
		if(record.getId() != ""){
			//alert("Ref ID 2 : "+record.getId());
			//document.location.href = 'C:\itnaeasy\test\test_files\successPage.html';
			//window.location="C:\itnaeasy\test\test_files\successPage.html";
			window.location.reload(false);
			alert("Data has been update in database");
			window.location.reload(true);
		}
	});
}

function displaySessionTime(){
	var ref = document.getElementById("referID").value;
	//alert(ref);
	if(ref != ""){
		document.getElementById("displaySessionTime").style.display = 'block';
	}
	else {
		document.getElementById("displaySessionTime").style.display = 'none';
	}
}

function getCallDate(){
	var today = new Date();
	//alert(today);
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
	dd = checkTime(dd);
	mm = checkTime(mm);
	
	return yyyy + "-" + mm + "-" + dd;
}

function getCallStartTime(){
	var date = getCallDate();
	var time = document.getElementById("startTime").value;
	
	return date + "T" + time + ".000Z";
	
}

function getCallEndTime(){
	var date = getCallDate();
	var time = document.getElementById("endTime").value;
	
	return date + "T" + time + ".000Z";
	
}

function phonenumber()  
{  
	inputtxt = document.getElementById("mobileNumber");
  var phoneno = /^\d{10}$/;  
  if((inputtxt.value.match(phoneno)))  
        {  
      return true;  
        }  
      else  
        {  
        alert("Enter valid mobile number only");  
        return false;  
        }  
}

function readRecords(){
	
	if(document.getElementById("mobileNumber").value == ""){
		alert("Enter Mobile number first");
		return false;
	}
	else {
		var mob = document.getElementById("mobileNumber").value;
		if(mob.length != 10){
			alert("Enter 10 digit Mobile number");
			return false;
		}
		else{
			phonenumber();
		}
	}
	
	var Airtable = require('airtable');
	var base = new Airtable({apiKey: 'keyCMvZLwfukgJcLm'}).base('apperZh8Z4nPnCdER');
	var recordID = "";
	//alert(document.getElementById("mobileNumber").value);
	var flag = "K";
	
	base('Main Dashboard').select({
		// Selecting the first 3 records in Grid view:
		//maxRecords: 10,
		view: "Grid View",
	}).eachPage(function page(records, fetchNextPage) {
		// This function (`page`) will get called for each page of records.
	
		records.forEach(function(record) {
			//console.log('Retrieved', record.get('Customer Name'));
			//alert("record : "+record.get('Mobile Number'));
			if(flag != "Y")
				flag = "N";
			
			if(document.getElementById("mobileNumber")){
				if(document.getElementById("mobileNumber").value == record.get('Mobile Number')){
					//alert("record : "+record.get('Mobile Number'));
					//alert(" S. No.   : "+record.get('Customer Name'));
					document.getElementById("clientName").value = record.get('Customer Name');
					document.getElementById("question1").value = record.get('Security Question 1');
					document.getElementById("answer1").value = record.get('Answer of Security Question 1:');
					document.getElementById("question2").value = record.get('Security Question 2');
					document.getElementById("answer2").value = record.get('Answer of Security Question 2:');
					document.getElementById("remainsTime").value = record.get('Minutes Remaining');
					document.getElementById("referID").value = record.getId();
					//alert(" S. No.   : "+record.get('Minutes Remaining'));
					recordID = record.getId();
					flag = "Y";
				}
			}
		});

		// To fetch the next page of records, call `fetchNextPage`.
		// If there are more records, `page` will get called again.
		// If there are no more records, `done` will get called.
		fetchNextPage();

	}, function done(err) {
		//alert("done : "+recordID);
		//return recordID;
		if (err) { console.error(err); 
		alert("Unable to connect to database");
		return; }
	});
	
	if(flag == "N")
		alert("Record not found in database");
	
}

function claerRecords(){
	//alert("clear");
	if(document.getElementById('referID')){
		document.getElementById('referID').value = "";
	}
	if(document.getElementById('clientName')){
		document.getElementById('clientName').value = "";
	}
	if(document.getElementById('question1')){
		document.getElementById('question1').value = "";
	}
	if(document.getElementById('answer1')){
		document.getElementById('answer1').value = "";
	}
	if(document.getElementById('question2')){
		document.getElementById('question2').value = "";
	}
	if(document.getElementById('answer2')){
		document.getElementById('answer2').value = "";
	}
	if(document.getElementById('startTime')){
		document.getElementById('startTime').value = "";
	}
	if(document.getElementById('endTime')){
		document.getElementById('endTime').value = "";
	}
	if(document.getElementById('remainsTime')){
		document.getElementById('remainsTime').value = "";
	}
	 //window.location.reload(true);
}

function startTime(id) {
    var today = new Date();
	//alert(today);
	if(document.getElementById("referID").value == ""){
		alert("Search the customer first..");
		return false;
	}
	if(id == 'endTime'){
		if(document.getElementById('startTime').value == ""){
			alert("Start the session first.");
			return false;
		}
	}
	
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
	if(id == 'startTime')
		document.getElementById('startTime').value =  h + ":" + m + ":" + s;
	if(id == 'endTime')
		document.getElementById('endTime').value =  h + ":" + m + ":" + s;
    //var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}