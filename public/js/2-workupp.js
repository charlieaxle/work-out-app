$(document).ready(function(){
	function createUser(val){
		$.ajax({
		type: 'POST',
		dataType: 'HTTP',
		data: {username: val},
		url:'../users',
    
   
		success: function(data){
		return 1;
		}
		})
	};
$('#search').click(function() {
 userName = $("#inputBar").val();
createUser(userName);
});
});