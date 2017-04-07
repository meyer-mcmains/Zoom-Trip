var imgNum = 2;
var main = 0;
var interval;
var up = false;

readSVG(imgNum);

$(document).on('wheel', zoom);

$(document).mousedown(function() {
    interval = setInterval(performWhileMouseDown, 50);
}).mouseup(function() {
    clearInterval(interval);
    up = true;
});

function performWhileMouseDown() {
    zoom();
}

function zoom() {

	var image = ($('.image'));
	var nextImage = ($('.nextImage'));
	var text = ($('.centerText'));

	if (main === 0) {
		imageMain(image);
		imageSmall(nextImage);
		increaseText(text);
	}
	else if (main === 1)
	{
		imageMain(nextImage);
		imageSmall(image);
	}

	if ($('.container').width() < image.width()+20 || ($('.container').height()-75) < image.height()+20 && main === 0) {
		pause();
	}
	else if ($('.container').width() < nextImage.width()+20 || ($('.container').height()-75) < nextImage.height()+20 && main === 0) {
		pause();
	}

	if ($('.container').width() < image.width() || ($('.container').height()-50) < image.height() && main === 0) {
		changeImage(image);
		main = 1;
	}
	else if ($('.container').width() < nextImage.width() || ($('.container').height()-50) < nextImage.height() && main === 1) {
		changeImage(nextImage);
		main = 0;
	}
}

function imageMain(image) {

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

function imageSmall(image) {

	var width = image.css('width');
	width = parseInt(width, 10);
	width += 2;

	var opacity = image.css('opacity');
	opacity = parseFloat(opacity, 10);
	opacity += 0.05;

	image.css('width', width);
	image.css('z-index', -1);
}

function increaseText(text) {
	var size = text.css('font-size');
	size = parseInt(size, 10);
	size += 20;

	var opacity = text.css('opacity');
	opacity = parseFloat(opacity, 10);
	opacity += 0.05;

	text.css('font-size', size);
	text.css('z-index', 1);
	text.css('opacity', opacity);
}

function changeImage(image) {
	imgNum++;
	$('#name').hide();
	$('#article').hide();
	//imgNum = (imgNum % 14) + 1; //Gary is a math wiz
	image.attr('src', 'images/' + imgNum + '.svg');
	image.css('width', 10);
	image.css('opacity', 0.5);

	readSVG(imgNum);
}

function readSVG(imgNum) {
	imgNum --;
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        getName(this);
	    }
	};
	xhttp.open("GET", "images/" + imgNum + ".svg", true);
	xhttp.send();

	var xhttp2;
	xhttp2 = new XMLHttpRequest();
	xhttp2.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        getName2(this);
	    }
	};
	xhttp2.open("GET", "images/" + imgNum + ".svg", true);
	xhttp2.send();
}

function getName(xml) { 
    var xmlDoc = xml.responseXML;
    var tag = xmlDoc.getElementsByTagName("title")[0];
    var text = tag.childNodes[0];
    console.log(text);
    $('#name').html(text);
}

function getName2(xml) { 
    var xmlDoc = xml.responseXML;
    var tag = xmlDoc.getElementsByTagName("wiki")[0];
    var text = tag.childNodes[0];
    console.log(text);
    $('#article').html(text);
}

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

function img1Error(image) {
	$('.image').css('display', 'none');
	$('.centerText').load('images/' + imgNum + '.txt');
}