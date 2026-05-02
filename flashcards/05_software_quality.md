# Flashcards — Software Quality

Covers: Final Review slides 85, 86, 89, 90, 91, 92, 94. Source: Lesson 22.

---

## Section A — Quality Is Not an Accident

**Q:** What does the principle "Quality is Not an Accident" mean?

**A:** Software quality is **not a vague goal** — it is **a set of measurable attributes defined by your stakeholders**. Quality must be deliberately designed in, agreed on, and measured against.

---

**Q:** What is the **Core Concept** of software quality?

**A:** **Software requirements define the required quality attributes of the software.** Quality means **conformance to requirements**, not subjective "goodness."

---

**Q:** What does it mean to "succeed with quality" for a stakeholder-driven product?

**A:** You must reach a **formal agreement** on what constitutes quality for **all** stakeholders (artists, fans, venue owners), and **clearly communicate** that agreement to the engineering team. Success is **measured against those defined quality levels.**

---

**Q:** Finish the sentence: Quality is achieved by **conformance to all _______** regardless of what characteristics are specified or how they are grouped.

**A:** **requirements.**

---

## Section B — Definition of Software Quality

**Q:** Define **software quality** (formal course definition).

**A:** Software quality is the **capability of a software product to satisfy stated and implied needs under specified conditions.**

---

**Q:** Name the **four sub-areas** that make up software quality (the "What Goes Into Software Quality" ribbon).

**A:**
1. **Fundamentals** (definitions, foundational principles)
2. **Management Process** (SQM)
3. **Practical Considerations**
4. **Tools**

---

**Q:** What does "fitness for use" mean in the context of software quality?

**A:** It is shorthand for **delivering maximum stakeholder value while balancing constraints of development cost and schedule**. The product is "fit" if it serves stakeholder needs within the agreed constraints.

---

## Section C — The Iron Triangle

**Q:** What is the **Iron Triangle** of project management?

**A:** The unavoidable trade-off between **Cost, Quality, and Schedule.** You can't optimize all three at once; raising one usually means giving on another.

---

**Q:** State the Iron Triangle's "unavoidable trade-off" rule.

**A:** **Fast & Cheap = Low Quality.** **Fast & High-Quality = Expensive.** **Cheap & High-Quality = Slow.** You can have any two — but not all three at full strength.

---

**Q:** Finish the sentence: For all engineered products, the primary goal is delivering maximum stakeholder value while balancing the constraints of _______ and _______.

**A:** **development cost** and **schedule** ("fitness for use").

---

**Q:** (MCQ — select all that apply) Which of the following can a project optimize **simultaneously** without trade-off?

  A. Cost and Quality
  B. Quality and Schedule
  C. All three at the same time
  D. Cost and Schedule

**A:** None of the combinations come for free; you can pick **two** at a time, but never all three. So the answer is **none of A–D guarantees no trade-off.** The Iron Triangle says you sacrifice one to maximize the other two.

---

**Q:** If a CEO insists on launching **before a major schedule constraint** without raising cost, what is the inevitable casualty?

**A:** **Quality** — fast + cheap = low quality.

---

## Section D — Cost of Software Quality (CoSQ)

**Q:** What is the **Cost of Software Quality (CoSQ)**?

**A:** A framework that **infers product quality from the *economic cost* of preventing, finding, and fixing failures.** It tells us where money is being spent on quality (or the lack of it).

---

**Q:** What is the **Premise** of CoSQ?

**A:** The level of quality in a product can be **inferred from the economic cost of activities related to preventing, finding, and fixing failures.**

---

**Q:** Name the **four CoSQ categories** (Four Levers of Quality Investment).

**A:**
1. **Prevention Costs** — investments to prevent defects *before* they happen.
2. **Appraisal Costs** — costs to find defects *during* development.
3. **Internal Failure Costs** — costs of defects found *before* delivery to the customer.
4. **External Failure Costs** — costs of problems discovered *after* delivery.

---

**Q:** Match the CoSQ category to its example.
1. Prevention      a. Process improvement, quality tools, training, audits
2. Appraisal       b. Help desk support, warranty repairs, legal fees, brand damage
3. Internal Failure  c. Design reviews, peer reviews, all forms of testing
4. External Failure  d. Rework, re-testing, debugging time

**A:** 1→a, 2→c, 3→d, 4→b.

---

**Q:** Which two CoSQ categories are *Investment in Quality* (smart upfront cost), and which two are *Cost of Poor Quality* (massive ongoing cost)?

**A:**
- **Investment in Quality:** **Prevention** and **Appraisal**.
- **Cost of Poor Quality:** **Internal Failure** and **External Failure**.

