# Flashcards — Software Configuration Management (SCM)

Covers: Final Review slides 96, 98, 99, 100, 101, 104. Source: Lesson 23.

---

## Section A — What SCM Is

**Q:** Define **Software Configuration Management (SCM)** — formal definition.

**A:** SCM is the **discipline of identifying the configuration of a system at distinct points in time** in order to **systematically control changes to the configuration** and **maintain the integrity and traceability of the configuration** throughout the system life cycle.

---

**Q:** What is SCM in plain English?

**A:** SCM is the **rulebook** for:
- **Knowing** exactly what comprises your software.
- **Controlling** how, when, and why it changes.
- **Keeping** a complete history of every change ever made.

---

**Q:** Finish the sentence: In software engineering, software configuration management is the **task of tracking and controlling _______ in the software**.

**A:** **changes.**

---

**Q:** What are the **six sub-areas** in SCM (the SCM ribbon)?

**A:**
1. Management of the SCM process
2. Identification
3. Control
4. Status Accounting
5. Auditing
6. Software Release Management and Delivery
(Plus a tools/management overlay.)

---

## Section B — The Four Core Functions of SCM

**Q:** Name the **four core functions** of SCM.

**A:** **Identify, Control, Audit, Report.**

---

**Q:** What is the **Identify** function of SCM?

**A:** Cataloging every piece of the project. This includes **code, documentation, design models, and test data.** *"What are we controlling?"*

---

**Q:** What is the **Control** function of SCM?

**A:** Manage changes to the project. This involves a **formal process for proposing, evaluating, and approving changes.** *"How do we prevent chaos?"*

---

**Q:** What is the **Audit** function of SCM?

**A:** **Verify** the product is correct. It means checking that the approved changes were actually implemented and that the final product matches the documentation. *"Is what we built what we **planned** to build?"*

---

**Q:** What is the **Report** function of SCM?

**A:** Document the process. This involves tracking the status of all changes and providing a clear history of the project's evolution. *"What changed, and when?"*

---

**Q:** Finish the sentence: SCM identifies items, controls **changes**, audits the result, and **_______**.

**A:** **reports** the history.

---

**Q:** (MCQ) Which SCM core function answers "Is what we built what we planned to build?"

  A. Identify
  B. Control
  C. Audit
  D. Report

**A:** **C. Audit.**

---

## Section C — SCM as the Foundation of SQA

**Q:** Why is SCM the foundation of Software Quality Assurance (SQA)?

**A:** A good SCM process is your **best defense against bugs and failed releases**. It supports SQA by ensuring **traceability, reproducibility, and consistency**.

---

**Q:** Name the **three SQA pillars** that SCM enables.

**A:**
1. **Traceability** — every line of code can be traced back to a specific requirement or approved change request.
2. **Reproducibility** — we can reliably recreate any previous version of the software for investigation.
3. **Consistency** — code, documentation, and final product are always in sync.

---

**Q:** Finish the sentence: "SQA processes provide assurance that the software products and processes conform to their specified requirements... SCM activities help in accomplishing this _______ goal."

**A:** **SQA**.

---

**Q:** (MCQ — select all that apply) Which SQA pillars does SCM directly support?

  A. Traceability
  B. Reproducibility
  C. Marketability
  D. Consistency

**A:** **A, B, D.**

---

## Section D — Identification (The First Step)

**Q:** What is the first step of control in SCM?

**A:** **Identification.** "**You cannot control what you cannot identify.**"

---

**Q:** Define **software configuration identification**.

**A:** The **process of identifying items to be controlled** and **establishing unique identification schemes** for them and their versions.

---

**Q:** Finish the sentence: To solve our bug problem, we can't just dive into the code — we first need a system. This discipline is called **_______**.

**A:** **Software Configuration Management (SCM).**

---

**Q:** (MCQ) "You cannot control what you cannot _______." Fill in the blank.

  A. measure
  B. identify
  C. test
  D. document

**A:** **B. identify.**

---

## Section E — Software Configuration Items (SCIs)

**Q:** What is a **Software Configuration Item (SCI)**?

**A:** Any **software entity managed as a single unit** under SCM. Think of SCIs as the **official building blocks** of your product.

---

**Q:** Why don't we manage the entire software as one giant monolith?

**A:** A monolith is too big to track. Instead, we manage **individual, trackable pieces (SCIs)** — making changes localized and traceable.

---

**Q:** What is the **balancing act** when choosing SCIs?

**A:**
- **Too few** SCIs → you don't have enough control.
- **Too many** SCIs → the system becomes too complex to manage.

You need to pick the right granularity.

---

**Q:** Examples of typical SCIs?

**A:** Source-code modules, design documents, test scripts, build files, requirements specs, third-party libraries with specific versions, configuration files.

---

**Q:** (MCQ — select all that apply) Which of the following could be SCIs?

  A. A specific version of a video editor module.
  B. A loose comment in a chat thread.
  C. A test script.
  D. A design document.
  E. A coffee order.

**A:** **A, C, D.** SCIs must be formally trackable units.

---

## Section F — Baselines

**Q:** Define a **baseline** (formal definition).

**A:** A software baseline is a **formally approved version of a configuration item** that is **formally designated and fixed at a specific time** during the configuration item's life cycle.

---

**Q:** What is the **Key Idea** behind a baseline?

**A:** The baseline, **together with all approved changes to it**, represents the **current approved configuration**.

---

**Q:** Memorize **The Rule** for baselines.

**A:** You can **only** change a baseline through **formal change-control procedures**. **No more informal, "on-the-fly" substitutions.** This is what provides **control and predictability.**

---

**Q:** What is the metaphor for a baseline?

**A:** A **snapshot in time** — like taking all the correct pieces, putting them in a box, sealing it, and labeling it "Nexus Professional v2.1." Once established, it cannot be changed without a formal process.

---

**Q:** What problem do baselines solve?

**A:** Without baselines, SCIs are a **jumble of versions** that don't fit together. Baselines group a specific set of SCI versions and give them a **single name** so we always know what versions work together.

---

**Q:** Finish the sentence: Once a baseline is established, it is **formally fixed**. It cannot be changed without going through a **_______ process**.

**A:** **formal (change-control)** process.

---

**Q:** (MCQ) Which is true of a baseline?

  A. It can be modified informally to keep up with development speed.
  B. It is a formally approved snapshot of a configuration item.
  C. It is automatically the latest commit in source control.
  D. It applies only to documentation, never code.

**A:** **B.**

---

## Section G — Catch-All SCM MCQs

**Q:** (MCQ) Which is **not** one of the four core SCM functions?

  A. Identify
  B. Control
  C. Audit
  D. Report
  E. Refactor

**A:** **E. Refactor.** (Refactoring is a maintenance technique, not an SCM function.)

---

**Q:** (MCQ — select all that apply) Which of the following are concerns of SCM?

  A. Knowing what comprises your software
  B. Controlling how, when, and why software changes
  C. Determining what color the UI button should be
  D. Keeping a complete history of every change

**A:** **A, B, D.**

---

**Q:** (Scenario) A team's release goes out, and a regression appears. The team wants to recreate the exact build that was running last week to debug. Which SCM-supported SQA pillar makes this possible?

**A:** **Reproducibility.**

---

**Q:** (Scenario) An auditor asks "Why does this line of code exist?" Which SQA pillar (supported by SCM) lets you answer?

**A:** **Traceability** — every line of code can be traced back to a specific approved change request or requirement.
