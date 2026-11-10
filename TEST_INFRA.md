# TEST_INFRA.md: E2E Test Suite Infrastructure & Authoritative Specification
**Project**: Bảo Tàng Lịch Sử Số 3D – Dấu Ấn Miền Nam (1961–1965)  
**Target Codebase**: `BAO_TANG_LICH_SU_SO.html`  
**Test Suite File**: `tests/test_e2e_requirements_suite.cjs`  
**Integrity Mode**: Development / Dual-Track Engineering  

---

## 1. Test Philosophy: Opaque-Box & Requirement-Driven

The test suite is designed as an authoritative, independent, opaque-box testing harness strictly derived from the approved user requirements specified in `ORIGINAL_REQUEST.md` and `PROJECT.md`.

### Core Axioms
1. **Opaque-Box Verification**: The test suite evaluates observable behavior, geometry, DOM nodes, computed styles, 3D scene hierarchies, spatial clearances, and media registry contracts without coupling to arbitrary internal implementation quirks.
2. **Authoritative Specification**: Expected values are directly derived from the historical script (`kich_ban_doi_ap_bac.docx` / `KICH_BAN_DOI_AP_BAC_CHUAN.txt`) and user requirements R1 through R6.
3. **Dual-Track Independence**: Test definitions are established prior to and independently of feature completion, enabling true Test-Driven Development (TDD) where unfulfilled features fail deterministically in baseline execution and turn green upon compliant implementation.
4. **Adversarial Rigor**: Tests evaluate boundary limits, door clearances, collision avoidance, typographic clamps, extreme aspect ratios, event listener idempotency, and scene graph hygiene.
5. **Zero External Dependency**: The test runner executes directly on Node.js using standard library modules (`fs`, `path`, `vm`, `assert`) with simulated 3D spatial engines and DOM parsing.

---

## 2. Feature Inventory Test Mapping (R1 – R6)

| Req ID | Requirement Title | Key Acceptance Criteria Tested | Primary Target Artifacts in `BAO_TANG_LICH_SU_SO.html` |
|---|---|---|---|
| **R1** | Hiển thị thông tin tranh khi tự động tạo | Plaque resolution 2048x512, position `y = -height/2 - 0.38` (zero art overlap), unverified badge `[CẦN KIỂM TRA]`, modal title 28–34px, modal content 18–22px. | `createGrandArtFrame`, `vI` modal (`h2#modal-artifact-title`, `p`), `cn.current` |
| **R2** | Khu 1 – Loại bỏ tranh chắn cửa & chuẩn hóa tranh | Removal of `sb_easel1` at `(-9.84, 2.65, 9.5)` blocking doorway; 6 verified themes (Đồng Khởi, Staley-Taylor, MACV, Trực thăng vận, Thiết xa vận, Ấp chiến lược). | `khu1EastWall`, `artK1_1..6`, `sb_easel1`, passage clearance |
| **R3** | Khu 2 – Phòng chiếu phim tư liệu chuyên biệt | Removal of `sb_easel2` at `(9.84, 2.65, 9.5)`; complete purge of static paintings (`artK2_1..6`, `sb_art3..4`); preservation of 11.2m cinema screen & video player. | `khu2WestWall`, `artK2_1..6`, `sb_easel2`, `cinemaProj`, `oI` |
| **R4** | Khu 3 – Bổ sung tranh lịch sử trên tường | Purge floating frames `artK3_w1..w4`; 7 distinct historical paintings on wall surfaces; spatial clearance >13m from Tank 843 and UH-1; 18m central corridor preserved. | `artK3_w1..w4`, `k3Partition`, 7 victory paintings, bounding boxes |
| **R5** | Sa bàn 3D Đội Ấp Bắc mới | Complete removal of old diorama (`dioramaGroup` lines 11295–12071); 6.4x5.0x0.78m pedestal with `#00e5ff` cyan glow; multi-tier terrain; authentic 3D military models (NLF, ARVN, M113, UH-1, 3D smoke); 5 hotspots; animation toggle. | Old `dioramaGroup`, `createApBacDiorama3DModule`, `cn.current`, `ga.current` |
| **R6** | Ràng buộc bảo toàn & Zero Errors | 0 syntax errors across all `<script>` tags; intact Three.js classes; intact camera controls (WASD, mouse); intact Auto-Tour and voiceover audio. | Global VM script syntax, scene graph integrity, event handlers |

---

## 3. Test Architecture & Runner Semantics

### Runner Command
```bash
node tests/test_e2e_requirements_suite.cjs
```

