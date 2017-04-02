var imgNum = 2;
var main = 0;
var interval;

readSVG(imgNum);

$(document).on('wheel', zoom);

$(document).mousedown(function() {
    interval = setInterval(performWhileMouseDown, 50);
}).mouseup(function() {
    clearInterval(interval);  
});

function performWhileMouseDown() {
    zoom();
}

function zoom() {

	var image = ($('.image'));
	var nextImage = ($('.nextImage'));

	if (main === 0)
	{
		imageMain(image);
		imageSmall(nextImage);
	}
	else if (main === 1)
	{
		imageMain(nextImage);
		imageSmall(image);
	}

	if ($('.container').width() < image.width() || $('.container').height() < image.height() && main === 0)
	{
		changeImage(image);
		main = 1;
	}
	else if ($('.container').width() < nextImage.width() || $('.container').height() < nextImage.height() && main === 1)
	{
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

function changeImage(image) {
	imgNum += 1;
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
}

function getName(xml) { 
    var xmlDoc = xml.responseXML;
    var tag = xmlDoc.getElementsByTagName("title")[0];
    var text = tag.childNodes[0];
    console.log(text);
    $('#name').html(text);
}