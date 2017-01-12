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

	for (var i=0; i<exArr.length; i++){
		dataObj[i] = exArr[i];
	};

	$.ajax({
		type: 'PUT',
		dataType: 'HTTP',
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
});


$('#createUserForm').click(function() {
 	$("#loginBucket").css("display","none");
	$("#createUserBucket").css("display","block");
	CURRENT_USER= userName ;
});



$("#logIn").click(function() {
	$("#loginBucket").css("display","none");
	$("#userRoutines").css("display","block");
	newUser = $('#logInField').val();
	getUserInfo(newUser);
	CURRENT_USER = newUser;
});


$('#createRoutine').click(function() { 	
	$("#userRoutines").css("display","none");
	$("#createRoutineBucket").css("display","block");
	
});



$('#saveRoutine').click(function() {
	var newRoutineName = $('#newRoutineName').val().toString();
	var exArr = [];
	var elements = document.getElementsByClassName('inputCreateRoutineName');
	console.log(elements[1].value.toString());
	for (var i=0; i< elements.length; i++){
		if (elements[i].value !== ""){
		
			exArr.push(elements[i].value);
		}
	}

	addRoutine(CURRENT_USER_ID, newRoutineName, exArr);
	$("#userRoutines").css("display","block");
	$("#createRoutineBucket").css("display","none");
	getUserInfo(newUser);
});


$('#logOut').click(function() {
	$("#createRoutineBucket").css("display","none");
	$("#userRoutines").css("display","none");
	$("#createUserBucket").css("display","none");
	$("#loginBucket").css("display","block");
	CURRENT_USER= "";
});

});