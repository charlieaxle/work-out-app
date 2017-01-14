$(document).ready(function(){
	
function createUser(vuserName, vfirstName,vlastName){
		$.ajax({
		type: 'POST',
		dataType: 'HTTP',
		data: {userName: vuserName, firstName: vfirstName, lastName: vlastName },
		url:'../users',
		success: function(data){
		return 1;
		}
		})
	};

function getUserInfo(userName) {
	$.ajax({
		type: 'GET',
		dataType: 'JSON',
		url:'../users/init/'+userName,
		success: function(data){
			
			if (typeof data[0] === "undefined") {
				alert("Username is incorrect");
				return -1;
			}
			$("#routineGreeting").html("Hi "+data[0].info.userName+" , select a workout routine to begin:");
			for (var i =0; i< data[0].routines.length; i++) {
				if (i % 3 == 0) {
					$("#routineGreeting").append("<div class='row'>");
				}
				if (i % 3 == 2) {
					$("#routineGreeting").append("</div>");	
				}
				$("#routineGreeting").append("<button type='button' class='btn btn-default'>"+data[0].routines[i].name+"</button>");
			
			}
		CURRENT_USER_ID = data[0]._id;
		return data[0];
		}
	})
}

function addRoutine( userID, newRoutineName, exArr) {
	var dataObj = {};
	dataObj['newRoutine'] = newRoutineName;

	dataObj['exercises'] = exArr;

	$.ajax({
		type: 'PUT',
		dataType: 'JSON',
		url:'../addroutine/'+userID,
		data: dataObj,
		success: function(data) {
			return 1;
		}
	})	
}	


$('#createUser').click(function() {
 	userName = $("#userName").val();
	firstName = $("#fname").val();
	lastName=  $("#lname").val();
	createUser(userName ,firstName,lastName );
	$("#createUserBucket").css("display","none");
	$("#userRoutines").css("display","block");
	getUserInfo(userName);
	CURRENT_USER = userName;
	$("#routineGreeting").html("Hi "+userName+" , select a workout routine to begin:");
});


$('#createUserForm').click(function() {
 	$("#loginBucket").css("display","none");
	$("#createUserBucket").css("display","block");
	
	CURRENT_USER= userName ;
});



$("#logIn").click(function() {
	
	newUser = $('#logInField').val();
	getUserInfo(newUser);
	CURRENT_USER = newUser;
	if (typeof CURRENT_USER_ID === "undefined" || CURRENT_USER_ID == 0) {
		return -1;
	}
	else {
	$("#loginBucket").css("display","none");
	$("#userRoutines").css("display","block");
	}
	
});


$('#createRoutine').click(function() { 	
	$("#userRoutines").css("display","none");
	$("#createRoutineBucket").css("display","block");
	
});



$('#saveRoutine').click(function() {
	var newRoutineName = $('#newRoutineName').val().toString();
	var exArr = [];
	var elementsName = document.getElementsByClassName('inputCreateRoutineName');
	var elementsSets = document.getElementsByClassName('inputCreateRoutineSets');
	var elementsReps = document.getElementsByClassName('inputCreateRoutineReps');
	for (var i=0; i< elementsName.length; i++){
		if (elementsName[i].value !== ""){
			tempObj = {};
			tempObj.name = elementsName[i].value;
			tempObj.sets = elementsSets[i].value;
			tempObj.reps = elementsReps[i].value;
			exArr.push(tempObj);
			console.log(JSON.stringify(tempObj));
		}
	}
	console.log(exArr);
	addRoutine(CURRENT_USER_ID, newRoutineName, exArr);
	$("#userRoutines").css("display","block");
	$("#createRoutineBucket").css("display","none");
	getUserInfo(CURRENT_USER);
});


$('#logOut').click(function() {
	$("#createRoutineBucket").css("display","none");
	$("#userRoutines").css("display","none");
	$("#createUserBucket").css("display","none");
	$("#loginBucket").css("display","block");
	CURRENT_USER= "";
	CURRENT_USER_ID= 0;
});

});