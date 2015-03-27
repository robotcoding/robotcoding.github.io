//Set of html tags, in variables for convenience
var pO = '<p';
var pC = '</p>';
var preO = '<pre';
var preC = '</pre>';
var ulO = '<ul';
var ulC = '</ul>';
var inputO = '<input';
var inputC = '</input>';
var labelO = '<label';
var labelC = '</label>';
var br = '<br>';
var divO = '<div';
var divC = '</div>';
var buttonO = '<button';
var buttonC = '</button>';
var textAO = '<textarea';
var textAC = '</textarea>';
var formO = '<form';
var formC = '</form>';
var articleO = '<article>';
var articleC = '</article>';

/**
 * 
 * @param question
 * @param divID
 * @param subtext
 * @returns {String}
 */
function addQuestion(question, divID, subtext) {
	var q = articleO + pO + ' class="question">' + question + pC;
	if(subtext !== undefined) {
		q += preO + ' class="subQuestion">' + subtext + preC;
	}
	return q;
}

/**
 * 
 * @param input
 * @param correct
 * @param anyCaps
 * @param divID
 */
function checkAnswer(input, correct, anyCaps, divID) {
	var isCorrect = input.length == correct.length;
	var i = 0;
	while(isCorrect && i < input.length) {
		if(anyCaps) {
			input[i] = input[i].toLowerCase();
			correct[i] = correct[i].toLowerCase();
		}
		
		var index = -1;
		var index = String(correct[i]).indexOf('|||');
		if(index > -1) {
			var answer1 = correct[i].substring(0, index - 1);
			var answer2 = correct[i].substring(index + 4);
			isCorrect = (input[i] == answer1) || (input[i] == answer2);
		} else {
			isCorrect = input[i] == correct[i];
		}
		i++;
	}
	
	//If the answer is correct
	if(isCorrect) {
		var contentDiv = $(divID);
		
		//Remove 'failed' class if the user failed it before
		if(contentDiv.attr('class').indexOf("failed") > -1) {
			contentDiv.removeClass("failed");
		}
		
		//Add on 'solved' classes and alter page buttons
		contentDiv.addClass("solved");
		contentDiv.find('input[type="submit"]').attr('disabled', true);
		contentDiv.find('input.next').attr('disabled', false);
		contentDiv.find('input.next').addClass("on");
		var button = contentDiv.parent().attr("id");
		$('[name="#' + button + '"]').addClass("solved");
		
	//If the answer is incorrect
	} else {
		var contentDiv = $(divID);
		
		//Add on 'failed' class
		contentDiv.addClass("failed");
	}
}

/**
 * 
 * @param correct
 * @param anyCaps
 * @param divID
 * @returns {Boolean}
 */
function answerSubmitSA(correct, anyCaps, divID) {
	var input = [];
	var div = $(divID);
	for(var i = 0; i < correct.length; i++) {
		input[i] = div.find('#answer' + i).val();
	}
	checkAnswer(input, correct, anyCaps, divID);
	return false;
}

/**
 * 
 * @param divID
 * @returns {Array}
 */
function getInputMC(divID) {
	var input = [];
	var allElements = document.getElementById(divID.substring(1)).getElementsByTagName('INPUT');
	var next = 0;
	for (var i = 0; i < allElements.length; i++) {
		var attr = allElements[i].checked;
		if (attr === true) {
	    // Checked box. Add to array.
			var temp = (allElements[i].getAttribute("id"));
			temp = temp.substring(temp.length - 1);
			input[next] = temp;
			next++;
	    }
	}
	return input;
}

/**
 * 
 * @param correct
 * @param anyCaps
 * @param divID
 * @returns {Boolean}
 */
function answerSubmitMC(correct, anyCaps, divID) {
	var input = getInputMC(divID);
	checkAnswer(input, correct, anyCaps, divID);
	return false;
}

/**
 * 
 * @param question
 * @param specs
 * @param divID
 * @param subtext
 */
function makeMultipleChoice(question, specs, divID, subtext) {
	var type = specs[0];
	var answers = specs[1];
	var correct = specs[2];
	var article = addQuestion(question, divID);
	var div = $(divID);
	var quiz = formO + ' id="f' + divID.substring(1) + '">\n';
	for(var i = 0; i < answers.length; i++) {
		var button = inputO + ' type="'+ type +'" name="' + question + '" id="answer' + i + '">' + answers[i] + inputC;
		quiz += button + br + '\n';
	}
	var submit = '<input type="submit" value="Submit">\n';
	var next = '<input type="button" class="next" value="Next" disabled="true">';
	quiz += submit + next + formC;
	article += quiz + articleC;
	div.append(article);
	document.getElementById("f" + divID.substring(1)).onsubmit = function() {return answerSubmitMC(correct, false, divID);};
}

