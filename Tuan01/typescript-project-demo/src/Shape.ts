export abstract class Shape {
  /**
   * Calculate and return the area of the shape.
   */
  abstract area(): number;

  static describe(): string {
    return "Shapes represent geometric figures that have area (and optionally perimeter).";
  }
}
