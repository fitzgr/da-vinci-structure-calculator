# Da Vinci Structure Calculator

A browser-based **geometric prototype** for notched, interlocking timber arrangements.

## Run

Open `index.html` in a browser. No dependencies or build step.

## Features
- Set ring member count, outside diameter, stock width/thickness, and end overhang.
- Enter notch depth and clearance.
- View conceptual member arrangement, nominal cut lengths, and notch schedule.
- See input warnings for geometrically inconsistent notch depth and sizing.

## Important scope

The calculator currently illustrates a **planar polygonal reciprocal ring**, not the three-dimensional self-supporting frame pictured in the Pinterest references. A polygon outline alone is not a solved reciprocal structural system: the tool does **not** derive physically verified crossing offsets, complementary three-dimensional notch faces, assembly clearances, self-locking behavior, real loading, or actual construction sequencing.

The notch drawing is schematic and is **not a fabrication template**. No structural integrity or occupancy safety is asserted. Future work should derive contact geometry from an actual three-dimensional joint graph and validate a physical prototype with appropriate engineering review.

## Next phase
1. Identify precise member geometry from multiple photos/measurements.
2. Implement a 3D reciprocal-frame contact graph with top/bottom bearing surfaces and notch cuts.
3. Solve member intersections and generate per-member shop drawings.
4. Add collision detection and build-sequence simulation.
5. Independently verify structural and joint capacity before physical construction.
