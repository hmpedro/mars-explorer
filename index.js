const readline = require('readline');
const leftBehavior = require('./behaviors/leftBehavior.js');
const righBehavior = require('./behaviors/rightBehavior.js');
const moveBehavior = require('./behaviors/moveBehavior.js');

const axisX = 0;
const axisY = 1;

const behaviors = {
    'L': leftBehavior,
    'R': righBehavior,
    'M': moveBehavior
}

function executeRobot(robot, upperRightCorner) {
    const { pos, commandSequence} = robot;

    commandSequence.forEach(command => {
        const commandBehaviors = behaviors[command];
        const action = commandBehaviors[pos.direction];

        action(robot);
    });

    if (robot.pos.x < 0 ||
        robot.pos.x > upperRightCorner.x ||
        robot.pos.y < 0 ||
        robot.pos.y > upperRightCorner.y) {
        robot.error = 'Invalid robot action, didn\'t executed correctly';
    }

    return robot;
}

let upperRightCorner;
const robots = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('Welcome to Mars Explore. ')
console.log('Please insert the upper right corner or "exit" to leave')
rl.on('line', function(line) {
    if (line === 'exit')
        return rl.close();

    if (line.length === 3 && /\d \d/g.test(line)) {
        upperRightCorner = line.split(' ');
        upperRightCorner = {
            x: upperRightCorner[0],
            y: upperRightCorner[1]
        }

        function recursiveAskForRobots() {
            rl.question('New Robot. Insert initial position or "exit" to leave \n', function (posInput) {
                if (posInput === 'exit')
                    return rl.close();

                if (posInput.length === 5 && /\d \d N|S|E|W/g.test(posInput)) {
                    rl.question('Now, insert the command sequence or "exit" to leave \n', function (commandSequenceInput) {
                        if (commandSequenceInput === 'exit')
                            return rl.close();

                        if (/[L|M|R]+/g.test(commandSequenceInput)) {
                            const posCleaned = posInput.trim().split(' ');
                            const pos = {
                                x: Number(posCleaned[axisX]),
                                y: Number(posCleaned[axisY]),
                                direction: posCleaned[2]
                            };

                            robots.push({pos, commandSequence: commandSequenceInput.split('')});
                        } else {
                            console.log('Wrong input, please use like: "LMRLMR". Try a new robot.')
                        }

                        recursiveAskForRobots();
                    });
                } else {
                    console.log('Wrong input, please use like: "1 1 N". Try a new robot.')
                }

                recursiveAskForRobots();
            });
        }

        recursiveAskForRobots();
    } else {
        console.log('Wrong input. Please use like: "5 5"')
    }
}).on('close',function(){
    console.log('------------------------------------------');
    console.log('');
    console.log('RESULTS');
    console.log('');

    robots.forEach((robot,index) => {
        executeRobot(robot, upperRightCorner);
        console.log(`Robot ${index+1}`, robot.error ? robot.error : robot.pos);
    })

    process.exit(0);
});

