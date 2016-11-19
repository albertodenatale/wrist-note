var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
		var setForEdit = function(e){
			var name = $(this).find('.name').text();
			$(this).remove();
			app.init(name);
		};
		
		app.init('','');
		app.initToggle();
		app.setSubmitButton();
		
		$('.list').on('click', '.person.occurrence', setForEdit);
    },
	init: function(name){
		$('.person.name').focus();
		$('.person.name').val(name);
	},
	setSubmitButton:function(){
		$('.addContact').on('click',app.add);
		$('.addContact').hide();
	},
	initToggle: function(){
		$('#toggle').on('change', function(){ 
			if($(this).is(':checked')) { 
				app.turnAutoOn();
			} 
			else{
				app.turnAutoOff();
			}
		});

		$('#toggle').bootstrapToggle("on");
	},
	add:function(){
		var name = $('.person.name').val();
		
		$('.list').prepend('<div class="person occurrence"><legend><span class="name">'+name+'</span></legend></div>');
		app.init('','');
	},
	turnAutoOn:function(){
		var addContact = function(id){
			clearInterval(id);
			app.add();
		};
		
		app.setAutoswitchOn('.person.name', addContact);
		$('.addContact').hide();
	},
	turnAutoOff:function(){
		$('.person.name').off(); 
		clearInterval(app.intervalId);
		$('.addContact').show();
	},
	intervalId: -1,
	setAutoswitchOn:function(selector, callback){
		var $element = $(selector);
		var element = $element.val();
		var last, alreadySet=false;
		
		var myTimer = function() {
			var timeStamp = Math.floor(Date.now());
			
			if(timeStamp-last > 800){
				callback(app.intervalId);
				alreadySet = false;
			}
		};
		
		$element.on('keydown', function(e){
			var element = $element.val();
			
			if(element.length > 2 && !alreadySet){
				alreadySet=true;
				last = Math.floor(Date.now());
				app.intervalId = setInterval(function(){ myTimer() }, 1000);
			}
		});
		
		$element.on('keydown', function(e){ last = Math.floor(Date.now()); });
	}
};
