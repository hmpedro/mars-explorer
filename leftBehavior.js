module.exports = {
    'N': (robot) => {
        robot.pos.direction = 'W';
    },
    'S': (robot) => {
        robot.pos.direction = 'E';
    },
    'E': (robot) => {
        robot.pos.direction = 'N';
    },
    'W': (robot) => {
        robot.pos.direction = 'S';
    }
}