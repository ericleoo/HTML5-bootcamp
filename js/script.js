document.addEventListener('DOMContentLoaded', function(){
	var inputBox = document.getElementById('inputBox');
	var sendButton = document.getElementsByTagName('button')[0];
	var clearButton = document.getElementsByTagName('button')[1];
	var messageBox = document.querySelector('#messageBox');
	
	function addMessage(){
		var p = document.createElement('p');
		p.textContent = inputBox.value;
		messageBox.appendChild(p);
		inputBox.value = '';
	};
	
	function clearMessage(){
		inputBox.value = '';
		
		while (messageBox.firstChild) 
			messageBox.removeChild(messageBox.firstChild);
	};
	
	sendButton.addEventListener('click',addMessage);
	clearButton.addEventListener('click',clearMessage);
	
	inputBox.addEventListener('keyup',function(e){
		if(e.keyCode === 13){
			addMessage();
		}
	});	
});
