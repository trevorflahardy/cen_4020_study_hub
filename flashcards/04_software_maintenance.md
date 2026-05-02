# Flashcards — Software Maintenance

Covers: Final Review slides 62, 65, 69, 75, 79, 80, 81, 83. Source: Lesson 19.

---

## Section A — What Maintenance Is

**Q:** Define **software maintenance**.

**A:** Software maintenance is **the totality of activities required to provide cost-effective support to software** — modifying it after delivery to correct faults, improve performance, or adapt to a changed environment.

---

**Q:** Finish the sentence: Software maintenance isn't an afterthought — it's the **ongoing _______** of a live product.

**A:** **stewardship.**

---

**Q:** What is the "Big Idea" about software maintenance?

**A:** Your job as a software engineer **doesn't end at launch — that's when it truly begins.** You aren't just fixing the past; you are actively building the future of the software.

---

**Q:** What four-stage breakdown is used to organize maintenance content?

**A:**
1. Fundamentals
2. Key Issues
3. Maintenance Process
4. Techniques For Maintenance
5. Maintenance Tools
(Five categories on the maintenance overview ribbon.)

---

**Q:** What percentage of software maintenance effort is spent on **non-corrective** actions?

**A:** **Over 80%** — meaning maintenance is mostly **evolution, not repair.** Most time is spent on enhancements and adaptations rather than bug fixes.

---

## Section B — The Four Flavors of Maintenance Work

**Q:** Name the **four flavors of maintenance work**.

**A:**
1. **Corrective** — fixing faults / classic "bug hunt."
2. **Adaptive** — adapting the software to a changed environment (new OS, new browser, new third-party API).
3. **Perfective** — implementing enhancements and new features based on user feedback.
4. **Preventive** — improving the design to make the system more reliable and maintainable in the future ("paying down technical debt").

---

**Q:** Match the maintenance flavor to its description.
1. Corrective    a. Adapt to a new browser version or OS
2. Adaptive      b. Add a new feature requested by a user
3. Perfective    c. Pay down technical debt to prevent future failure
4. Preventive    d. Diagnose and resolve a bug reported by QA

**A:** 1→d, 2→a, 3→b, 4→c.

---

**Q:** (MCQ) Refactoring a tangled module so it will be easier to extend in the future is which kind of maintenance?

  A. Corrective
  B. Adaptive
  C. Perfective
  D. Preventive

**A:** **D. Preventive.**

---

**Q:** (MCQ) Updating your code so it works with a new third-party API is which kind of maintenance?

  A. Corrective
  B. Adaptive
  C. Perfective
  D. Preventive

**A:** **B. Adaptive.**

---

**Q:** (MCQ — select all that apply) Which kinds of maintenance do **not** involve fixing a bug?

  A. Corrective
  B. Adaptive
  C. Perfective
  D. Preventive

**A:** **B, C, D** — only **Corrective** is the "bug fix" flavor.

---

## Section C — Why It's Hard to Change ("Maintainability")

**Q:** What is **maintainability**?

**A:** Maintainability is **the capability of software to be modified.** Ideally this is built in from the start; in reality, it's often an afterthought.

---

**Q:** Contrast a **well-maintained codebase** with a **poorly maintained codebase**.

**A:**
- **Well-maintained:** orderly, clearly organized, like a well-stocked toolkit. Engineers spend less time wrestling with the code.
- **Poorly maintained:** tangled, confusing, no consistent organization. Engineers spend more time **understanding what is happening and analyzing for change** than actually writing changes.

---

**Q:** What single sentence captures *why* maintenance is hard? ("It's not a bug — it's _____.")

**A:** **Evolution.** Software faces constant pressure from new operating systems, updated 3rd-party APIs, security vulnerabilities, changing user demands, and new feature requests. Successful software is **never 'done.'**

---

**Q:** Name the five forces that drive software evolution (per the "It's Not a Bug, It's Evolution" slide).

