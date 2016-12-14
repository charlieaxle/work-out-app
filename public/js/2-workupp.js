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
$('#createUser').click(function() {
 userName = $("#userName").val();
 firstName = $("#fname").val();
lastName=  $("#lname").val();
createUser(userName ,firstName,lastName );
});

$('#createUserForm').click(function() {
 $("#loginBucket").css("display","none");
$("#createUserBucket").css("display","block");
});






});