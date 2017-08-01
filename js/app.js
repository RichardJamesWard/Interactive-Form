////////////////////////////// BASIC INFO //////////////////////////////
////////////////////////////////////////////////////////////////////////

// When the page loads, give focus to the first text field
window.onload = function() {
  var input = $("#name").focus();
}

// A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu
$('#title').change(function(){
	if ($("#title").val() == "other") {
		//Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field.
		$('#basic-info').append('<input type="text" id="other-title" placeholder="Your Job Role" name="otherjob">');	
	}
  });


////////////////////////////// T-SHIRT INFO //////////////////////////////
//////////////////////////////////////////////////////////////////////////

// For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu
$("#colors-js-puns").hide();
$('#design').change(function(){	
	if ($("#design").val() == "js puns") {	
		$("#colors-js-puns").show();
		$('#color').html('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option><option value="gold">Gold (JS Puns shirt only)</option>');
	} else if ($("#design").val() == "heart js") {
		$("#colors-js-puns").show();
		$('#color').html('<option value="tomato">Tomato (I &#9829; JS shirt only)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>');
	} else	{
		$("#colors-js-puns").hide();
	}
});


////////////////////////////// ACTIVITIES SECTION /////////////////////////////
///////////////////////////////////////////////////////////////////////////////

var all 	     = $("input[name='all']")
var jsFrameworks = $("input[name='js-frameworks']")
var jsLibs 		 = $("input[name='js-libs']")
var express 	 = $("input[name='express']")
var node 		 = $("input[name='node']")
var buildTools   = $("input[name='build-tools']")
var npm 		 = $("input[name='npm']")

// As a user selects activities, a running total displays below the list of checkboxes
var totalCost = 0;
$('.activities').append('<div id="total"></div>');

//Function to update cost
var updateCost = function (cost) {
	totalCost += cost;
	document.getElementById("total").innerHTML = "Total: $" + totalCost;
};  


all.change(function(){
	if (all.is(':checked'))  {
		updateCost(+200);
	} else {	
		updateCost(-200);
	}
});

// If the user selects a workshop, don't allow selection of a workshop at the same date and time
jsFrameworks.change(function(){
	if (jsFrameworks.is(':checked'))  {
		express.prop("disabled", true);	
		express.parent().append('<span class="unavailable">&nbsp;&nbsp;&nbsp;&nbsp;Unavailable</span>');	
		updateCost(+100);
	} else {
		// When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled
		express.prop("disabled", false);
		express.parent().find('.unavailable').remove();
		updateCost(-100);
	}
});

jsLibs.change(function(){
	if (jsLibs.is(':checked'))  {
		node.prop("disabled", true);	
		node.parent().append('<span class="unavailable">&nbsp;&nbsp;&nbsp;&nbsp;Unavailable</span>');	
		updateCost(+100);
	} else {
		node.prop("disabled", false);
		node.parent().find('.unavailable').remove();
		updateCost(-100);
	}
});

express.change(function(){
	if (express.is(':checked'))  {
		jsFrameworks.prop("disabled", true);
		jsFrameworks.parent().append('<span class="unavailable">&nbsp;&nbsp;&nbsp;&nbsp;Unavailable</span>');
		updateCost(+100);		
	} else {
		jsFrameworks.prop("disabled", false);
		jsFrameworks.parent().find('.unavailable').remove();
		updateCost(-100);
	}
});

node.change(function(){
	if (node.is(':checked'))  {
		jsLibs.prop("disabled", true);
		jsLibs.parent().append('<span class="unavailable">&nbsp;&nbsp;&nbsp;&nbsp;Unavailable</span>');		
		updateCost(+100);
	} else {
		jsLibs.prop("disabled", false);
		jsLibs.parent().find('.unavailable').remove();
		updateCost(-100);
	}
});

buildTools.change(function(){
	if (buildTools.is(':checked'))  {
		updateCost(+100);
	} else {	
		updateCost(-100);
	}
});

npm.change(function(){
	if (npm.is(':checked'))  {
		updateCost(+100);
	} else {	
		updateCost(-100);
	}
});


////////////////////////////// PAYMENT INFO SECTION //////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


// Initially hide Paypal and Bitcoin info
$('#paypal, #bitcoin').hide();

