# Project: Bảo Tàng Lịch Sử Số 3D – Dấu Ấn Miền Nam (1961–1965)

## Architecture
- **Environment**: Single-page Three.js Web application (`BAO_TANG_LICH_SU_SO.html`) with embedded React runtime and WebGL canvas.
- **Three.js Class Aliases in Codebase**:
  - `It`: `THREE.Group`
  - `I`: `THREE.Mesh`
  - `X`: `THREE.MeshStandardMaterial`
  - `Se`: `THREE.MeshBasicMaterial`
  - `Z`: `THREE.BoxGeometry`
  - `Rt`: `THREE.CylinderGeometry`
  - `sr`: `THREE.SphereGeometry`
  - `Mm`: `THREE.TorusGeometry`
  - `Xi`: `THREE.CircleGeometry`
  - `Yt`: `THREE.PlaneGeometry`
  - `cr`: `THREE.ConeGeometry`
  - `Pe`: `THREE.CanvasTexture`
  - `Xe`: `THREE.DoubleSide`
  - `sa`: `THREE.SpotLight`
  - `xT`: `THREE.VideoTexture`
- **Data Flow & Interactive Registries**:
  - Objects are added to the local room scene group (`$`).
  - Interactive targets register into `cn.current` with `{ mesh, type, artifact, label }` for raycasting.
  - Render loop updates register via `ga.current = (time) => { ... }`.
  - Artifact detail modal is triggered via `setSelectedArtifact` (`t(...)`).

## Feature Inventory
| # | Feature | Description | Milestone | Source | Status |
|---|---------|-------------|-----------|--------|--------|
| 1 | R1.1 3D Painting Plaque | CanvasTexture 2048x512, positioned below frame (`y = -height/2 - 0.38`), zero art overlap | M1 | Survey | PLANNED |
| 2 | R1.2 Detail Modal Typography | Desktop font sizes: title 28–34px (`h2#modal-artifact-title`), description 18–22px (`p`) | M1 | Survey | PLANNED |
| 3 | R1.3 Unverified Event Tagging | Explicit `[CẦN KIỂM TRA]` verification badge for unverified/missing events instead of generic filler | M1 | Survey | PLANNED |
| 4 | R2.1 Khu 1 Doorway Clearance | Remove `sb_easel1` at `(-9.84, 2.65, 9.5)` blocking `khu1EastWall` doorway; clear entrance passage | M1 | Survey | PLANNED |
| 5 | R2.2 Khu 1 6-Theme Standardization | Standardize 6 historical themes (`artK1_1..6`) along North, West, South walls with verified text and assets | M1 | Survey | PLANNED |
| 6 | R3.1 Khu 2 Doorway Clearance | Remove `sb_easel2` at `(9.84, 2.65, 9.5)` blocking `khu2WestWall` entrance | M1 | Survey | PLANNED |
| 7 | R3.2 Khu 2 Purge Static Frames | Remove all static paintings and frames (`artK2_1..6`, `sb_art3..4`) from Khu 2 walls and corridors | M1 | Survey | PLANNED |
| 8 | R3.3 Khu 2 Cinema Video Projection | Preserve 11.2m screen, 3-tiered seats, HTML5 video player (`videos/tiet1_apbac.mp4`), play/pause controls | M1 | Survey | PLANNED |
| 9 | R4.1 Khu 3 Clean Floating Frames | Remove erroneous floating frames `artK3_w1..w4` (lines 13315–13354) | M2 | Survey | PLANNED |
| 10 | R4.2 Khu 3 7 Historical Paintings | Mount 7 distinct historical paintings (Bình Giã, An Lão, Ba Gia, Đồng Xoài, Đấu tranh CT, Phá ấp CL, Thất bại 1965) | M2 | Survey | PLANNED |
| 11 | R4.3 Khu 3 Exhibit Clearances | Balanced collision-free layout with $> 13$m clearance from Tank 843 and UH-1 plinths and 18m central boulevard | M2 | Survey | PLANNED |
| 12 | R5.1 Old Diorama Complete Removal | Detach `dioramaGroup` (lines 11295–12071), remove `dioramaSpot1/2`, clean `cn.current` raycast and `ga.current` animation | M3 | Survey | PLANNED |
| 13 | R5.2 3D Diorama Cyan Glowing Pedestal | 6.4m x 5.0m x 0.78m pedestal with walnut finish, gold trim, luminous cyan `#00e5ff` LED border, warm spotlight | M3 | Survey | PLANNED |
| 14 | R5.3 3D Multi-Tiered Terrain | Rice paddies (golden/green), earthen dikes, canal with wooden bridge, coconut groves, bamboo, thatched huts, trenches | M3 | Survey | PLANNED |
| 15 | R5.4 Authentic 3D Military Models | Volumetric Three.js meshes: NLF soldiers (bà ba, nón tai bèo, B-40, AK), ARVN troops, M113 APC, UH-1 helicopters, 3D smoke/fire | M3 | Survey | PLANNED |
| 16 | R5.5 Diorama Hotspots & Controls | 5 tactical battlefield hotspots with info cards; independent animation toggle without camera/keyboard interference | M3 | Survey | PLANNED |
| 17 | R6.1 System Preservation & Zero Errors | 0 console errors, intact camera/controls, intact Auto-Tour, intact audio & core exhibits | M4 | Survey | PLANNED |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Normalize Khu 1, Khu 2 & Painting Typography | R1 (plaque & modal fonts), R2 (Khu 1 door & 6 themes), R3 (Khu 2 door, purge static frames, cinema verify) | Survey | PLANNED |
| M2 | Khu 3 Historical Wall Paintings Integration | R4 (remove floating frames, mount 7 distinct historical paintings with collision-free layout, preserve 3D artifacts) | M1 contracts | PLANNED |
| M3 | 3D Diorama Đội Ấp Bắc Replacement | R5 (clean old diorama removal, cyan glowing pedestal, multi-tier terrain, 3D military models, hotspots, animation toggle) | M1, M2 | PLANNED |
| M4 | Dual Track E2E Testing, Verification & Forensic Audit | R6 (0 console errors, regression testing, full 10-step walkthrough, independent forensic audit) | M1, M2, M3 | PLANNED |

