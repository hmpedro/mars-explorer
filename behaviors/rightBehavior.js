module.exports = {
    'N': (robot) => {
        robot.pos.direction = 'E';
    },
    'S': (robot) => {
        robot.pos.direction = 'W';
    },
    'E': (robot) => {
        robot.pos.direction = 'S';
    },
    'W': (robot) => {
        robot.pos.direction = 'N';
    }
}