module.exports = {
    'N': (robot) => {
        robot.pos.y += 1;
    },
    'S': (robot) => {
        robot.pos.y -= 1;
    },
    'E': (robot) => {
        robot.pos.x += 1;
    },
    'W': (robot) => {
        robot.pos.x -= 1;
    }
}