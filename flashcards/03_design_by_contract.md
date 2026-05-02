# Flashcards — Design by Contract (DbC)

Covers: Final Review slides 38, 41 (with 39, 40 supporting). Source: Lesson 17.

---

## Section A — The Core Idea

**Q:** What is **Design by Contract (DbC)**?

**A:** A methodology that **formally defines the rights and obligations of software components**. It creates a **clear, enforceable agreement** between caller (Client) and called code (Server) that prevents unspecified-assumption errors.

---

**Q:** What problem does Design by Contract solve?

**A:** It **replaces unspoken assumptions** between modules with an **explicit, formal contract** so callers know exactly what they must provide and callees know exactly what they must guarantee.

---

**Q:** Name the **two parties** in a contract and what each owes.

**A:**
- **Client (caller)** — owes the **pre-conditions**: must guarantee certain inputs/state are valid before calling.
- **Server (callee)** — owes the **post-conditions**: must guarantee a valid result after the call.

---

## Section B — The Three Clauses

**Q:** Name the **three clauses** in a Design-by-Contract specification.

**A:**
1. **Pre-conditions** — what the Client must guarantee *before* the call.
2. **Post-conditions** — what the Server promises *after* a successful call.
3. **Invariants** — universal rules that must hold *throughout* the object's lifetime.

---

**Q:** What is a **pre-condition**? Whose responsibility is it?

**A:** A pre-condition is a condition the **Client** must guarantee to be **true *before* calling a method**. It is the **client's responsibility** to meet these requirements.

---

**Q:** Example: For `addItem(Item item, int quantity)`, what could the pre-condition be?

**A:** The `quantity` provided must be a positive number — `require(quantity > 0);`

---

**Q:** Finish the sentence: If a pre-condition is violated, the fault lies squarely with the _______.

**A:** **Client.** The Server is **not obligated to proceed**.

---

**Q:** What is a **post-condition**? Whose responsibility is it?

**A:** A condition the **Server** guarantees will be **true *after* the method has finished executing successfully**. It is the Server's promise to the Client.

---

**Q:** Example post-conditions for `addItem`?

**A:**
- `ensure(itemCount == old.itemCount + quantity);`
- `ensure(totalPrice > old.totalPrice);`

---

**Q:** Finish the sentence: If pre-conditions are met but post-conditions fail, the bug is inside the _______.

**A:** **Server method.** The Client did its part; the Server failed to deliver on its promise.

---

**Q:** What is an **invariant**?

**A:** An invariant is a condition that **must hold true for an object throughout its entire lifetime**. It must be true **before and after every public method is called.** The Server is responsible for maintaining its own invariants.

---

**Q:** Example invariant for an `OnlineShoppingCart`?

**A:**
- `invariant(totalPrice >= 0);`
- `invariant(itemCount >= 0);`

The total price and item count can never go negative.

---

**Q:** Finish the sentence: Invariants define what it means for an object to be in a _______ state at all times.

**A:** **'sane' or 'valid'** state.

---

## Section C — Reasoning About Faults

**Q:** A method's pre-conditions were violated. Who is at fault?

**A:** The **Client** (caller). The Server is not obligated to do anything correct.

---

**Q:** A method's pre-conditions were satisfied but its post-conditions failed. Who is at fault?

**A:** The **Server** (the called method) — the bug is inside the Server's implementation.

---

**Q:** An object is observed in a state that violates its invariant. Who/what is at fault?

**A:** The **Server** — it failed to maintain its own invariants. Some method exposed an internal inconsistency.

---

## Section D — Application & MCQs

**Q:** (MCQ) Which DbC clause is the *Client's* responsibility?

  A. Pre-conditions
  B. Post-conditions
  C. Invariants
  D. Exceptions

**A:** **A. Pre-conditions.**

---

**Q:** (MCQ) Which DbC clauses are the *Server's* responsibility? (select all that apply)

  A. Pre-conditions
  B. Post-conditions
  C. Invariants
  D. Method signatures

**A:** **B and C.**

---

**Q:** (MCQ) An invariant must hold:

  A. Only before a method is called
  B. Only after a method finishes
  C. Both before and after every public method call (i.e., always)
  D. Only at object creation

**A:** **C.**

---

**Q:** (Scenario) A bank-account `withdraw(amount)` method has `require(amount <= balance)`. A caller invokes `account.withdraw(1000)` when the balance is 500 and the program crashes. Who is at fault?

**A:** The **Client** — they violated the pre-condition. The Server is not obligated to handle that case correctly.

---

**Q:** (Scenario) Same `withdraw` method, but the caller passes a valid `amount`. After the call, the balance is unchanged. Who is at fault?

**A:** The **Server** — pre-conditions were met, but the post-condition (balance reduced by `amount`) failed. The bug is inside `withdraw`.

---

**Q:** Why is DbC valuable for testing?

**A:** Because pre/post-conditions and invariants are **executable assertions** — they catch contract violations the moment they occur, making bugs easier to localize and giving us a precise definition of "correct."