**A:**
1. New Operating Systems
2. Changing User Demands
3. Updated 3rd-Party APIs
4. New Feature Requests
5. Security Vulnerabilities

---

## Section D — The Maintainer's Role / Activities

**Q:** Name the **six core activities** that make up the maintainer's role.

**A:**
1. **Tracking Requests** — logging and tracking every modification request.
2. **Impact Analysis** — determining the effect of proposed changes on the entire system.
3. **Modification** — changing the code (and other artifacts like docs!).
4. **Testing** — rigorously testing changes before release.
5. **Release Management** — releasing the new version of the product to users.
6. **User Support** — providing training and daily support through the help desk.

---

**Q:** Finish the sentence: A maintainer's job is to **sustain the software product throughout its entire _______**.

**A:** **life cycle.**

---

**Q:** (MCQ — select all that apply) Which are responsibilities of a software maintainer?

  A. Logging and tracking each change request
  B. Determining how a change affects other parts of the system
  C. User support and training
  D. Cutting the marketing budget

**A:** **A, B, C.**

---

## Section E — Lifecycle of a Living Product

**Q:** Name the three core activities in the **maintenance lifecycle loop**.

**A:**
1. **Problem and Modification Analysis**
2. **Modification Implementation**
3. **Maintenance Review / Acceptance**

(Plus surrounding the loop: Process Implementation feeds in; Retirement and Migration are exit paths.)

---

**Q:** What two outcomes can end the maintenance loop (exits)?

**A:** **Retirement** (decommissioning the software) or **Migration** (moving the software to a new platform/system).

---

## Section F — Estimation

**Q:** Name the **two approaches to maintenance estimation**.

**A:**
1. **Parametric Models** — use mathematical models to predict cost.
2. **Expert Judgment** — rely on the experience of senior engineers and managers.

---

**Q:** What does a **parametric model** require?

**A:** Historical data from past maintenance projects, plus **cost driver attributes** (e.g., complexity, team size) that the model uses to derive an estimate.

---

**Q:** What does **expert judgment** rely on?

**A:** The **experience of senior engineers and managers**. Experts estimate the effort (people, time), which is then used to derive cost.

---

**Q:** What does the course recommend as the best approach?

**A:** Combine the two — **historical data with experience.** Neither alone is as reliable as both together.

---

**Q:** (MCQ) Which is true of parametric estimation?

  A. It needs no past data.
  B. It uses mathematical models calibrated by historical data and cost drivers.
  C. It is always more accurate than expert judgment.
  D. It is the only approach allowed in industry.

**A:** **B.**

---

## Section G — Strategic Planning at Every Level

**Q:** Name the **four planning levels** for maintenance ("Planning at Every Level" pyramid).

**A:** From bottom (long-term) to top (short-term):
1. **Business Level** — aligning team's budget, resources, and priorities with the organization's goals.
2. **Transition Level** — planning the handover of new code from development to the maintenance team.
3. **Release/Version Level** — bundling multiple requests into a release: agreeing on content, assessing risk, creating back-out plans.
4. **Request Level** — planning the execution of a *single* change request (where impact analysis happens).

---

**Q:** What is the *Request Level* of maintenance planning?

**A:** Planning the execution of a **single change request**. This is the level where **impact analysis** happens.

---

**Q:** What is the *Release/Version Level*?

**A:** **Bundling multiple requests** into a release: agreeing on content, assessing risk, creating back-out plans.

---

**Q:** What is the *Transition Level*?

**A:** Planning the **handover of new code** from the development team to the maintenance team.

---

**Q:** What is the *Business Level*?

**A:** Aligning the team's **budget, resources, and priorities** with the broader organization's goals.

---

**Q:** Why is maintenance planning described as *proactive*, not reactive?

**A:** Because the maintenance phase can last for many years, **far longer** than the original development. Without planning across multiple horizons, the team will always be firefighting.

