/**
 * Calculates two lines parallel to the one given at distance given.
 * @typedef {{ x: number; y: number; }} Point
 * @typedef {{ start: Point; end: Point; }} Line
 * @param {Point} start Start point of the line
 * @param {Point} end End point of the line
 * @param {number} offset The distance between the line and its parallel lines
 * @returns {[Line, Line]} The parallel lines
 */
export default function calculateParallelLines(start, end, offset) {
    const length = Math.hypot(end.x - start.x, end.y - start.y);
    const vector = { x: end.x - start.x, y: end.y - start.y };
    const normal = { x: vector.x / length, y: vector.y / length };

    const perpendicular1 = { x: normal.y, y: -normal.x };
    const parallel1Start = { x: start.x + perpendicular1.x * offset, y: start.y + perpendicular1.y * offset };
    const parallel1End = { x: parallel1Start.x + vector.x, y: parallel1Start.y + vector.y };

    const perpendicular2 = { x: -normal.y, y: normal.x };
    const parallel2Start = { x: start.x + perpendicular2.x * offset, y: start.y + perpendicular2.y * offset };
    const parallel2End = { x: parallel2Start.x + vector.x, y: parallel2Start.y + vector.y };

    return [
        { start: parallel1Start, end: parallel1End },
        { start: parallel2Start, end: parallel2End },
    ];
}
