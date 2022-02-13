function SendNotify(title,message,type, link = "") {
	var e = $.notify(
	{
		title: title,
		message: message,
		
	},
	{
		type: type,
		
		
		allow_dismiss: true,
		newest_on_top: false,
		mouse_over: true,
		showProgressbar: false,
		spacing: 10,
		timer: 2000,
		placement: {
			from: 'bottom',
			align: 'right'
		},
		offset: {
			x: 30,
			y: 30
		},
	
		delay: 1000,
		z_index: 10000,
		animate: {
			enter: "animated fadeInDown",
			exit: "animated fadeOutDown"
		}
	});
	$('.alert[data-notify] .close').html('');
	$('.alert[data-notify]').removeClass('col-xs-11 col-sm-4');
	if(link) setTimeout(() => RedirectNotify(link), 1000); 
}
function RedirectNotify(link) {
	var e = $.notify(
		{
			
			message: 'Переход на другу страницу',
			
			url: link
		},
		{
			type: 'info',
			
			
			allow_dismiss: true,
			newest_on_top: false,
			mouse_over: true,
			showProgressbar: true,
			spacing: 10,
			timer: 2000,
			placement: {
				from: 'bottom',
				align: 'right'
			},
			offset: {
				x: 30,
				y: 30
			},
			delay: 1000,
			z_index: 10000,
			animate: {
				enter: "animated fadeInDown",
				exit: "animated fadeOutDown"
			}
		});
		setTimeout(() => window.location.href = link, 3000);
		$('.alert[data-notify] .close').html('');
	$('.alert[data-notify]').removeClass('col-xs-11 col-sm-4');
		
}


var TxtRotate = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];
  
	if (this.isDeleting) {
	  this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
	  this.txt = fullTxt.substring(0, this.txt.length + 1);
	}
  
	this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
	var that = this;
	var delta = 300 - Math.random() * 100;
  
	if (this.isDeleting) { delta /= 2; }
  
	if (!this.isDeleting && this.txt === fullTxt) {
	  delta = this.period;
	  this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
	  this.isDeleting = false;
	  this.loopNum++;
	  delta = 500;
	}
  
	setTimeout(function() {
	  that.tick();
	}, delta);
  };
  
  window.onload = function() {
	var elements = document.getElementsByClassName('txt-rotate');
	for (var i=0; i<elements.length; i++) {
	  var toRotate = elements[i].getAttribute('data-rotate');
	  var period = elements[i].getAttribute('data-period');
	  if (toRotate) {
		new TxtRotate(elements[i], JSON.parse(toRotate), period);
	  }
	}
	// INJECT CSS
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
	document.body.appendChild(css);
  };
// window.randomize = function() {
// 	$('.ko-progress-circle').attr('data-progress', Math.floor(Math.random() * 100));
// }
// setTimeout(window.randomize, 200);
// $('.ko-progress-circle').click(window.randomize);
$(function(){
	
	$('[data-toggle="tooltip"]').tooltip();
	$('.mobile_menu').click(function(e){
		e.preventDefault();
		$('html').toggleClass('no_scroll');
		$(this).toggleClass('active');
		$('.nav_menu').toggleClass('active');
	});
	$('select').niceSelect();
    $('.change_form').click(function() {
		$(`#${$(this).data('hide')}`).hide();
		$(`#${$(this).data('show')}`).show();
	});
});
function openModal(name) {
	$('.modal_wrap').addClass()
}
function copy(ip) {
	document.oncopy = function(event) {
		event.clipboardData.setData("Text", ip);
		event.preventDefault();
		SendNotify('Информация','IP скопирован в буфер обмена','info');
	};
	document.execCommand("Copy");
	document.oncopy = undefined;
	
	
}
var forms_app = new Vue({
	el: '.vueForms',
	data: {
		
	
	},
	methods: {
		
		onSubmit: function(event) {
			
			grecaptcha.ready(function() {
				grecaptcha.execute($('meta[name="recaptha_public"]').attr('content'), {action: 'homepage'}).then(function(token) {
					
					$('.g-recaptcha-response').val(token);
					var form = event.target;
					$('#'+$(form).attr('id')+' button .spinner-border').remove();
					$('#'+$(form).attr('id')+' button').attr('disabled', true);
					$('#'+$(form).attr('id')+' button').append('<div class="spinner-border text-light" style="margin-left: 10px;width: 20px; height: 20px;display: none" role="status"></div>');
					$('#'+$(form).attr('id')+' button .spinner-border').fadeIn();
					$.ajax({
						type: $(form).attr('method'),
						url: $(form).attr('action'),
						data: new FormData(form),
						contentType: false,
						cache: false,
					
						processData: false,
						success: function(result) {
							
							setTimeout(() => $('#'+$(form).attr('id')+' button .spinner-border').fadeOut(), 2000);
							$('#'+$(form).attr('id')+' button').attr('disabled', false);
							json = jQuery.parseJSON(result);
							SendNotify(json.header,json.message,json.status,json.url);
							if(json.status != 'success') $('#'+$(form).attr('id')+' button').attr('disabled', false);
							
						}
					});
				});
			});
		}
		
	}
});

var modals_app = new Vue({
	el: '.modals_block',
	data: {
		
	
	},
	methods: {
		openModal: function(modal) {
			$('.modal_wrap').addClass('active');
			$('.modal_block.'+modal).show();
			let timerId = setInterval(() => {
				$('.modal_block.'+modal).addClass('active');
				clearInterval(timerId);
			}, 10);
		
		},
		closeModal: function(modal) {
			$('.modal_block.'+modal).removeClass('active');
			let timerId = setInterval(() => {
				$('.modal_block.'+modal).hide();
				$('.modal_wrap').removeClass('active');
				clearInterval(timerId);
			}, 300);
			// $('.modal_wrap').removeClass('active');
			
		},
		onSubmit: function(event) {
			
			grecaptcha.ready(function() {
				grecaptcha.execute($('meta[name="recaptha_public"]').attr('content'), {action: 'homepage'}).then(function(token) {
					
					$('.g-recaptcha-response').val(token);
					var form = event.target;
					$('#'+$(form).attr('id')+' button .spinner-border').remove();
					$('#'+$(form).attr('id')+' button').attr('disabled', true);
					$('#'+$(form).attr('id')+' button').append('<div class="spinner-border text-light" style="margin-left: 10px;width: 20px; height: 20px;display: none" role="status"></div>');
					$('#'+$(form).attr('id')+' button .spinner-border').fadeIn();
					$.ajax({
						type: $(form).attr('method'),
						url: $(form).attr('action'),
						data: new FormData(form),
						contentType: false,
						cache: false,
					
						processData: false,
						success: function(result) {
							
							setTimeout(() => $('#'+$(form).attr('id')+' button .spinner-border').fadeOut(), 2000);
							$('#'+$(form).attr('id')+' button').attr('disabled', false);
							json = jQuery.parseJSON(result);
							SendNotify(json.header,json.message,json.status,json.url);
							if(json.status != 'success') $('#'+$(form).attr('id')+' button').attr('disabled', false);
							
						}
					});
				});
			});
		}
		
	}
});
