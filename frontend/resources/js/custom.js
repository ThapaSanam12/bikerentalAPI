$(document).ready(function () {

	$('#registerForm').submit(function (event) {
		event.preventDefault();

		var userForm = {
			firstname:$('#firstname').val(),
			lastname : $('#lastname').val(),
			username : $('#username').val(),
			password : $('#password').val()

		}

		$.ajax({

			url:'http://localhost:3000/v1/users/register',
			method:'POST',
			contentType:'application/json',
			data: JSON.stringify(userForm),

			success: function(result,status) {
				$('#message').html(result.message)
			},

			error:function(jqXHR,status) {
				$('#message').html(jqXHR.responseJSON.message)
			}
		})

	})


	$('#loginForm').submit(function (event) {
		event.preventDefault();

		var userForm2 = {

			username : $('#usernamelogin').val(),
			password : $('#passwordlogin').val()

		}


		$.ajax({

			url:'http://localhost:3000/v1/users/auths',
			method:'POST',
			contentType:'application/json',
			data: JSON.stringify(userForm2),

			success: function(result,status) {
				$('#message2').html(result.message)
				window.location.href="items.html"
				// console.log('hello');
			},


			error:function(jqXHR,status) {
				$('#message2').html(jqXHR.responseJSON.message)

			}
		})

	})

	$('#itemForm').submit(function (event) {
		event.preventDefault();
		var formData = new FormData();
		var userForm3 = {

			Name : $('#Name').val(),
			Desc: $('#Desc').val(),
			Price: $('#Price').val(),
	
			imgItem: $('#imgItem').val()


		}
		for (key in userForm3) {
			console.log(userForm3[key]);
			formData.append(key, userForm3[key]);
		}

		$.ajax({

			url:'http://localhost:3000/v1/addItems',
			method: 'POST',
			contentType: false,
			processData:false,
			dataType:'json',
			data:formData,

			success: function(result,status) {
				// $('#message3').html(result.message)
				// window.location.href="items.html"
				console.log('hello');
			},


			error:function(jqXHR,status) {
				// $('#message3').html(jqXHR.responseJSON.message)
			}
		})

	})


	$('#getItems').click(function (event) {


		$.ajax({

			url:'http://localhost:3000/v1/items',
			method:'GET',
			contentType:'application/json',
			dataType:'json',

			success: function(result,status) {
				console.log(result)
			},


			error:function(jqXHR,status) {
				console.log(jqXHR)
			}
		})

	})

})