/**
 * 
 * @param question
 * @param specs
 * @param divID
 * @param subtext
 */
function makeShortAnswer(question, specs, divID, subtext) {
	var correct = specs[0];
	var anyCaps = specs[1];
	var article = addQuestion(question, divID);
	var div = $(divID);
	var form = formO + ' id="f' + divID.substring(1) + '">\n';
	var textField = inputO + ' type="text" id="answer0">' + inputC;
	var submit = '<input type="submit" method="GET" value="Submit">\n';
	var next = '<input type="button" class="next" value="Next" disabled>';
	form += textField + br + '\n' + submit + next + formC;
	article += form + articleC;
	div.append(article);
	document.getElementById("f" + divID.substring(1)).onsubmit = function() {return answerSubmitSA(correct, anyCaps, divID);};
}

/**
 * 
 * @param question
 * @param specs
 * @param divID
 * @param subtext
 */
function makeMultipleShortAnswer(question, specs, divID, subtext) {
	var subquestions = specs[0];
	var corrects = specs[1];
	var anyCaps = specs[2];
	var article = addQuestion(question, divID, subtext);
	var div = $(divID);
	var quiz = formO + ' id="f' + divID.substring(1) + '">\n';
	for(var i = 0; i < subquestions.length; i++) {
		var textField = inputO + ' type="text" id="answer' + i + '">' + inputC;
		quiz += subquestions[i] + textField + br + '\n';
	}
	var submit = '<input type="submit" method="GET" value="Submit">\n';
	var next = '<input type="button" class="next" value="Next" disabled>';
	quiz += submit + next + formC;
	article += quiz + articleC;
	div.append(article);
	document.getElementById("f" + divID.substring(1)).onsubmit = function() {return answerSubmitSA(corrects, anyCaps, divID);};
}

//Used for code boxes so the page can track them
var boxCount = 1;
var cmAccessor = [];

/**
 * 
 * @param filename
 * @param text
 * @returns {Boolean}
 */
function download(filename, text) {
	  var pom = document.createElement('a');
	  $('#arbitrary').append(pom);
	  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	  pom.setAttribute('download', filename);
	  pom.target="_self" ;
	  pom.click();
	  return false;
}

/**
 * 
 * @param question
 * @param specs
 * @param divID
 * @param subtext
 */
function makeCodeBox(question, specs, divID, subtext) {
	var startValue = specs[0];
	var article = addQuestion(question, divID);
	var div = $(divID);
	var form = formO + ' onsubmit="return download(this[' + "'name'" + '].value + ' + "'.c'" + ', cmAccessor['+ (boxCount - 1) +'].getValue())">\n';
	var textArea = textAO + ' id="cAnswer' + boxCount + '" class="codebox">' + startValue + textAC;
	var name = "<p id='heading'>Type in the name of your file:</p><input type='text' class='codetext' name='name' value='exercise" + divID.substring(8) +"'>";
	var filetype = inputO + ' type="radio" name="' + question + '" id="c" value=".c" checked>.c file' + inputC + inputO + ' type="radio" name="' + question + '" id="h" value=".h">.h file' + inputC;
	var download = inputO + ' type="submit" value="Download">'
	form += textArea + name + filetype + download + formC;
	article += form + articleC;
	div.append(article);
	boxCount++;
}

/**
 * 
 * @param divID
 */
function makeCodeBoxCE(divID) {
	var div = $(divID);
	var textArea = textAO + ' id="cAnswer' + boxCount + '" class="codebox">' + textAC;
	var article = articleO + textArea + articleC;
	div.append(article);
	boxCount++;
}

/**
 * 
 */
function codeBoxMaker() {
	require([
	         "codemirror/lib/codemirror", "codemirror/mode/clike/clike",
	         "codemirror/addon/edit/closebrackets", "codemirror/addon/edit/matchbrackets",
	         "codemirror/addon/fold/brace-fold", "codemirror/addon/fold/comment-fold",
	         "codemirror/addon/fold/foldcode", "codemirror/addon/fold/foldgutter",
	         "codemirror/addon/search/match-highlighter", "codemirror/addon/search/search"
	       ], function(CodeMirror) {
		var boxes = document.getElementsByClassName('codebox');
		for(var i = 0; i < boxes.length; i++) {
			cmAccessor[i] = CodeMirror.fromTextArea(document.getElementById('cAnswer' + (i + 1)), {
				mode: "text/x-robotc",
				theme: "neat",
				tabSize: 2,
				indentWithTabs: true,
				lineNumbers: true,
				fixedGutter: false,
				dragDrop: true,
				matchBrackets: true,
				autoCloseBrackets: true,
				foldGutter: true,
				highlightSelectionMatches: true
			});
		}
	});
}