---

## Section H — Reengineering & Refactoring

**Q:** What is **reengineering**?

**A:** The examination and alteration of software to **reconstitute it in a new form**. It is more drastic than refactoring — typically needed when the codebase is so tangled that small refactorings are no longer enough.

---

**Q:** What is **refactoring**?

**A:** A key reengineering technique that **improves a program's internal structure without changing its external behavior**. It's how you pay down technical debt and keep complexity manageable.

---

**Q:** Finish the sentence: Refactoring isn't a massive, one-time project — it's a small, _______ that you should be doing during minor changes.

**A:** **continuous improvement loop.**

---

**Q:** When refactoring is *not* enough, what do you do?

**A:** **Reengineering** — a more drastic restructuring (sometimes a near-rewrite) to put the system back into a maintainable form.

---

**Q:** (MCQ) Which is true of refactoring?

  A. It changes external behavior to add new features.
  B. It changes internal structure without changing external behavior.
  C. It is the same as rewriting from scratch.
  D. It should only be done once per year.

**A:** **B.**

---

## Section I — Reverse Engineering / Software Archaeology

**Q:** What is **reverse engineering** in software?

**A:** A **passive process** that does **not** change the software. It analyzes the software to:
- **Re-document** functionality.
- **Design recovery** — recreate design decisions from a system that has lost them.
- **Data Reverse Engineering** — recover the data model from physical databases.

---

**Q:** Name the **three common reverse-engineering goals**.

**A:**
1. **Re-documentation** — produce alternative views (e.g., diagrams) from source code.
2. **Design recovery** — extract design decisions / abstractions.
3. **Data Reverse Engineering** — recover a data model from physical database schemas.

---

**Q:** What is **Software Archaeology**?

**A:** A discipline focused on recovering **what the original designers were thinking** and how a legacy system actually works, often by reverse-engineering and inspecting code, schemas, and historical documents.

---

**Q:** Finish the sentence: Reverse engineering is a **passive** process — it does **not** ___ the software.

**A:** **change.**

---

## Section J — The Maintainer's Toolkits

**Q:** Name the tools in **Maintainer's Toolkit Part 1: Comprehension & Analysis**.

**A:** Used to **analyze and understand** an existing codebase:
1. **Program Slicers** — isolate and view only the parts of a program relevant to a specific question.
2. **Static Analyzers** — inspect program content/structure *without* executing it. Find complexity, bugs, vulnerabilities.
3. **Data Flow Analyzers** — track how data moves through a program from input to output.
4. **Cross-References** — show where elements (variables, functions) are used.
5. **Dynamic Analyzers** — trace the execution of a program to understand runtime behavior.
6. **Dependency Analyzers** — understand the relationships and dependencies between modules.

---

**Q:** Name the tools in **Maintainer's Toolkit Part 2: Reverse Engineering**.

**A:** Tools that "work backward from the existing product" to create high-level artifacts when planning major reengineering or migration:
1. **Software Test Frameworks**
2. **Software Configuration Management** tools (e.g., Confluent / SCM platforms)
3. **Documentation Systems**
4. **Software Measurement and Monitoring tools**

---

**Q:** What's the difference between **comprehension/analysis** tools and **reverse engineering** tools?

**A:**
- **Comprehension & Analysis (Part 1):** small-scale, day-to-day understanding of an *existing* codebase.
- **Reverse Engineering (Part 2):** producing high-level artifacts (designs, docs, test frameworks, measurements) typically for **major reengineering or migration**.

---

**Q:** (MCQ — select all that apply) Which of these are reverse-engineering / archaeology activities?

  A. Recovering the design of a legacy system from its source.
  B. Producing diagrams from the existing code.
  C. Adding a brand-new feature requested by a user.
  D. Recreating the data model from a physical database.

**A:** **A, B, D.** C is perfective maintenance, not reverse engineering.
