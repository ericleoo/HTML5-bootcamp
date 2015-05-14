window.addEventListener("load", function() {
  var inputBox = document.getElementById('inputBox');
	var sendButton = document.getElementsByTagName('button')[0];
	var clearButton = document.getElementsByTagName('button')[1];
	var messageBox = document.querySelector('#messageBox');
	
	var picButton = document.getElementById('pic');
	
	var username = document.getElementById('username').textContent;	
	var host = '172.22.148.195';
	var port = '3000';
	var socket = new WebSocket('ws://'+host+':'+port);
	
	window.addEventListener('beforeunload', function(){
		socket.close();
	});
	
	function logToDom(type,username,msg){
		if(type === 'text'){
			var p = document.createElement('p');
			p.textContent = username.trim() + ':'.trim() + msg;
			messageBox.insertBefore(p,messageBox.firstChild);
		}
		else if(type === 'pic'){
			var img = new Image();
			img.src=  msg;
			img.width = 100;
			img.height = 100;
			
			messageBox.insertBefore(img,messageBox.firstChild);
			logToDom('text',username, '');
		}
		
	};
	
	
	
	function addMessage(type){
		logToDom(type, username, inputBox.value);
		socket.send(JSON.stringify({content: inputBox.value,from: username.trim(),type: type,
		}));
		inputBox.value = '';
		
	};
	
	
	function clearMessage(){
		inputBox.value = '';
		
		while (messageBox.firstChild) 
			messageBox.removeChild(messageBox.firstChild);
	};
	
	socket.onopen = function(){
		console.log("CONNECTED!");
		sendButton.addEventListener('click',function(){
			addMessage('text');
		});
		
		inputBox.addEventListener('keyup',function(e){
			if(e.keyCode === 13){
				addMessage();
			}
		});
		
		picButton.addEventListener('click',function(){
			addMessage('pic');
		});	
		
		socket.onerror = function(e){
			console.error(e);
		};
		socket.onclose = function(){
		
		};
		socket.onmessage = function(e){
			console.log(e.data);
			try{
				var msg = JSON.parse(e.data);
				
				logToDom(msg.type, msg.from.trim(), msg.content);
				
			}catch(e){
				console.error(e);
			}
		};
		
		
		
	};
	clearButton.addEventListener('click',clearMessage);
  
});
