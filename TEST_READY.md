# TEST_READY.md: Authoritative E2E Test Suite Readiness & Baseline Report
**Project**: Bảo Tàng Lịch Sử Số 3D – Dấu Ấn Miền Nam (1961–1965)  
**Target Codebase**: `BAO_TANG_LICH_SU_SO.html`  
**Test Suite Path**: `tests/test_e2e_requirements_suite.cjs`  
**Architecture Specification**: `TEST_INFRA.md`  
**Author**: E2E Test Suite Architect (teamwork_test_writer)  
**Date**: 2026-11-06  
**Status**: TEST_SUITE_PUBLISHED & BASELINE_CAPTURED  

---

## 1. Executive Summary

The automated, requirement-driven, opaque-box End-to-End (E2E) test suite for the Bảo Tàng Lịch Sử Số project is **fully implemented, self-tested, published, and operational**.

In strict adherence to the **Dual-Track Engineering methodology**, the test suite was constructed independently from implementation details, derived authoritatively from `ORIGINAL_REQUEST.md` and `PROJECT.md`. The baseline execution was run against `BAO_TANG_LICH_SU_SO.html`, accurately establishing the initial quality baseline:

- **Total Test Cases Executed**: 72
- **Baseline Passing Tests**: 53 (73.6%)
- **Baseline Expected Failures**: 19 (26.4%)
- **Self-Test Status**: PASSED (100% harness integrity)

All 19 failures directly correspond to planned, uncompleted milestones (M1 typography & Khu 2 static paintings, M2 floating frames, M3 3D diorama replacement). No false positives or fragile facade checks exist.

---

## 2. Test Architecture & Runner Interface

### Standard Execution (Quality Gate Mode)
Exits with code `0` if all 72 tests pass, code `1` if any failure occurs:
```bash
node tests/test_e2e_requirements_suite.cjs
```

### Baseline Diagnostic Mode
Exits with code `0` while outputting a detailed failure audit report:
```bash
node tests/test_e2e_requirements_suite.cjs --baseline
```

### Self-Test Mode
Verifies test runner assertions, mock harnesses, and HTML loading without evaluation:
```bash
node tests/test_e2e_requirements_suite.cjs --self-test
```

---

## 3. Baseline Execution Metrics by Coverage Tier

| Tier | Tier Description | Minimum Required | Actual Implemented | Passed | Failed | Pass Rate |
|---|---|---|---|---|---|---|
| **Tier 1** | Feature Coverage (R1–R6) | $\ge 25$ | 32 | 23 | 9 | 71.9% |
| **Tier 2** | Boundary & Corner Cases | $\ge 25$ | 30 | 27 | 3 | 90.0% |
| **Tier 3** | Cross-Feature Pairwise Interactions | $\ge 5$ | 5 | 2 | 3 | 40.0% |
| **Tier 4** | Real-World Application Walkthroughs | $\ge 5$ | 5 | 1 | 4 | 20.0% |
| **TOTAL** | **Comprehensive Full Spectrum** | $\ge 60$ | **72** | **53** | **19** | **73.6%** |

---

## 4. Milestone Traceability Matrix for the 19 Baseline Failures

The 19 failing tests serve as authoritative acceptance criteria for downstream development workers:

### Milestone 1: Typography & Khu 1 / Khu 2 Standardization (7 Tests)
| Test ID | Test Name | Expected Behavior | Baseline Finding |
|---|---|---|---|
| `T1.R1.4` | Detail modal title typography | Desktop font size 28–34px (`h2#modal-artifact-title`) | Actual: 17px (`fontSize: "17px"`) |
| `T1.R1.5` | Detail modal content typography | Desktop font size 18–22px (`p`) | Actual: 14px (`fontSize: "14px"`) |
| `T1.R3.2` | Purge static paintings in Khu 2 | All static frames (`artK2_1..6`) purged from Khu 2 | Actual: `artK2_1..6` still added to scene |
| `T1.R3.3` | Pure cinema metadata registry | Zero static painting metadata in Khu 2 registry | Actual: `k2_art1..6` registered |
| `T2.R3.2` | Scene graph audit for Khu 2 volume | Exact 0 `createGrandArtFrame` meshes in Khu 2 | Actual: Static art meshes present |
| `T3.CFC.1` | R1 + R2 Typography Integration | Modal opens with $\ge 28$px title on painting click | Actual: Font size 17px |
| `T4.RWS.2` | Student Exploration Walkthrough | Sequential inspection of 6 themes with legible font | Actual: Typography failed |
| `T4.RWS.3` | Cinema Attendee Experience | Pure cinema room with 0 wall clutter and seats | Actual: Static wall paintings present |

