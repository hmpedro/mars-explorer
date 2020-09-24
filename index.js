const readline = require('readline');

const axisX = 0;
const axisY = 1;
const direction = 2;

function executeRobot(robot) {
    const {pos: robotPos, commandSequence} = robot;

    commandSequence.forEach(command => {
        switch (robotPos[direction]) {
            case 'N': {
                switch (command) {
                    case 'L': {
                        robotPos[direction] = 'W';
                        break;
                    }

                    case 'R': {
                        robotPos[direction] = 'E';
                        break;
                    }

                    case 'M': {
                        robotPos[axisY] += 1;
                        break;
                    }

                    default : {
                        console.log('deu ruim no comando pro Norte');
                    }
                }

                break;
            }

            case 'S': {
                switch (command) {
                    case 'L': {
                        robotPos[direction] = 'E';
                        break;
                    }

                    case 'R': {
                        robotPos[direction] = 'W';
                        break;
                    }

                    case 'M': {
                        robotPos[axisY] -= 1;
                        break;
                    }

                    default : {
                        console.log('deu ruim no comando pro Sul');
                    }
                }

                break;
            }

            case 'E': {
                switch (command) {
                    case 'L': {
                        robotPos[direction] = 'N';
                        break;
                    }

                    case 'R': {
                        robotPos[direction] = 'S';
                        break;
                    }

                    case 'M': {
                        robotPos[axisX] += 1;
                        break;
                    }

                    default : {
                        console.log('deu ruim no comando');
                    }
                }
                break;
            }

            case 'W': {
                switch (command) {
                    case 'L': {
                        robotPos[direction] = 'S';
                        break;
                    }

                    case 'R': {
                        robotPos[direction] = 'N';
                        break;
                    }

                    case 'M': {
                        robotPos[axisX] -= 1;
                        break;
                    }

                    default : {
                        console.log('deu ruim no comando');
                    }
                }
                break;
            }

            default: {
                console.log('Deu ruim a direção do robo');
            }
        }
    });
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

        function recursiveAskForRobots() {
            rl.question('New Robot. Insert initial position or "exit" to leave \n', function (posInput) {
                if (posInput === 'exit')
                    return rl.close();

                if (posInput.length === 5 && /\d \d N|S|E|W/g.test(posInput)) {
                    rl.question('Now, insert the command sequence or "exit" to leave \n', function (commandSequenceInput) {
                        if (commandSequenceInput === 'exit')
                            return rl.close();

                        if (/[L|M|R]+/g.test(commandSequenceInput)) {
                            const pos = posInput.split(' ');
                            pos[axisX] = Number(pos[axisX]);
                            pos[axisY] = Number(pos[axisY]);
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
    robots.forEach((robot,index) => {
        executeRobot(robot);
        console.log(`Robot ${index+1}`, robot.pos)
    })

    process.exit(0);
});