## Interface Contracts
### `createGrandArtFrame(config)`
- **Parameters**: `{ x, y, z, width, height, rotY, title, description, date, imageUrl, isVerified }`
- **Behavior**:
  - Creates 5-layer museum frame at specified coordinate.
  - Plaque at `y = -height/2 - 0.38`, resolution 2048x512.
  - If `isVerified === false`, prepends `[CẦN KIỂM TRA]` to title and displays verification tag on plaque.
  - Registers `artMesh` and `plaqueMesh` with `cn.current`.

### `vI` Modal Typography Styles
- **Title (`h2#modal-artifact-title`)**: `fontSize: "clamp(28px, 2.5vw, 34px)"` (or `30px`), desktop readable, high contrast.
- **Content (`p`)**: `fontSize: "clamp(18px, 1.4vw, 22px)"` (or `19px`), line-height 1.7.

### `createApBacDiorama3DModule(config)`
- **Parameters**: `{ scene: $, interactiveTargets: cn.current, position: { x: 0, y: 0, z: 9.5 } }`
- **Output Objects**:
  - `root`: `THREE.Group` (`It`), placed at `(0, 0, 9.5)`.
  - `pedestal`: $6.4\text{m} \times 5.0\text{m} \times 0.78\text{m}$, cyan edge `#00e5ff`, warm spotlight.
  - `terrain`: Multi-tier terrain, rice paddies, canal, bridges, coconut trees, huts.
  - `militaryModels`: True 3D soldier meshes (NLF & ARVN), M113 APC, UH-1 helicopters, volumetric smoke.
  - `hotspots`: 5 interactive beacons registered into `cn.current` opening tactical battle cards.
  - `controls`: `toggleAnimation()` method and UI button.

## Code Layout
- Target File: `c:\Users\ADMIN\Pictures\BaoTangLichSuSo_3D_SanSangChay\BAO_TANG_LICH_SU_SO.html`
- Allowed Edit Ranges:
  - M1: Lines 12013–12029 (door frames), Lines 12680–13169 (Khu 1 & Khu 2 frames), Line 15244 (modal styles).
  - M2: Lines 13170–13400 (Khu 3 wall paintings).
  - M3: Lines 11295–12071 (Diorama group and lighting).
  - M4: Read-only verification and E2E test execution.
- Syntax Verification Tool: `node verify_build_syntax.cjs`
- Requirements Verification: `node verify_all_requirements.cjs`
- Spatial Clearance Verification: `node verify_khu3_spatial_clearance.cjs`
