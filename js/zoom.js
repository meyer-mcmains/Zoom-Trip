var imgNum = 1;
var mainType;
var secondaryType;
var type;
var type2;
var main = $('#main');
var secondary = $('#secondary');
var one = 1;
var two = 1;
var first = 'first';
var second = 'second';
var up = false;
var interval;


//mouse down event
$(document).mousedown(function() {
    interval = setInterval(performWhileMouseDown, 50);
}).mouseup(function() {
    clearInterval(interval);
    up = true;
});

//if mouse down zoom
function performWhileMouseDown() {
    zoom();
}

//zoom function
function zoom() {
	if (one === 1) {
		get(1, imgNum);
		imgNum ++;
		one = 2;
		$('#name').fadeOut();
		$('#article').fadeOut();
	}
	else {
		if (mainType === 'image') {
			if (first === 'first') {
				zoomMainImage(type);
				checkImage(type);
			}
			else {
				zoomSecondaryImage(type);
			}
		}
		else {
			if (first === 'first') {
				zoomMainText(type);
				checkText(type);
			}
			else {
				zoomSecondaryText(type);
			}
		}
		
	}
	if (two === 1) {
		get(2, imgNum);
		imgNum ++;
		two = 2;
		$('#name').fadeOut();
		$('#article').fadeOut();
	}
	else {
		if (secondaryType === 'image') {
			if (second === 'first') {
				zoomMainImage(type2);
				checkImage(type2);
			}
			else {
				zoomSecondaryImage(type2);
			}
		}
		else {
			if (second === 'first') {
				zoomMainText(type2);
				checkText(type2);
			}
			else {
				zoomSecondaryText(type2);
			}
		}
		
	}
}

//attempt to get next file
function get(var1, var2) {
	$.ajax({
		url:'images/' + var2 + '.svg',
		error: function()
		{	
			var setClass;
			if (var1 === 1) {
				setClass = 'centerText';
			}
			else {
				setClass = 'centerText2';
			}
			changeText(var1, setClass, var2);
		},
		success: function()
		{
			var setClass;
			if (var1 === 1) {
				setClass = 'image';
			}
			else {
				setClass = 'nextImage';
			}
			changeImage(var1, setClass, var2);
		}
	});
}

//determine if image reaches container width
function checkImage(image) {
	var padding = 20;
	var toggle = 1;
	var number;
	if (($('.container').width()-50) < (image.width()+padding) || ($('.container').height()-50) < (image.height()+padding)) {
		if (first === 'first') {
			one = 1;
			first = 'second';
			second = 'first';
		}
		else {
			two = 1;
			first = 'first';
			second = 'second';
		}
		number = image.data('num');
		readSVG(number)
		pause();
	}
}

//determine if text is max size
function checkText(text) {
	if (250 < getTextSize(text)) {
		if (first === 'first') {
			one = 1;
			first = 'second';
			second = 'first';
		}
		else {
			two = 1;
			first = 'first';
			second = 'second';
		}
	}
}

//increase the size of the main image
function zoomMainImage(image) {

	var width = image.css('width');
	width = parseInt(width, 10);
	width += 20;

	var opacity = image.css('opacity');
	opacity = parseFloat(opacity, 10);
	opacity += 0.05;
	
	image.css('width', width);
	image.css('z-index', 1);
	image.css('opacity', opacity);
}

//increase the size of the secondary image
function zoomSecondaryImage(image) {

	var width = image.css('width');
	width = parseInt(width, 10);
	width += 2;

	var opacity = image.css('opacity');
	opacity = parseFloat(opacity, 10);
	opacity += 0.05;

	image.css('width', width);
	image.css('z-index', -1);
}

//increase the size of the main text
function zoomMainText(mainText) {
	var size = getTextSize(mainText);
	size += 10;

	var opacity = mainText.css('opacity');
	opacity = parseFloat(opacity, 10);
	opacity += 0.05;

	mainText.css('font-size', size + 'px');
	mainText.css('z-index', 1);
	mainText.css('opacity', opacity);
}

//increase the size of the secondary text
function zoomSecondaryText(secText) {
	var size = getTextSize(secText);
	size += 2;

	var opacity = secText.css('opacity');
	opacity = parseFloat(opacity, 10);
	opacity += 0.05;

	secText.css('font-size', size + 'px');
	secText.css('z-index', -1);
	secText.css('opacity', opacity);
}

//read in from the text file
function changeText(track, spec, num) {
	var string = 'images/' + num + '.txt';

	$.get(string, function(data) {
	text = '<div class="' + spec + '">'+ data + '</div>';
	if (track === 1) {
		$('#main').html(text);
	}
	else {
		$('#secondary').html(text);
	}
	inText = $('.' + spec);
	inText.css('font-size', '1px');
	inText.css('opacity', 0.5);
	if (track === 1) {
		type = inText;
		mainType = 'text';
	}
	else {
		type2 = inText;
		secondaryType = 'text';
	}
	}, 'text');
}

//read in from the image file
function changeImage(track, spec, num) {
	img = '<img data-num="'+ num +'" class="' + spec + '" src="images/' + num + '.svg"/>';
	if (track === 1) {
		$('#main').html(img);
	}
	else {
		$('#secondary').html(img);
	}
	image = $('.' + spec);
	image.css('width', 10);
	image.css('opacity', 0.5);
	if (track === 1) {
		type = image;
		mainType = 'image';
	}
	else {
		type2 = image;
		secondaryType = 'image';
	}
}

//read xml format
function readSVG(number) {
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        getName(this);
	    }
	};
	xhttp.open("GET", "images/" + number + ".svg", true);
	xhttp.send();

	var xhttp2;
	xhttp2 = new XMLHttpRequest();
	xhttp2.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        getName2(this);
	    }
	};
	xhttp2.open("GET", "images/" + number + ".svg", true);
	xhttp2.send();
}

//get the name from the xml
function getName(xml) { 
    var xmlDoc = xml.responseXML;
    var tag = xmlDoc.getElementsByTagName("title")[0];
    var text = tag.childNodes[0];
    $('#name').html(text);    
}

//get the content from the xml
function getName2(xml) { 
    var xmlDoc = xml.responseXML;
    var tag = xmlDoc.getElementsByTagName("wiki")[0];
    var text = tag.childNodes[0];
    $('#article').html(text);
}

//force stop zooming
function pause() {
	$('#name').fadeIn();
	$('#article').fadeIn();
	$(document).trigger('mouseup');
	while (up == true)
	{
		if($(document).click())
		{
			break;
		}
	}
}

//get font size
function getTextSize(object) {
	var size = object.css('font-size');
	size = parseInt(size, 10);
	return size;
}