---

**Q:** (MCQ) Which is an example of a **prevention** cost?

  A. Help desk fielding bug calls after release
  B. A team training course on secure coding
  C. Rework after a failed system test
  D. Peer review of a pull request

**A:** **B.** (D is appraisal; A is external failure; C is internal failure.)

---

**Q:** (MCQ) Which is an example of an **external failure** cost?

  A. A QA team's salary
  B. Refactoring after a code review finds duplication
  C. Warranty repairs after release
  D. A pre-release security audit

**A:** **C.**

---

**Q:** (MCQ — select all that apply) Which CoSQ categories occur **before** delivery to the customer?

  A. Prevention
  B. Appraisal
  C. Internal Failure
  D. External Failure

**A:** **A, B, and C.** Only **External Failure** occurs after delivery.

---

## Section E — Software Quality Management (SQM)

**Q:** Define **Software Quality Management (SQM)**.

**A:** SQM is the **collection of all processes that ensure** software products, services, and life-cycle process implementations meet **organizational software quality objectives** and achieve stakeholder satisfaction.

---

**Q:** What does SQM define / control?

**A:** SQM defines **processes, process owners, requirements for the processes, measurements of the processes and their outputs, and feedback channels** throughout the whole software life cycle.

---

**Q:** Name the **four sub-categories** of SQM.

**A:**
1. **Software Quality Planning (SQP)**
2. **Software Quality Assurance (SQA)**
3. **Software Quality Control (SQC)**
4. **Software Process Improvement (SPI)**

---

**Q:** What does **Software Quality Planning (SQP)** include?

**A:** Determining **which quality standards** should be applied, defining **specific quality goals**, and **estimating the effort and schedule** of software quality activities.

---

**Q:** Quick definitions: SQA vs SQC vs SPI.

**A:**
- **SQA (Quality Assurance):** ensures the *processes* are being followed correctly — process-oriented.
- **SQC (Quality Control):** verifies that the *product* meets requirements — product-oriented (testing, inspections).
- **SPI (Process Improvement):** continuously improves the processes themselves over time.

---

**Q:** (MCQ — select all that apply) Which are sub-categories of SQM?

  A. SQA
  B. SCM
  C. SQC
  D. SPI
  E. SQP

**A:** **A, C, D, E.** (SCM is Software *Configuration* Management, a separate discipline.)

---

## Section F — Verification vs. Validation (V&V)

**Q:** Define **Verification**.

**A:** **"Are we building the product right?"** An attempt to ensure that the **output products of an activity meet the specifications imposed on them in previous activities.** Does our code meet the design spec?

---

**Q:** Define **Validation**.

**A:** **"Are we building the right product?"** An attempt to ensure that **the right product is built** — that is, the product fulfills its specific intended purpose. Does the feature actually solve the user's problem?

---

**Q:** Memorize the catch-phrases: Verification = ___? Validation = ___?

**A:**
- **Verification:** "Are we building the product **right**?"
- **Validation:** "Are we building the **right** product?"

---

**Q:** Give a verification question and a validation question for an "Apply Filter" feature.

**A:**
- **Verification:** "Does our code meet the design spec for the filter algorithm?"
- **Validation:** "Does this filter actually solve the artist/photographer's problem in the way they need?"

---

**Q:** (MCQ) "Does the system meet the requirements documented in the spec?" is which kind of question?

  A. Verification
  B. Validation
  C. Both
  D. Neither

**A:** **A. Verification.**

---

**Q:** (MCQ) "Does this product solve the customer's actual problem?" is which kind of question?

  A. Verification
  B. Validation
  C. Both
  D. Neither

**A:** **B. Validation.**

---

## Section G — Catch-All Quality MCQs

**Q:** (MCQ — select all that apply) Which statements about software quality are correct?

  A. Quality is conformance to requirements.
  B. Quality is achieved by accident with talented engineers.
  C. Quality is the capability to satisfy stated and implied needs under specified conditions.
  D. Quality is purely subjective and cannot be measured.

**A:** **A and C.** B and D are wrong (the course explicitly rejects both — quality is deliberate and measurable).

---

**Q:** (MCQ) Which CoSQ category captures the costs of **finding** defects during development?

  A. Prevention
  B. Appraisal
  C. Internal Failure
  D. External Failure

**A:** **B. Appraisal.**

---

**Q:** (MCQ) Which is the **most expensive** category of CoSQ?

  A. Prevention
  B. Appraisal
  C. Internal Failure
  D. External Failure

**A:** **D. External Failure** — defects found by the customer cost the most (warranty, support, brand damage). The lesson: invest more in Prevention to drive External Failure down.