### Command Flags
- `node tests/test_e2e_requirements_suite.cjs` (Standard run: exits with code `0` if all pass, code `1` if any fail).
- `node tests/test_e2e_requirements_suite.cjs --baseline` (Baseline mode: prints comprehensive failure analysis and exits with code `0` for baseline reporting).
- `node tests/test_e2e_requirements_suite.cjs --self-test` (Self-test harness integrity verification).

### Output Diagnostics
For each test case:
- `[PASS] <Test Description>`
  - `└─ <Verification Metric / Measured Value>`
- `[FAIL] <Test Description>`
  - `└─ Expected: <Expected Value>, Actual: <Actual Value>`

Summary table prints at the end with Total Executed, Passed, Failed, and Quality Gate Verdict (`APPROVE` / `REJECT`).

---

## 4. Coverage Thresholds & Test Tier Specifications

### Tier 1: Feature Coverage (>=5 test cases per feature for R1–R5, >= 25 total)

#### Feature R1: Painting Plaque & Typography
- `T1.R1.1`: Plaque canvas texture resolution matches exactly $2048 \times 512$ px for ultra-sharp typography.
- `T1.R1.2`: Plaque position offset is strictly below painting frame (`y = -height/2 - 0.38`), eliminating artwork occlusions.
- `T1.R1.3`: Unverified event tagging badge `[CẦN KIỂM TRA]` is automatically prepended to titles when `isVerified === false` or unverified event detected.
- `T1.R1.4`: Detail modal title typography (`h2#modal-artifact-title`) conforms to desktop requirement 28–34px (e.g. `clamp(28px, 2.5vw, 34px)` or `30px`).
- `T1.R1.5`: Detail modal content typography (`p`) conforms to desktop requirement 18–22px (e.g. `clamp(18px, 1.4vw, 22px)` or `19px`).
- `T1.R1.6`: Painting and plaque interactive meshes register with `cn.current` for raycasting.

#### Feature R2: Khu 1 Doorway & 6 Themes
- `T1.R2.1`: Doorway clearance: `sb_easel1` at coordinate `(-9.84, 2.65, 9.5)` is eliminated from doorway passage.
- `T1.R2.2`: East wall entrance corridor (`x = -10, z = 9.5`) is completely unobstructed by easel frames.
- `T1.R2.3`: Theme 1 — Phong trào Đồng khởi (1959–1960) mounted with authentic title, date, and description.
- `T1.R2.4`: Theme 2 — Kế hoạch Staley - Taylor / CTĐB mounted on North wall with authentic data.
- `T1.R2.5`: Theme 3 — Quân đội Sài Gòn & Cố vấn MACV mounted on West wall.
- `T1.R2.6`: Themes 4, 5, 6 — Trực thăng vận, Thiết xa vận, Ấp chiến lược mounted with historical descriptions.

#### Feature R3: Khu 2 Cinema & Purge of Static Art
- `T1.R3.1`: Doorway clearance: `sb_easel2` at coordinate `(9.84, 2.65, 9.5)` is eliminated from doorway passage.
- `T1.R3.2`: Complete removal of static painting frames `artK2_1..6` from Khu 2 walls.
- `T1.R3.3`: Zero static painting frames on Khu 2 walls or corridors (pure cinema hall).
- `T1.R3.4`: Preservation of 11.2m cinema projection screen on East wall (`x = 27.84, z = 9.5`).
- `T1.R3.5`: Cinema video controls and HTML5 video element integration (`oI` module) remain active and intact.

#### Feature R4: Khu 3 Historical Wall Paintings
- `T1.R4.1`: Purge of erroneous floating frames `artK3_w1..w4` (previously at `x = -10.88, y = 3.85`).
- `T1.R4.2`: Mounting of 7 distinct historical paintings covering all scripted events (Bình Giã, An Lão, Ba Gia, Đồng Xoài, Đấu tranh chính trị, Chống phá ấp chiến lược, Thất bại CTĐB 1965).
- `T1.R4.3`: Non-duplicated image assets across all 7 historical events in Khu 3.
- `T1.R4.4`: Spatial clearance of wall paintings from Tank 843 and UH-1 plinths ($> 13$m clearance).
- `T1.R4.5`: Preservation of 18m central corridor and core 3D exhibits in Khu 3.

#### Feature R5: 3D Diorama Đội Ấp Bắc Replacement
- `T1.R5.1`: Complete removal of old diorama group (`dioramaGroup` lines 11295–12071) from the scene graph.
- `T1.R5.2`: New diorama mounted on $6.4\text{m} \times 5.0\text{m} \times 0.78\text{m}$ pedestal with cyan `#00e5ff` glowing edge lighting.
- `T1.R5.3`: Multi-tier 3D terrain containing rice paddies, earthen dikes, canal, thatched huts, and coconut trees.
- `T1.R5.4`: Authentic 3D military models (NLF soldiers, ARVN soldiers, M113 APC, UH-1 helicopter, volumetric 3D smoke; no flat PNG standees).
- `T1.R5.5`: 5 interactive battlefield hotspots registered into `cn.current` with detailed tactical info cards.
- `T1.R5.6`: Independent diorama animation toggle button without interfering with camera or keyboard controls.

