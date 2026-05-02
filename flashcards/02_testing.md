# Flashcards — Software Testing

Covers: Final Review slides 17, 23, 24, 25, 28, 33, 49, 58, 59. Source: Lessons 15–18.

---

## Section A — What Testing Is

**Q:** Define software testing (the course's "definition of done" for testing).

**A:** Software testing is the **dynamic verification that a program provides expected behaviors on a finite set of test cases**.

---

**Q:** Identify and explain the four key terms in the definition of software testing.

**A:**
- **Dynamic** — the code is actually executed (not just inspected).
- **Expected** — every test compares observed output to a known correct answer.
- **Finite** — exhaustive testing is impossible, so we choose a sample.
- **Verification** — we are checking conformance to specifications.

---

**Q:** Why can we not test every possible input?

**A:** The space of possible inputs is effectively infinite. Our challenge is to **intelligently select a subset of tests that represent the highest risks and most common uses.**

---

**Q:** Finish the sentence: Our tests are useless unless we know what _______ looks like.

**A:** **"correct"** — we must check the software's output against the specifications/requirements before we can claim it passed.

---

**Q:** Why must a tester execute the software, not just read it?

**A:** Bugs only manifest at runtime under real inputs and system states. Reading code can find some defects, but **dynamic verification** is needed to see how the software actually behaves.

---

## Section B — Test-Driven Development (TDD)

**Q:** What is Test-Driven Development (TDD)? Other name?

**A:** Also called **Test-First Programming**. It is a development style where **test cases are written *before* the implementation code**.

---

**Q:** What are the three steps of the TDD process?

**A:**
1. **Write a failing test** for a new feature (it must fail initially).
2. **Write the minimum code** necessary to make the test pass.
3. **Refactor** the code to meet quality standards, ensuring the test still passes.

---

**Q:** What is the TDD rhythm called?

**A:** **Red → Green → Refactor.**
- **Red:** write a failing test (proves the test works and defines what to build).
- **Green:** write the absolute minimum production code to pass.
- **Refactor:** clean up the code while staying green.

---

**Q:** Why does TDD start with a *failing* test (the "Red" step)?

**A:** A failing test proves the test is actually exercising the new behavior. If it passed before any code was written, the test would be meaningless.

---

**Q:** Name three advantages of TDD.

**A:**
1. **Detects defects sooner** (smaller increments mean smaller debug surface).
2. **Forces critical thinking upfront** — writing the test first forces designers to clarify requirements.
3. **Creates a safety net** — the suite of tests acts as regression protection when refactoring or adding features.

---

**Q:** (MCQ) Which is true about TDD?

  A. You write all tests after the code is finished.
  B. You write the test first, then write minimum code to pass it, then refactor.
  C. You don't refactor — refactoring breaks tests.
  D. The first run of a TDD test should always pass.

**A:** **B.**

---

## Section C — The Testing Pyramid (Levels of Testing)

**Q:** Name the four levels of the testing pyramid, from bottom to top.

**A:** **Unit → Integration → System → Acceptance.**

---

**Q:** What does the **base** of the testing pyramid contain, and why is it the largest layer?

**A:** **Unit tests.** They are **many, very fast, and cheap** — testing individual functions/classes in isolation. They form the foundation because confidence is built from the ground up.

---

**Q:** What does the **top** of the testing pyramid contain, and why is it the smallest layer?

**A:** **Acceptance tests** — confirming the system meets the customer's needs. They are few because they're slow, expensive, and validate end-user value rather than internal correctness.

---

**Q:** Match each level to its purpose: Unit / Integration / System / Acceptance.

**A:**
- **Unit** — verifies the smallest pieces of code (a single function, method, or class).
- **Integration** — ensures pieces work *together* (testing connections between modules).
- **System** — validates the complete, fully assembled software.
- **Acceptance** — confirms the system meets the customer's needs/requirements.

---

**Q:** Finish the sentence: Each level of the testing pyramid validates the one _______ it.

**A:** **below** — confidence builds from the ground up; you cannot have a meaningful system test if the units are broken.

---

**Q:** What is a "balanced" test pyramid strategy?

**A:** **Lots** of small, fast unit tests; **some** integration tests for critical interactions; **a few** high-value, end-to-end system tests to simulate real user workflows. Many fast cheap tests at the bottom, few slow expensive ones at the top.

---

**Q:** (MCQ — select all that apply) The Testing Pyramid says that as you climb levels, tests become:

  A. Faster
  B. Slower
  C. Cheaper
  D. More expensive
  E. Fewer in number
  F. More numerous

**A:** **B, D, E.** Higher-level tests are slower, more expensive, and fewer.

---

## Section D — Unit Testing in Detail

**Q:** What does a unit test focus on?

**A:** A **single, isolated component** — one function, one method, or one class — verifying it does **one thing correctly**.

---

**Q:** Name three distinct advantages of unit testing.

**A:**
1. **Fast** — single unit tests execute in milliseconds, allowing thousands to run quickly.
2. **Easy to control** — you can pass specific inputs and verify exact outputs.
3. **Easy to write** — units are small and cohesive, requiring minimal setup.

---

**Q:** Give three example unit-test questions for the IQon Elite system.

**A:**
- Does `calculateTissueDensity()` return the correct value for a given input?
- Does `savePatientRecord()` correctly write data to the database without corruption?
- Does `renderScanSlice()` handle a missing data point without crashing?

---

## Section E — Integration & System Testing

**Q:** What does integration testing answer?

**A:** **"Do the pieces fit together?"** — it tests the **connections between units** (data flow, contracts, shared state).

---

**Q:** What does system testing evaluate, and from whose perspective?

**A:** System testing evaluates the **complete, fully integrated software system** — running all components together (databases, front-end apps, services). It is done from the **user's perspective** as a black-box test.

---

**Q:** What are the three core principles of the Black-Box approach used in system testing?

**A:**
1. We do **not** care **how** the system works on the inside.
2. We do **not** care **what language** it's written in or what database it uses.
3. We **only** care that, given input X, the system produces the correct output Y.

---

**Q:** What is the home/architect analogy for system testing?

**A:** We are not the **architect** checking the blueprints — we are the **homebuyer** checking that the lights turn on and the water runs.

---

## Section F — Black-Box vs. White-Box Testing

**Q:** Define **Black-Box testing**.

**A:** Testing the **outside** — we look only at inputs and outputs, ignoring the internal code. We test against the **specification**.

---

**Q:** Define **White-Box testing**.

**A:** Testing the **inside** — we use our knowledge of the code's internal structure and logic to design tests (e.g., covering every branch).

---

**Q:** Give a black-box example for an "Apply Filter" button.

**A:** Does the "Apply Filter" button produce the correctly filtered image, as described in the user manual?

---

**Q:** Give a white-box example for a filtering algorithm.

**A:** Have we written tests that ensure every `if/else` branch within the filtering algorithm is executed?

---

**Q:** (MCQ) Which testing type ignores the source code and tests only against the specification?

  A. White-box
  B. Black-box
  C. Glass-box
  D. Structural

**A:** **B. Black-box.** (White-box, glass-box, and structural testing all use knowledge of the internal code.)

---

## Section G — Designing for Testability

**Q:** What does the principle "Designing for Testability" mean?

**A:** **Testability is not an accident or afterthought.** It is a fundamental design principle: code should be **architected from the start** so that it is easy to write automated tests for.

---

**Q:** Finish the sentence: If our code is hard to test, we probably _______.

**A:** **won't test it.**

---

**Q:** When is the right time to think about testability?

**A:**
- **Before** you write the first line of production code.
- **While** you are writing the code.
- **After** the feature is "done."
- **The answer: All the time.** Testability is a continuous design principle.

---

**Q:** Is testable code a "cost" or an "investment"? Why?

**A:** It is an **investment**. Testable code does cost more upfront, but it is the **only way to ensure sustainable quality and long-term development speed.** Spaghetti code has a low initial cost but enormous payoff debt.

---

**Q:** (MCQ) When is the wrong time to think about designing for testability?

  A. Before writing code
  B. While writing code
  C. After the feature is "done"
  D. None of the above — you should think about it at every stage

**A:** **D.** Testability is a continuous concern.

---

## Section H — Developer's Journey From Requirement to Reliable Code

**Q:** List the **five steps** of the testing development workflow (developer's journey from requirement to reliable code).

**A:**
1. **Requirement Analysis** — understand the feature request.
2. **Test-Driven Development (TDD)** — write small tests for each unit before code.
3. **Design for Testability** — build units that are easy to isolate and test from the start.
4. **Systematic Testing** — apply rigorous testing (boundary, structural) at unit, integration, and system levels.
5. **Confident Release** — release the feature to the customer after comprehensive testing.

---

**Q:** Finish the sentence: This process creates individual software units and an automated _______, ensuring quality is built in, not bolted on.

**A:** **test suite.**

---

## Section I — Regression Testing

**Q:** What is regression testing, and when do you do it?

**A:** Regression testing is **re-running tests after a change** to ensure the change didn't unintentionally break previously working features. You do it **after every fix or new feature** before release.

---

**Q:** Name three reasons regression testing is hard ("the testing gauntlet").

**A:**
1. **Cost** — repeating full testing takes significant time and money.
2. **Coordination** — other engineers may be working on the same code at the same time.
3. **Access** — production systems can't always be brought offline for tests.

---

## Section J — Catch-All Testing MCQs

**Q:** (MCQ — select all that apply) Which are true of unit tests?

  A. They are fast.
  B. They test isolated components.
  C. They simulate real end-to-end user workflows.
  D. They make up the largest layer of the test pyramid.
  E. They are slow and expensive.

**A:** **A, B, D.**

---

**Q:** (MCQ) Which list of testing levels is in correct **bottom-to-top** pyramid order?

  A. Acceptance, System, Integration, Unit
  B. Unit, System, Integration, Acceptance
  C. Unit, Integration, System, Acceptance
  D. System, Integration, Acceptance, Unit

**A:** **C.**

---

**Q:** (MCQ) The TDD cycle is best described as:

  A. Write code → Test → Document
  B. Test → Code → Refactor (Red → Green → Refactor)
  C. Refactor → Test → Code
  D. Design → Code → Test

**A:** **B.**
