//Used to make objects of the problems
/*NOTE: For the optional, all problems must follow this formula:
 * Multiple Choice: Type, answers, then correct answer
 * Short Answer: Correct answer, whether or not to accept any caps
 * Multiple Short Answer: Text by boxes, correct answers, whether or not to accept any caps
 * Code Box: Initial code in the box
 */
function CodeProblem(type, question, additional, subtext) {
	this.type = type;
	this.question = question;
	this.specs = additional;
	this.clarify = subtext;
}

//Shortcuts used to call the right method
var mc = 'MultipleChoice';
var sa = 'ShortAnswer';
var msa = 'MultipleShortAnswer';
var cb = 'CodeBox';

//Common strings used in problems, put into variables for convenience
var typeLine = "Type a line of code in each box as specified.";
var blanks = " Fill in the blanks.";
var cbStart = '//Your Code Here//';

//The array of all the coding problems
problems = [
    //Motor Basics Problems
	[new CodeProblem(sa, 'Create a motor name to reel in a string.',
		[['reelMotor ||| stringMotor'], true]),
		new CodeProblem(mc, 'Why is it necessary to mark some wheel motors as "Reversed" in motor set-up? Check all that are correct.', 
				['checkbox', ["To make the robot drive backwards.", "To correct backwords motor mounting.", "To assure left and right motors will move the same way when given a value.", "To let the robot spin in circles."], [1, 2]]),
		new CodeProblem(mc, 'Which of the following would use a motor encoder? Check all that are correct.',
				['checkbox', ['Turning the robot 60 degrees left.', 'Driving 3 feet forward.', 'Determining if a robot is stuck on an obstacle', 'Raising a lift to a pre-set height.'], [1, 3]]),
		new CodeProblem(mc, 'What must joystick axis inputs be multiplied by to make the most sensitive joysticks?',
				['radio', ['100.0/120.0', '120/100', '120.0/100.0', '100/120'], [0]]),
		new CodeProblem(msa, typeLine,
				[['Declare an int called full with the value of the max motor speed.', 'Assign motor[A] to the value of full.'], ['int full = 100;', 'motor[A] = full;'], false]),
		new CodeProblem(sa, "Type a line of code to assign motor[A] to the value of the y-axis of controller 1's left joystick altered for sensitivity.",
				[['motor[A] = joystick.joy1_y1 * 100.0/120.0 ||| motor[A] = 100.0/120.0 * joystick.joy1_y1'], false]),
		new CodeProblem(cb, "Define a method called stopMotors() that returns void and stops motor[A] and motor[B].",
				[cbStart]),
		new CodeProblem(sa, "Type a line of code to declare an array of ints called motorSpeeds that contains the value of a stopped motor, the value for a motor at 1/4 speed, the value for a motor at 1/2 speed, and the value for a motor at full speed in that order.",
				[['int[] motorSpeeds = { 25, 50, 100 };'], false]),
		new CodeProblem(sa, "Type a line of code to assign motor[A] the full speed value using an access to the previous problem's array.",
				[['motor[A] = motorSpeeds[2];'], false])],
	//Servo Basics Problems
	[new CodeProblem(mc, 'Which servo would be used for an arm with a 90 degree range of motion?',
			['radio', ["A standard servo.", 'A rotational servo.'], [0]]),
		new CodeProblem(msa, 'Type a line of code in each box as specified.',
				[['Declare an int called retracted with the minimum servo value.', 'Assign a servo called A to the value of retracted.'], ['int retracted = 0;', 'A = retracted;'], false]),
		new CodeProblem(msa, 'The code below declares a global int called servoIncr with a value of 5 and defines a method called incrementServoA() that returns void and increments a servo called A by servoIncr.' + blanks,
				[['Box 1:', 'Box 2:', "Box 3:"], ['int servoIncr = 5', 'void incrementServoA()', 'A += servoIncr'], false],
				'//Box 1//;\n//Box 2// {\n\t//Box 3//;\n}'),
		new CodeProblem(msa, 'The code below uses servoIncr from the previous problem and defines a method called decrementServoA() that returns void and decrements a servo called A by servoIncr.' + blanks,
				[['Box 1:', 'Box 2:'], ['void decrementServoA()', 'A -= servoIncr'], false],
				'//Box 1// {\n\t//Box 2//;\n}'),
		new CodeProblem(mc, 'What is a soft stop?',
				['radio', ['A cushion that keeps moving parts within a fixed range of motion.', 'Code that keeps moving parts within a fixed range of motion.', 'Markings taped on the robot to alert drivers at what place they should not move a part past.'], [1]]),
		new CodeProblem(msa, 'The code below declares a global int called servoStop with a value of 125 and defines a method called isAAtStop() that returns a bool of if the value of a servo called A is greater than or equal to servoStop.' + blanks,
				[['Box 1:', 'Box 2:', 'Box 3:'], ['int servoStop = 125', 'bool isAAtStop()', 'A >= servoStop ||| servoStop <= A'], false],
				'//Box 1//;\n//Box 2// {\n\t//Box 3//;\n}'),
		new CodeProblem(sa, "Type a line of code that sets a rotational servo called A to the max value spinning clockwise.",
				[['A = 0;'], false]),
		new CodeProblem(sa, "Type a line of code that stops the rotation of a servo called A.",
				[['A = 127;'], false]),
		new CodeProblem(msa, typeLine,
				[['Box 1:', 'Box 2:'], ['bool isAStopped()', 'return A == 127 ||| return 127 == A'], false],
				'//Box 1// {\n\t//Box 2//;\n}'),
		new CodeProblem(cb, 'Define a method called changeServoADirection() that returns void and sets a servo called A to the opposite direction at the same power. Do not use if statements for this.',
				['void changeServoADirection() {\n}'])],
	//Sensor Basics Problems
	[new CodeProblem(mc, 'To align a robot directly (straight on) with an IR beacon, what value must the IR seeker be?',
			['radio', ["1", "3", "5", "9"], [2]]),
		new CodeProblem(mc, 'Under what circumstances would it be better to rely on a gyro sensor than a motor encoder to determine the movement of a robot?',
				['radio', ['When determing distance moving forward or backward.', 'When determing turn angle.', 'When determining robot acceleration.'], [1]]),
		new CodeProblem(msa, 'The code below defines a method called readIR() that returns the int reading of an IR seeker called ir.' + blanks,
				[['Box 1:', 'Box 2:'], ['int readIR()', 'return HTIRS2readACDir(ir)'], false],
				'//Box 1// {\n\t//Box 2//;\n}'),
		new CodeProblem(msa, 'The code below defines a method called isIRCentered() that takes in the int called val of the current reading of the IR seeker and returns a bool of if the robot is centered on the beacon.' + blanks,
				[['Box 1:', 'Box 2:'], ['bool isIRCentered(int val)', 'val == 5 ||| 5 == val'], false],
				'//Box 1// {\n\t//Box 2//;\n}')],
	//Logic Statements Problems
	[new CodeProblem(mc, 'Where is it better to have a logic statement security check?',
			['radio', ["Inside the method.", 'Outside the method.', 'Who needs security checks when you have competent programmers?'], [0]]),
		new CodeProblem(cb, 'Define a method called setMotorA() that accepts an int of a speed and sets motor A to it if it is valid. The method returns the bool of if A was set to the input.',
				['bool setMotorA(int speed) {\n}']),
		new CodeProblem(cb, 'Define a method called setServoA() that accepts an int of a position and sets a servo called A to it if it is valid. The method returns the bool of if A was set to the input.',
				['bool setServoA(int degree) {\n}']),
		new CodeProblem(mc, "When can't an if statement be written as a switch statement?",
				['radio', ['Never.', 'Always.', 'When control is determined based on a bool.'], [2]]),
		new CodeProblem(cb, 'Define a method called determineIRPosition() that accepts an int of the current reading of the IR seeker and return a string of the position if the center is mounted right side up: “left”, “straight”, or “right”. Use an if statement.',
				['string determineIRPosition(int irVal) {\n}']),
		new CodeProblem(cb, 'Rewrite the previous exercise using a switch statement.',
				['string determineIRPosition(int irVal) {\n}']),
		new CodeProblem(msa, 'The code below uses a call to determineIRPosition() and readIR() and responds to the returned string. The robot’s wheel motors are called leftMotor and rightMotor for the respective wheel side. If the beacon is to the left or right, set the motors to turn in the corresponding direction at half power. Otherwise, set the robot to drive forward at full speed.',
				[['Box 1:', 'Box 2:', 'Box 3:'], ['determineIRPosition(readIR())', 'pos == "left" ||| "left" == pos', 'pos == "right" ||| "right" == pos'], false],
				'int pos = //Box 1//;\nif(//Box 2//) {\n\tmotor[leftMotor] = -50;\n\tmotor[rightMotor] = 50;\n} else if(//Box 3//) {\n\tmotor[leftMotor] = 50;\n\tmotor[rightMotor] = -50;\n} else {\n\tmotor[leftMotor] = 100;\n\tmotor[rightMotor] = 100;\n}'),
		new CodeProblem(msa, 'The code below declares a local int called threshold with a value of 10 and set motor[A] to the input from the y-axis of the left joystick of controller 1 if the input is beyond the threshold.',
				[['Box 1:', 'Box 2:', "Box 3:"], ['int threshold', 'joystick.joy1_y1 > 10 || 10 < joystick.joy1_y1', 'motor[A] = joystick.joy1_y1'], false],
				'//Box 1// = 10;\nwhile(true) {\n\tif(//Box 2//) {\n\t\t//Box 3//;\n}')],
	//Loops Problems
	[new CodeProblem(mc, 'When can a while loop be written as a for loop without break statements?',
			['radio', ['Never.', 'Always.', 'When a loop exits based on a counter.', 'When the loop exits based on char comparison.'], [1]]),
		new CodeProblem(mc, 'Is there a case where code can only be expressed as a for loop?',
				['radio', ['Yes.', 'No.'], [1]]),
	 	new CodeProblem(cb, 'Define a method called testLightSensor() which returns an int array of 10 readings from a light sensor called light. Wait 50 msec in between readings and use a while loop.',
			["int[] testLightSensor() {\n}"]),
		new CodeProblem(cb, 'Rewrite the previous exercise with a for loop.',
				["int[] testLightSensor() {\n}"]),
		new CodeProblem(msa, "The code below defines a method called driveUntilTouch() which returns void and set motor[A] to full power until the touch sensor is pushed. Assume getTouchVal(), which returns an int, has already been defined.",
				[['Box 1:', 'Box 2:', 'Box 3:', 'Box 4:'], ['void driveUntilTouch()', 'getTouchVal() == 0 ||| 0 == getTouchVal()', 'motor[A] = 100;', 'motor[A] = 0;'], false],
				'//Box 1// {\n\twhile(//Box 2//) {\n\t\t//Box 3//;\n\t}\n\t//Box 4//;\n}'),
		new CodeProblem(msa, "The code below defines a method called driveUntilCondition() which returns void and set motor[A] to full power until the touch sensor is pushed or the sonar sensor is less than 100. Assume getTouchVal() and getSonarVal(), which return both return an int, have already been defined.",
				[['Box 1:', 'Box 2:', 'Box 3:', 'Box 4:'], ['void driveUntilTouch()', 'getTouchVal() == 0 ||| 0 == getTouchVal()', 'motor[A] = 100;', 'motor[A] = 0;'], false],
				'//Box 1// {\n\twhile(//Box 2//) {\n\t\t//Box 3//;\n\t}\n\t//Box 4//;\n}'),
		new CodeProblem(cb, 'Define a method called dumpGameElement() which returns void and does a routine to put a game element into a goal. To do this, the robot must go forward with its wheels going at half speed until the wheel motor encoder reaches 1000, then raise the lift at full speed until its motor encoder reaches 200, and finally dump the game element by moving collector parts at full speed for 2 seconds. The wheel motors are called leftMotor and rightMotor, the lift is liftMotor, and the collector is collectorMotor.',
				['void dumpGameElement() {\n}']),
		new CodeProblem(cb, 'Define a method called stopRobot() which returns void and sets motor[A] and motor[B] to full power until the top hat on controller 1 is pressed upwards, at which point it stops both motors.',
				['void stopRobot() {\n}'])],
	//Button Mapping Problems
	[new CodeProblem(msa, 'Sort the following operations onto joystick1 or joystick2.',
			[['Driving', 'Altering Wheel Speeds', 'Operating a Collector', 'Operating a Lift Mechanism', 'Swapping Driving Directions'], ['joystick1', 'joystick1', 'joystick2', 'joystick2', 'joystick1'], true]),
		new CodeProblem(mc, 'If wheel mechanics are mapped onto the joysticks and other controls must be added to the controller, where is the best place to map them?',
				['radio', ['To buttons 1-4.', 'To the top hat.', 'To the bumpers or triggers.'], [2]]),
		new CodeProblem(mc, 'Which button pairs would be most convenient for corresponding tasks? ex: One button lifts a part while the other lowers it.',
				['checkbox', ['Button 3 and 4.', 'Button 4 and 5.', 'Button 8 and 9.', 'Button 5 and 7.'], [0, 3]]),
		new CodeProblem(cb, "Create an infinite while loop that sets motor[A] to the modified input from the left joystick and motor[B] to the modified input from the right joystick on controller 1. Add a conditional statement such that, when a button is pressed, the motors run at half their normal speed. \nChoose which button this is and describe why you chose it. How would it be more convenient for the driver than other buttons?",
				[cbStart]),
		new CodeProblem(cb, "Create additional code that will go in the previous question’s infinite loop, following the motor code, for motor[C] that is used to manipulate a string. On controller 2, when one button is pressed, the motor runs at a positive value and winds the string. When a second button is pressed, the motor runs at a negative value and unwinds it. \nChoose which buttons these are and describe why you chose them. How would it be more convenient for the driver than other buttons?",
				[cbStart])]
];