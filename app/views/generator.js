var accounts = {
			
		};
		
		function getMDAccountOptions()
		{
			return {
				"banned": false,
                "loginOnly": false,
                "autoReload": false,
                "cacheEnabled": false,
                "giftsBugAck": false,
                "testing": false,
                "password": "q1w2e3r4q1w2e3r4",
                "ign": "PleaseReGrabData"	
			}
		}
		$(document).ready(function(){
			
			console.log("got accounts: " + accounts);
			$('#accountList').bind('input propertychange', function() {
				if($('#accountList').val().includes(":") && $('#accountList').val().includes("@")){
					$("#createAccountButton").attr('class', 'btn btn-primary');
					$("#createAccountButton").prop("disabled",false);
				}
				else
				{
					$("#createAccountButton").attr('class', 'btn btn-danger');
					$("#createAccountButton").prop("disabled",true);
				}
			});
			
			$("button").click(function(){
				let accountsCreated = {};
				logString("-----------------------------------------");
				let accountList = document.getElementById("accountList").value;
				console.log("got account list. it is: " + accountList);
			
				console.log("sending post");
				arrayOfLines = accountList.match(/[^\r\n]+/g);
				for(line of arrayOfLines){
				
					if(line.includes(":") && line.includes("@")){
						let email = line.split(":")[0];
						let password = line.replace(email + ":", "");
						let postData = {
							email: email,
							password: password
						};
						console.log("creating account: " + email + " : " + password);
						if(password.length > 7)
							$.post("create", postData, function(data){createAccountHandler(email,password,data)});
						else
						{

							logString("Error could not create account: " + email + " the password was too short it must be atleast 8 characters");
						}
					}
				}
				

			});
			
			function saveMuleDump()
			{
			
				let postData = {data: accounts};
				console.log("Saving mule dump");
				$.post("muledump_add", postData);
			}
			
			function createAccountHandler(email,password,data)
			{
				if(!data.toLowerCase().includes("error"))
				{
					accountCreated(email,password,data);
				}
				else
				{
					accountCreationFailed(email,password,data);
				}
				logString("-----------------------------------------");
			}
			
			function accountCreationFailed(email,password, webResult)
			{
				logString("Account creation failed for: " + email + " reason: " + webResult);
			}
			
			function accountCreated(email, password, webResult)
			{
			console.log("account created. web res: " + webResult);
				accounts[email] = getMDAccountOptions();
				accounts[email].password = password;
				logString("Successfully created account : " + email);
				if(document.getElementById('useMD').checked) {
					saveMuleDump();
					alert("Saving to muledump:" + email);
				}
			}

			function logString(stringData)
			{
				if(stringData.toLowerCase().includes("error"))
				{
					if(document.getElementById('alert').checked) {
						alert("Error: : " + stringData);
					} 
				}
				$("#statusLog").val($("#statusLog").val() + '\n' + stringData);
			}
			
		});