#### Feature R6: System Preservation & Integrity
- `T1.R6.1`: Zero syntax errors across all `<script>` tags in `BAO_TANG_LICH_SU_SO.html`.
- `T1.R6.2`: Three.js library aliases (`It`, `I`, `X`, `Se`, `Z`, `Rt`, `sr`, `Yt`, `Pe`) preserved without namespace collision.
- `T1.R6.3`: Camera navigation (WASD, mouse drag, touch controls) preserved without regressions.
- `T1.R6.4`: Auto-Tour and voiceover audio narration systems preserved and operational.

---

### Tier 2: Boundary & Corner Cases (>=5 test cases per feature for R1–R5, >= 25 total)

#### Boundary R1: Typography & Plaque Dimensions
- `T2.R1.1`: Title string wrapping stress test: strings >60 characters wrap cleanly across multiple lines within 1850px without horizontal overflow.
- `T2.R1.2`: Null/Undefined description safety: fallback string applied without throwing canvas rendering exception.
- `T2.R1.3`: Extreme painting aspect ratios ($1:3$ portrait, $3:1$ panoramic) calculate non-distorted canvas dimensions.
- `T2.R1.4`: Modal opens gracefully with minimal artifact data (missing year or missing category).
- `T2.R1.5`: Typography CSS clamp rules evaluate to minimum 28px on small screens and clamp at 34px on large 4K displays.

#### Boundary R2: Doorway Spatial Volume & Passage Bounds
- `T2.R2.1`: Khu 1 entrance portal volume `X in [-10.5, -9.5], Y in [0, 4.0], Z in [7.5, 11.5]` has zero intersecting art frames.
- `T2.R2.2`: North wall paintings (`artK1_1`, `artK1_2`) maintain minimum 0.5m clearance from East and West corners.
- `T2.R2.3`: South wall paintings (`artK1_5`, `artK1_6`) maintain minimum 0.5m clearance from East and West corners.
- `T2.R2.4`: West wall paintings (`artK1_3`, `artK1_4`) maintain minimum 2.0m inter-frame spacing.
- `T2.R2.5`: All 6 Khu 1 paintings have non-empty titles (>10 chars) and non-empty descriptions (>50 chars).

#### Boundary R3: Zero Static Paintings in Khu 2
- `T2.R3.1`: Khu 2 entrance portal volume `X in [9.5, 10.5], Y in [0, 4.0], Z in [7.5, 11.5]` has zero intersecting art frames.
- `T2.R3.2`: Scene graph audit: zero `createGrandArtFrame` instances mounted inside Khu 2 volume `X in [10, 28], Z in [3, 16]`.
- `T2.R3.3`: Cinema screen aspect ratio maintains high-definition ratio $11.2\text{m} : 4.9\text{m} \approx 2.28:1$.
- `T2.R3.4`: 3 rows of cinema seats positioned with unobstructed view toward screen at $Z = 9.5$.
- `T2.R3.5`: Video player state transitions (PLAYING, PAUSED, IDLE) update correctly without DOM detachment.

#### Boundary R4: Spatial Clearance & Wall Flush Geometry
- `T2.R4.1`: Wall flush offset: all 7 Khu 3 paintings have distance from wall backing $\le 0.20$m.
- `T2.R4.2`: Zero exterior wall penetration: no painting vertex penetrates exterior walls ($Z < -22.0$, $X < -28.0$, $X > 28.0$).
- `T2.R4.3`: Inter-painting collision avoidance: pairwise distance between any two paintings on same wall $\ge 0.80$m.
- `T2.R4.4`: Exhibit clearance: minimum Euclidean distance from Tank 843 center $(X=-14, Z=-14)$ is $> 10$m.
- `T2.R4.5`: Exhibit clearance: minimum Euclidean distance from UH-1 Helicopter center $(X=14, Z=-14)$ is $> 10$m.

#### Boundary R5: Diorama Geometry & Volume Constraints
- `T2.R5.1`: Old diorama meshes completely dereferenced (`replicaMiniDiorama` and old mesh children removed).
- `T2.R5.2`: Raycaster registry hygiene: `cn.current` contains zero orphan references to deleted diorama parts.
- `T2.R5.3`: Bounding box containment: all terrain meshes and military models are contained within pedestal boundary `X in [-3.2, +3.2], Z in [7.0, 12.0], Y in [0.78, 3.5]`.
- `T2.R5.4`: Volumetric verification: soldier and vehicle models use volumetric geometries (`BoxGeometry`, `CylinderGeometry`, `SphereGeometry`), not flat `PlaneGeometry` PNG cutouts.
- `T2.R5.5`: Animation loop safety: `ga.current` animation callback does not mutate camera position or Euler rotations.

