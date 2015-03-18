//Set of html tags
var pO = '<p';
var pC = '</p>';
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

function addQuestion(question, divID, subtext) {
	var q = articleO + pO + ' class="question">' + question + pC;
	if(subtext !== undefined) {
		alert(subtext);
		q += pO + ' class="subQuestion">' + subtext + pC;
	}
	return q;
}

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
	
	if(isCorrect) {
		var contentDiv = $(divID);
		if(contentDiv.attr('class').indexOf("failed") > -1) {
			contentDiv.removeClass("failed");
		}
		contentDiv.addClass("solved");
		contentDiv.find('input[type="submit"]').attr('disabled', true);
		contentDiv.find('input.next').attr('disabled', false);
		contentDiv.find('input.next').addClass("on");
		var button = contentDiv.parent().attr("id");
		$('[name="#' + button + '"]').addClass("solved");
	} else {
		var contentDiv = $(divID);
		contentDiv.addClass("failed");
	}
}

function answerSubmitSA(correct, anyCaps, divID) {
	var input = [];
	var div = $(divID);
	for(var i = 0; i < correct.length; i++) {
		input[i] = div.find('#answer' + i).val();
	}
	checkAnswer(input, correct, anyCaps, divID);
	return false;
}

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

function answerSubmitMC(correct, anyCaps, divID) {
	var input = getInputMC(divID);
	checkAnswer(input, correct, anyCaps, divID);
	return false;
}

function makeMultipleChoice(question, specs, divID) {
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

function makeShortAnswer(question, specs, divID) {
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

var boxCount = 1;
var cmAccessor = [];

function download(filename, text) {
	  var pom = document.createElement('a');
	  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	  pom.setAttribute('download', filename);
	  pom.click();
	  return false;
}

function makeCodeBox(question, specs, divID) {
	var startValue = specs[0];
	var article = addQuestion(question, divID);
	var div = $(divID);
	var form = formO + '>\n';
	var textArea = textAO + ' id="cAnswer' + boxCount + '" class="codebox">' + startValue + textAC;
	form += textArea + formC;
	article += textArea + articleC;
	div.append(article);
	boxCount++;
}

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