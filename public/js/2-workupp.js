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
				console.log(JSON.stringify(data[0].routines[i].name));
				if (i % 3 == 0) {
					$("#routineGreeting").append("<div class='row'>");
				}
				if (i % 3 == 2) {
					$("#routineGreeting").append("</div>");	
				}
				$("#routineGreeting").append("<button type='button' class='btn btn-default'>"+data[0].routines[i].name+"</button>");
			
			}
		console.log(JSON.stringify(data[0]._id));
		CURRENT_USER_ID = data[0]._id;
		return data[0];
		}
	})
}

function addRoutine( userID, newRoutineName) {
	$.ajax({
		type: 'PUT',
		dataType: 'HTTP',
		url:'../addroutine/'+userID,
		data: {newRoutine: newRoutineName},
		success: function(data) {
			console.log('routine added');
			console.log(newRoutineName);
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
	console.log(CURRENT_USER_ID);
	console.log(newRoutineName);
	addRoutine(CURRENT_USER_ID, newRoutineName);
	
	
});

});