### Milestone 2: Khu 3 Historical Wall Paintings (3 Tests)
| Test ID | Test Name | Expected Behavior | Baseline Finding |
|---|---|---|---|
| `T1.R4.1` | Purge floating frames `artK3_w1..w4` | Floating frames removed from lines 13315–13354 | Actual: Still attached to scene |
| `T3.CFC.5` | Diorama to Khu 3 sightline | Clear sightline $>12$m without floating frames | Actual: Obstructed by `artK3_w1..w4` |
| `T4.RWS.5` | Curator Audit of 1963–1965 Gallery | 7 balanced wall paintings with 0 floating frames | Actual: Floating frames present |

### Milestone 3: 3D Diorama Đội Ấp Bắc Replacement (9 Tests)
| Test ID | Test Name | Expected Behavior | Baseline Finding |
|---|---|---|---|
| `T1.R5.1` | Complete old diorama removal | Old module `replicaMiniDiorama` completely removed | Actual: `replicaMiniDiorama` present |
| `T1.R5.2` | Cyan glowing pedestal | $6.4\text{m} \times 5.0\text{m} \times 0.78\text{m}$ pedestal with `#00e5ff` | Actual: Old $5.8\text{m} \times 4.8\text{m}$ dais |
| `T1.R5.5` | 5 tactical battlefield hotspots | 5 interactive hotspots registered in `cn.current` | Actual: Hotspots missing |
| `T1.R5.6` | Independent animation toggle | Safe animation toggle button without camera interference | Actual: Missing |
| `T2.R5.1` | Old diorama source code purge | Zero residual references to old diorama constructs | Actual: Residual constructs found |
| `T2.R5.2` | Raycaster targets hygiene | Zero orphan diorama targets in `cn.current` | Actual: `dongkhoi-diorama` present |
| `T3.CFC.4` | Cinema video & diorama coexistence | Decoupled render loop without diorama conflict | Actual: Old diorama collision |
| `T4.RWS.4` | Military Tactician Experience | True 3D terrain, authentic military models, hotspots | Actual: Old diorama present |

---

## 5. Downstream Milestone Acceptance Criteria

1. **Milestone 1 Completion**:
   - Run `node tests/test_e2e_requirements_suite.cjs`
   - Target result: Baseline failures drop from 19 to 11 (8 M1 tests turn `[PASS]`).
2. **Milestone 2 Completion**:
   - Run `node tests/test_e2e_requirements_suite.cjs`
   - Target result: Baseline failures drop from 11 to 8 (3 M2 tests turn `[PASS]`).
3. **Milestone 3 Completion**:
   - Run `node tests/test_e2e_requirements_suite.cjs`
   - Target result: Baseline failures drop from 8 to 0 (8 M3 tests turn `[PASS]`).
4. **Milestone 4 (Final Quality Gate)**:
   - Suite executes with **72 / 72 PASS (100%)**, 0 failures, exit code `0`.
   - Syntax verification `node verify_build_syntax.cjs` exits with code `0`.

---

## 6. Verification Method

To independently verify the test suite:
```powershell
# 1. Run harness self-test
node tests/test_e2e_requirements_suite.cjs --self-test

# 2. Run baseline verification
node tests/test_e2e_requirements_suite.cjs --baseline

# 3. Verify exit code semantics
node tests/test_e2e_requirements_suite.cjs
echo $LASTEXITCODE # Expected: 1 prior to full implementation
```
