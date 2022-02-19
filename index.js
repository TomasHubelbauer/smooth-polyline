import calculateParallelLines from './calculateParallelLine.js';
import calculateLineIntersection from './calculateLineIntersection.js';

const canvas = document.querySelector('canvas');
const button = document.querySelector('button');

const offset = 15;
let points = [];
const shapes = [
    [
        { x: offset * 2, y: offset * 2 },
        { x: offset * 2 + 100, y: offset * 2 },
        { x: offset * 2 + 100, y: offset * 2 + 100 },
        { x: offset * 2, y: offset * 2 + 100 }
    ],
    [
        { x: 350, y: offset * 2 },
        { x: 450, y: offset * 2 + 100 },
        { x: 250, y: offset * 2 + 100 }
    ],
    [
        { x: 600, y: offset * 2 + 100 },
        { x: 675, y: offset * 2 + 100 },
        { x: 720, y: offset * 2 + 30 }
    ]
];

canvas.addEventListener('click', event => {
    points.push({ x: event.offsetX, y: event.offsetY });
    localStorage.setItem('points', JSON.stringify(points));
    render();
});

button.addEventListener('click', () => {
    points = [];
    localStorage.setItem('points', '[]');
    render();
});

canvas.width = 1600;
canvas.height = 600;

const context = canvas.getContext('2d');

if (localStorage.getItem('points')) {
    points = JSON.parse(localStorage.getItem('points'));
    render();
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (const shape of [...shapes, points]) {
        context.beginPath();
        context.strokeStyle = 'silver';

        for (const point of shape) {
            context.lineTo(point.x, point.y);
        }

        context.closePath();
        context.stroke();

        context.strokeStyle = 'black';

        for (let index = 0; index < shape.length; index++) {
            const prev = shape[index === 0 ? shape.length - 1 : index - 1];
            const start = shape[index];
            const end = shape[(index + 1) % shape.length];
            const next = shape[(index + 2) % shape.length];

            const [prevToStart1, prevToStart2] = calculateParallelLines(prev, start, offset);
            const [startToEnd1, startToEnd2] = calculateParallelLines(start, end, offset);
            const [endToNext1, endToNext2] = calculateParallelLines(end, next, offset);

            context.strokeStyle = 'red';
            const prevStartIntersection1 = calculateLineIntersection(prevToStart1, startToEnd1);
            const endNextIntersection1 = calculateLineIntersection(startToEnd1, endToNext1);

            context.beginPath();
            context.moveTo(startToEnd1.start.x, startToEnd1.start.y);
            context.lineTo(startToEnd1.end.x, startToEnd1.end.y);
            context.stroke();

            context.strokeStyle = 'gray';
            context.beginPath();
            context.arc(start.x, start.y, offset, 0, Math.PI * 2, false);
            context.stroke();

            context.strokeStyle = 'blue';
            const prevStartIntersection2 = calculateLineIntersection(prevToStart2, startToEnd2);
            const endNextIntersection2 = calculateLineIntersection(startToEnd2, endToNext2);

            context.beginPath();
            context.moveTo(prevStartIntersection2.x, prevStartIntersection2.y);
            context.lineTo(endNextIntersection2.x, endNextIntersection2.y);
            context.stroke();
        }
    }
}
