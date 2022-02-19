/**
 * Calculates the intersection point of two lines.
 * @see http://paulbourke.net/geometry/pointlineplane/#i2l
 * Compared to the original, this method has been changed to compare infinite
 * lines by removing the check for whether the point is along the segments.
 * @typedef {{ x: number; y: number; }} Point
 * @typedef {{ start: Point; end: Point; }} Line
 * @param {Line} line1 The first line to intersect with the second
 * @param {Line} line2 The second line to intersect with the first
 * @returns {Point} The intersection point
 */
export default function calculateLineIntersection(line1, line2) {
    const { start: { x: x1, y: y1 }, end: { x: x2, y: y2 } } = line1;
    const { start: { x: x3, y: y3 }, end: { x: x4, y: y4 } } = line2;

    // Check if neither of the lines is of zero length
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return;
    }

    const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    // Check if the lines are parallel
    if (denominator === 0) {
        return;
    }

    const u = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;

    // Return an object with the X and Y coordinates of the intersection
    const x = x1 + u * (x2 - x1);
    const y = y1 + u * (y2 - y1);

    return { x, y };
}
