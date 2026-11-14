export interface Voxel {
  x: number;
  y: number;
  z: number;
  color: string;
  type: "moss" | "foliage" | "dark";
}

/**
 * High-Density Solid Pixel Matrix (6-8 cols x 8 rows)
 * Built with thick 2-3 voxel stems, continuous curves, and reinforced crossbars.
 * ZERO thin or broken-looking sections.
 */
export const BOLD_PIXEL_LETTERS: Record<string, number[][]> = {
  // L: 6 cols x 8 rows. 2-voxel pillar, 2-voxel bottom shelf
  L: [
    [1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ],

  // U: 7 cols x 8 rows. 2-voxel side pillars, 2-voxel rounded bottom
  U: [
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
  ],

  // T: 7 cols x 8 rows. 2-row crossbar, 3-column thick centered trunk
  T: [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
  ],

  // F: 6 cols x 8 rows. 2-voxel spine, 2 solid horizontal arms
  F: [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
  ],

  // A: 7 cols x 8 rows. Chamfered top crown, 2-row crossbar, bold pillars
  A: [
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
  ],

  // N: 7 cols x 8 rows. 2-voxel outer pillars, continuous 2-voxel diagonal
  N: [
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
  ],

  // M: 8 cols x 8 rows. Broad, powerful 2-voxel pillars with solid chevron
  M: [
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
  ],

  // O: 7 cols x 8 rows. Chamfered corners, 2-voxel continuous ring
  O: [
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
  ],

  // H: 7 cols x 8 rows. 2-voxel pillars, centered 2-row crossbar
  H: [
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
  ],

  // E: 6 cols x 8 rows. 2-voxel vertical spine, 3 solid crossbars
  E: [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ],

  // D: 7 cols x 8 rows. 2-voxel spine, beveled curved right loop
  D: [
    [1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0],
  ],

  // S: 7 cols x 8 rows. Robust 2-3 voxel thick S-curve (zero thin bridges)
  S: [
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
  ],

  // I: 6 cols x 8 rows. Bold 2-col pillar with top and bottom 2-row serifs
  I: [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ],
};

/**
 * Strict Architectural Palette:
 * Bright Green: #5DD62C
 * Deep Green: #337418
 * Dark Elements: #0F0F0F and #202020
 */
export const COLOR_PALETTE = {
  brightGreen: ["#5DD62C", "#5DD62C", "#5DD62C"],
  deepGreen: ["#337418", "#337418", "#337418"],
  darkAccent: ["#202020", "#0F0F0F", "#202020"],
};

/**
 * Measures the total world width of a word based on voxel size & letter spacing
 */
export function calculateWordWidth(
  word: string,
  voxelSize: number,
  letterSpacing: number
): number {
  let width = 0;
  for (let i = 0; i < word.length; i++) {
    const char = word[i].toUpperCase();
    const matrix = BOLD_PIXEL_LETTERS[char];
    if (matrix) {
      width += matrix[0].length * voxelSize;
      if (i < word.length - 1) {
        width += letterSpacing;
      }
    }
  }
  return width;
}

/**
 * Generates solid, dense 3D voxels for a given text line.
 * Fully solid core: NO missing pixels, NO broken stems, NO detached fragments.
 */
export function generateWordVoxels(
  word: string,
  startX: number,
  startY: number,
  startZ: number,
  voxelSize: number = 0.125,
  depth: number = 3
): Voxel[] {
  const voxels: Voxel[] = [];
  let cursorX = startX;
  const letterSpacing = voxelSize * 1.5;

  for (let lIndex = 0; lIndex < word.length; lIndex++) {
    const char = word[lIndex].toUpperCase();
    const matrix = BOLD_PIXEL_LETTERS[char];
    if (!matrix) {
      cursorX += voxelSize * 5;
      continue;
    }

    const width = matrix[0].length;
    const height = matrix.length;

    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        if (matrix[r][c] === 1) {
          // Invert row index so Y points upward in 3D
          const localY = startY + (height - 1 - r) * voxelSize;
          const localX = cursorX + c * voxelSize;

          // Extrude across depth (Z axis)
          for (let zIndex = 0; zIndex < depth; zIndex++) {
            const localZ = startZ - zIndex * voxelSize;

            const isTop = r === 0 || (r > 0 && matrix[r - 1][c] === 0);
            const isBottom = r === height - 1 || (r < height - 1 && matrix[r + 1][c] === 0);
            const isFront = zIndex === 0;
            const isBack = zIndex === depth - 1;

            // Deterministic pseudo-random variation
            const hash =
              Math.sin(localX * 13.37 + localY * 47.19 + zIndex * 23.41) *
              43758.5453;
            const rand = hash - Math.floor(hash);

            let color: string;
            let type: Voxel["type"];

            if (isTop) {
              // Vibrant bright green moss crown
              color =
                COLOR_PALETTE.brightGreen[
                  Math.floor(rand * COLOR_PALETTE.brightGreen.length)
                ];
              type = "moss";
            } else if (isFront) {
              // Front face is predominantly vibrant bright green (#5DD62C) with deep green accents
              if (rand > 0.3) {
                color =
                  COLOR_PALETTE.brightGreen[
                    Math.floor(rand * COLOR_PALETTE.brightGreen.length)
                  ];
                type = "moss";
              } else {
                color =
                  COLOR_PALETTE.deepGreen[
                    Math.floor(rand * COLOR_PALETTE.deepGreen.length)
                  ];
                type = "foliage";
              }
            } else if (isBack) {
              // Back face has grounding dark shadow elements
              color =
                COLOR_PALETTE.darkAccent[
                  Math.floor(rand * COLOR_PALETTE.darkAccent.length)
                ];
              type = "dark";
            } else if (isBottom) {
              // Bottom base has deep grounding shadow
              color =
                rand > 0.4
                  ? COLOR_PALETTE.darkAccent[
                      Math.floor(rand * COLOR_PALETTE.darkAccent.length)
                    ]
                  : COLOR_PALETTE.deepGreen[
                      Math.floor(rand * COLOR_PALETTE.deepGreen.length)
                    ];
              type = "dark";
            } else {
              // Internal / side voxel: rich deep green
              color =
                COLOR_PALETTE.deepGreen[
                  Math.floor(rand * COLOR_PALETTE.deepGreen.length)
                ];
              type = "foliage";
            }

            voxels.push({
              x: localX,
              y: localY,
              z: localZ,
              color,
              type,
            });
          }
        }
      }
    }

    cursorX += width * voxelSize + letterSpacing;
  }

  return voxels;
}