#### Boundary R6: DOM & Scene Graph Hygiene
- `T2.R6.1`: All inline `<script>` tags in `BAO_TANG_LICH_SU_SO.html` compile cleanly in Node.js VM context.
- `T2.R6.2`: Interactive targets in `cn.current` all contain valid `mesh` objects with defined geometries and materials.
- `T2.R6.3`: Modal dialog has proper accessibility attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-artifact-title"`).
- `T2.R6.4`: Global painting registry `window.__registerMuseumPainting` accepts and maps all registered paintings without collisions.
- `T2.R6.5`: Memory disposal: unmount cleanup functions properly dispose geometries, textures, and event listeners.

---

### Tier 3: Cross-Feature Combinations (Pairwise Interactions, >= 5 total)

- `T3.CFC.1` (R1 + R2): Clicking any of the 6 standardized Khu 1 paintings opens the detail modal displaying matching title, description, and typography with font-size $\ge 28$px.
- `T3.CFC.2` (R1 + R4): Clicking any of the 7 new Khu 3 historical wall paintings opens the detail modal with authentic metadata and verified status badge.
- `T3.CFC.3` (R2 + R3): Continuous visitor transit from Khu 1 entrance through central hall into Khu 2 cinema encounters zero doorway collisions (`sb_easel1` and `sb_easel2` completely absent).
- `T3.CFC.4` (R3 + R5): Concurrent video playback on Khu 2 cinema screen does not disrupt diorama 3D rendering loop or raycast responsiveness in the central hall.
- `T3.CFC.5` (R4 + R5): Standing at the diorama observation waypoint $(0, 1.85, 12.5)$ provides an unobstructed sightline looking north toward Khu 3 historical wall paintings without visual occlusion or z-fighting.

---

### Tier 4: Real-World Application Scenarios (Realistic Walkthroughs, >= 5 total)

- `T4.RWS.1`: **Grand Official Museum Tour Walkthrough**:
  - Trajectory: Entrance Foyer $(0, 1.85, 24.0) \to$ Sa Bàn Waypoint $(0, 1.85, 12.5) \to$ Khu 1 Entrance $(-10, 1.85, 9.5) \to$ Khu 1 Center $(-19, 1.85, 9.5) \to$ Khu 2 Cinema $(19, 1.85, 9.5) \to$ Khu 3 Victory Hall $(0, 1.85, -10.5)$.
  - Verifies that all waypoints have unobstructed paths, proper lighting, and expected exhibits.
- `T4.RWS.2`: **Self-Guided Historical Student Exploration**:
  - Simulates a student walking into Khu 1, sequentially inspecting each of the 6 Chiến tranh đặc biệt themes, verifying that each painting opens its detail modal with sharp 28–34px title text, and exits through the unobstructed doorway.
- `T4.RWS.3`: **Cinema Documentary Experience**:
  - Simulates a visitor entering Khu 2, observing zero static wall frames, sitting in tiered cinema seats, starting video playback of *Chiến thắng Ấp Bắc*, scrubbing the timeline, pausing, and exiting cleanly.
- `T4.RWS.4`: **Military Tactician at 3D Diorama Đội Ấp Bắc**:
  - Simulates a military history enthusiast examining the new cyan-glowing diorama, zooming to tactical hotspots, verifying 3D volumetric models (M113, UH-1, NLF guerrillas), reading battle cards, and toggling animation.
- `T4.RWS.5`: **Curator Audit of 1963–1965 Victory Gallery (Khu 3)**:
  - Simulates an independent museum curator verifying that all 7 victory paintings are mounted on wall surfaces with balanced spacing, checking that Tank 843 and UH-1 plinths have $>13$m clearance, and confirming 0 console errors throughout the session.

---

## 5. Pass/Fail Decision Matrix

| Exit Code | Condition | Meaning |
|---|---|---|
| `0` | `totalFailed === 0` (or `--baseline` flag active) | Quality Gate APPROVED (or Baseline captured) |
| `1` | `totalFailed > 0` (standard run) | Quality Gate REJECTED — Implementation defects present |

---

## 6. Execution Command
To run the automated suite:
```powershell
node tests/test_e2e_requirements_suite.cjs
```
To run in baseline recording mode:
```powershell
node tests/test_e2e_requirements_suite.cjs --baseline
```