// Set credit card as default method
$('#payment').val("credit card");


$('#payment').change(function(){
	// If PayPal is selected only show PayPal info
	if ($('#payment').val() === "paypal") {
		$('#credit-card, #bitcoin').hide();
		$('#paypal').show();
	// Else if Bitcoin is selected only show Bitcoin info	
	} else if ($('#payment').val() === "bitcoin") {
		$('#credit-card, #paypal').hide();
		$('#bitcoin').show();
	//Else only show credit card info	
	} else {
		$('#credit-card').show();
		$('#paypal, #bitcoin').hide();
	}
});


////////////////////////////// FORM VALIDATION //////////////////////////////
/////////////////////////////////////////////////////////////////////////////

 var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 var validMessage ="";
 var errorCount = 0;


// clciking submit runs validation function
$('form').submit(function (event){
	event.preventDefault();

	// Reset form validation 
	$(".validation-message").innerHTML = "";
	validMessage ="<b>Please correct the following errors before proceeding:</b><br>";
	$('#name').removeClass('error');
	$('#mail').removeClass('error');
	$('#cc-num').removeClass('error');
	$('#zip').removeClass('error');
	$('#cvv').removeClass('error');
	errorCount = 0;


	//Name field can't be blank
	if ($('#name').val() === "" ) {
		$('#name').addClass('error');
		validMessage += "<br>• Name field can't be blank";
		errorCount += 1;

	// Email field must be a validly formatted e-mail address	
	}  if ( !email.test($('#mail').val()) ) {
		$('#mail').addClass('error');
		validMessage += "<br>• Email field must be a validly formatted e-mail address";
		errorCount += 1;


	// Must select at least one checkbox under the "Register for Activities" section of the form	
	}  if (!all.is(':checked') && (!jsFrameworks.is(':checked') && (!jsLibs.is(':checked') && (!express.is(':checked') && (!node.is(':checked') && (!buildTools.is(':checked') && (!npm.is(':checked'))))))))  {
		validMessage += "<br>• You must select at least one activity";
		errorCount += 1;

	// Must select payment method
	}  if ($("#payment").val() === "select_method") {
		validMessage += "<br>• Payment method must be selected";
		errorCount += 1;

	// Credit card field should only accept a number 
	}  if ($("#payment").val() === "credit card" && !$.isNumeric($("#cc-num").val())) {
		$('#cc-num').addClass('error');
		validMessage += "<br>• Credit card field must contain a number";
		errorCount += 1;

	// Credit card field should only accept between 13 and 16 digits	
	}  if ($("#payment").val() === "credit card" && ($("#cc-num").val().length <13) || ($("#cc-num").val().length >16)) {
		$('#cc-num').addClass('error');
		validMessage += "<br>• Credit card number should be between 13 and 16 digits";
		errorCount += 1;

	// zipcode field should only accept a number 
	}  if ($("#payment").val() === "credit card" && !$.isNumeric($("#zip").val())) {
		$('#zip').addClass('error');
		validMessage += "<br>• Zip code field must contain a number";
		errorCount += 1;

	// zipcode field should only accept 5 digits	
	}  if ($("#payment").val() === "credit card" && ($("#zip").val().length != 5)) {
		$('#zip').addClass('error');
		validMessage += "<br>• Zip code number must be 5 digits";
		errorCount += 1;

	// CVV field should only accept a number 
	}  if ($("#payment").val() === "credit card" && !$.isNumeric($("#cvv").val())) {
		$('#cvv').addClass('error');
		validMessage += "<br>• CVV field must contain a number";
		errorCount += 1;

	// CVV field should only accept3 digits	
	}  if ($("#payment").val() === "credit card" && ($("#cvv").val().length != 3)) {
		$('#cvv').addClass('error');
		validMessage += "<br>• CVV number must be 3 digits";
		errorCount += 1;

	// If error count equals 0, all required fields are entered correctly 
	}  else if (errorCount === 0) {
		validMessage ="<h2>Thanks for registering for Full Stack Conf! Your details have been accepted</h2>";
		document.getElementById('validation-message').innerHTML = validMessage;
		$('form > fieldset').prop("disabled", true);
	}

		// Print validation message to the form 
		document.getElementById('validation-message').innerHTML = validMessage;
		$('#validation-message').show();	

});



