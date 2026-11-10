# W3Schools Python Tutorial - E2E Front-End Test Plan

## Application Overview

- **Target:** https://www.w3schools.com/python/, the W3Schools Python Tutorial landing page. It is public and needs no login.
- **Playwright project:** `w3cschool`
- **Seed file:** `tests/w3cschool/seed.spec.ts`. It navigates to the page and checks the title.
- **Starting state:** every scenario starts in a fresh browser context, with no cookies and empty storage.

### What the live page looked like (2026-11-10)

**Title and main heading**
- The page title is "Python Tutorial".
- The h1 inside `#main` contains "Python Tutorial". It also holds a bookmark button, so check it with `toContainText`, not an exact match.
- The top-nav menus contain h1 elements too ("PYTHON TUTORIAL", "PYTHON REFERENCE", "Python Exercises", "Get Certified"). Always limit heading checks to `#main`.

**Section headings (h2) in `#main`**
- Learn Python
- Learning by Examples
- Python File Handling
- Python Database Handling
- Python Exercises
- Exercise
- Python Examples
- Python Quiz
- Track Your Progress
- Python Reference
- Download Python
- Get Certified in Python

**Top navigation**
- Logo: `#w3-logo` (aria-label "Home link"), links to `https://www.w3schools.com`.
- Menu buttons: `#navbtn_tutorials`, `#navbtn_references`, `#navbtn_exercises`, `#navbtn_certified`, and `#navbtn_services` ("All our services").
- Search field: `#tnb-google-search-input` (placeholder "Search...", aria-label "Search field").
- Search button: "Button to search".
- Search suggestions list: `#tnb-search-suggestions`.
- Sign In: `#tnb-login-btn`.
- PLUS link: goes to `order.w3schools.com/plans`.
- Dark-mode toggles: `#darkToggle` (desktop) and `#darkToggle_on_small` (mobile).

**Left sidebar (`#leftmenuinnerinner`)**
- It has about 320 links.
- The first link is "Python HOME" (`default.asp`, class `active`), followed by Python Intro and Python Get Started.
- Some entries are groups that expand when clicked (class `overview_header`). Their child links have class `-height-0` until the group opens. Example: Python Syntax opens to Syntax, Statements and Code Challenge.
- Section headings: PYTHON TUTORIAL, PYTHON CLASSES, FILE HANDLING, PYTHON MODULES, PYTHON MATPLOTLIB, MACHINE LEARNING, PYTHON DSA, PYTHON MYSQL, PYTHON MONGODB, PYTHON CERT, PYTHON REFERENCE, MODULE REFERENCE, PYTHON HOW TO, PYTHON EXAMPLES.

**Lesson navigation buttons**
- "❮ Home" (`/default.asp`) and "Next ❯" (`python_intro.asp`) each appear twice, at the top and bottom of `#main`.
- There is also a "TRY ADVENTURE MODE" link.

**Code example**
- `print("Hello, World!")`
- Its "Try it Yourself »" link goes to `trypython.asp?filename=demo_default` and opens in a new tab (`target=_blank`).

**Inline exercise (`#exercisecontainer`)**
- Question: "What is a correct way to declare a Python variable?"
- Radio options: `var x = 5`, `#x = 5`, `$x = 5`, `x = 5`. The correct one is `x = 5`.
- "Submit Answer »" posts to `exercise.asp` in a new tab.

**Footer (`#spacemyfooter`)**
- CONTACT US (`javascript:void(0)`)
- FORUM
- ABOUT
- terms of use
- cookies (driven by JavaScript, no href)
- privacy policy
- Copyright 1999-2026

**Not checked in the browser:** exploration stopped early. These selectors were not checked and should be confirmed before writing the tests that use them:
- what the menu panels contain
- the search results page
- the inside of the Try it editor
- the mobile menu toggle selectors

---

## Suite 1: Page Load and Content

Seed: `tests/w3cschool/seed.spec.ts`

### 1.1 Landing page loads with correct title and main heading
**File:** `tests/w3cschool/page-load/title-and-heading.spec.ts`

**Steps:**
1. In a fresh context, go to https://www.w3schools.com/python/ (waitUntil `domcontentloaded`). Dismiss the consent banner if one appears.
   - Expect: the response status is 200.
   - Expect: the page title is exactly "Python Tutorial".
2. Find the h1 inside `#main`.
   - Expect: there is exactly one h1 in `#main`, and it contains "Python Tutorial".

### 1.2 Key content sections are present
**File:** `tests/w3cschool/page-load/content-sections.spec.ts`

**Steps:**
1. Go to `/python/`.
   - Expect: the h2 headings in `#main` include Learn Python, Learning by Examples, Python File Handling, Python Database Handling, Python Exercises, Python Examples, Python Quiz, Python Reference, Download Python and Get Certified in Python.
   - Expect: the code block `.w3-code` contains `print("Hello, World!")`.
   - Expect: the "Try it Yourself »" link is visible.

### 1.3 No console errors from w3schools.com on load
**File:** `tests/w3cschool/page-load/console-errors.spec.ts`

**Steps:**
1. Attach listeners for console `error` and `pageerror`. Go to `/python/` and wait for the `#main h1`.
   - Expect: no errors come from a w3schools.com source.
   - Expect: errors from third-party ads are filtered out and only logged.

### 1.4 Deep link to a lesson loads directly
**File:** `tests/w3cschool/page-load/deep-link.spec.ts`

**Steps:**
1. Go directly to `/python/python_variables.asp`.
   - Expect: the title contains "Python Variables".
   - Expect: the `#main` h1 contains "Python Variables".
   - Expect: the sidebar link with href `python_variables.asp` has class `active`.

### 1.5 Non-existent lesson URL shows not-found page
**File:** `tests/w3cschool/page-load/not-found.spec.ts`

**Steps:**
1. Go to `/python/python_doesnotexist_xyz.asp`.
   - Expect: the status is 404, or the site's own not-found page is shown.
   - Expect: none of the Python Tutorial lesson content appears.

---

## Suite 2: Top Navigation Bar

Seed: `tests/w3cschool/seed.spec.ts`

### 2.1 Logo navigates to home
**File:** `tests/w3cschool/topnav/logo.spec.ts`

**Steps:**
1. Click the logo (aria-label "Home link").
   - Expect: the URL is `https://www.w3schools.com/`.
   - Expect: the title contains "W3Schools".

### 2.2 Tutorials menu opens and closes
**File:** `tests/w3cschool/topnav/tutorials-menu.spec.ts`

**Steps:**
1. Click "Tutorials" (`#navbtn_tutorials`).
   - Expect: the Tutorials panel is visible and has a link to `/python/` ("Learn Python").
2. Click "Tutorials" again, or the panel's close control.
   - Expect: the panel is hidden.

### 2.3 References, Exercises, Certificates and Services menus
**File:** `tests/w3cschool/topnav/other-menus.spec.ts`

**Steps:**
1. Click "References".
   - Expect: the References panel is visible and has a Python reference link.
2. Click "Exercises".
   - Expect: the References panel closes and the Exercises panel is visible.
3. Click "Certificates".
   - Expect: the Certificates panel is visible.
4. Click "All our services".
   - Expect: the Services panel is visible.

### 2.4 Link inside a menu navigates
**File:** `tests/w3cschool/topnav/menu-link-nav.spec.ts`

**Steps:**
1. Open the Tutorials menu and click "Learn HTML".
   - Expect: the URL is under `/html/`.
   - Expect: the title contains "HTML Tutorial".

### 2.5 Sign In opens login
**File:** `tests/w3cschool/topnav/sign-in.spec.ts`

**Steps:**
1. Click "Sign In" (`#tnb-login-btn`).
   - Expect: the browser goes to the profile.w3schools.com log-in page, or a login modal appears.
   - Expect: no credentials are submitted.

### 2.6 Dark mode toggle
**File:** `tests/w3cschool/topnav/dark-mode.spec.ts`

**Steps:**
1. Click the dark-mode toggle (`#toggle-darkmode-wrapper` / `#darkToggle`).
   - Expect: `#darkToggle` is checked.
   - Expect: the body's computed background color turns dark.
2. Reload the page.
   - Expect: dark mode is still on.
3. Click the toggle again.
   - Expect: the light theme is back.

---

## Suite 3: Left Sidebar Menu

Seed: `tests/w3cschool/seed.spec.ts`

### 3.1 Sidebar items present and HOME active
**File:** `tests/w3cschool/sidebar/items.spec.ts`

**Steps:**
1. Go to `/python/` with the viewport at 1280x800.
   - Expect: `#leftmenuinnerinner` is visible.
   - Expect: the first links are Python HOME, Python Intro, Python Get Started and Python Syntax.
   - Expect: Python HOME has class `active`.
   - Expect: the headings include PYTHON TUTORIAL, FILE HANDLING, PYTHON MODULES, PYTHON MYSQL, PYTHON MONGODB, PYTHON REFERENCE and PYTHON EXAMPLES.
   - Expect: there are more than 100 links. Check a minimum, not an exact number.

### 3.2 Clicking an item navigates and highlights it
**File:** `tests/w3cschool/sidebar/navigate.spec.ts`

**Steps:**
1. Click "Python Intro".
   - Expect: the URL ends with `python_intro.asp`.
   - Expect: the `#main` h1 contains "Python Introduction".
   - Expect: Python Intro is active and Python HOME is not.
2. Click "Python Get Started".
   - Expect: the URL ends with `python_getstarted.asp`, and that item is active.

### 3.3 A sidebar group expands
**File:** `tests/w3cschool/sidebar/collapsible.spec.ts`

**Steps:**
1. Click the "Python Syntax" group header.
   - Expect: the URL ends with `python_syntax.asp`.
   - Expect: the child links Syntax, Statements and Code Challenge are visible.
2. Click "Statements".
   - Expect: the URL ends with `python_statements.asp`, and Statements is active.

### 3.4 Sidebar reference link
**File:** `tests/w3cschool/sidebar/reference-link.spec.ts`

**Steps:**
1. Scroll the sidebar to PYTHON REFERENCE and click the first link under it.
   - Expect: the URL matches the clicked link's href.
   - Expect: the `#main` h1 matches the link text.

---

## Suite 4: Lesson Navigation Buttons

Seed: `tests/w3cschool/seed.spec.ts`

### 4.1 Next goes to Python Intro
**File:** `tests/w3cschool/lesson-nav/next.spec.ts`

**Steps:**
1. Click the first "Next ❯" in `#main`.
   - Expect: the URL ends with `python_intro.asp`.
2. Click "Next ❯" again.
   - Expect: the URL ends with `python_getstarted.asp`.

### 4.2 Home goes to the site home page
**File:** `tests/w3cschool/lesson-nav/home.spec.ts`

**Steps:**
1. Click the first "❮ Home".
   - Expect: the URL is `/default.asp` or `/`.

### 4.3 Previous on an inner lesson
**File:** `tests/w3cschool/lesson-nav/previous.spec.ts`

**Steps:**
1. Open `/python/python_intro.asp` and click "❮ Previous".
   - Expect: the URL is `/python/` or `/python/default.asp`.
   - Expect: the h1 contains "Python Tutorial".

### 4.4 Top and bottom buttons match
**File:** `tests/w3cschool/lesson-nav/top-bottom.spec.ts`

**Steps:**
1. Count the "Next ❯" and "❮ Home" links in `#main`.
   - Expect: there are 2 of each.
   - Expect: both Next links have href `python_intro.asp`.
   - Expect: both Home links have href `/default.asp`.
2. Click the bottom "Next ❯".
   - Expect: the URL ends with `python_intro.asp`.

### 4.5 Browser back and forward
**File:** `tests/w3cschool/lesson-nav/back-forward.spec.ts`

**Steps:**
1. Click "Next ❯" twice.
   - Expect: the URL ends with `python_getstarted.asp`.
2. Go back (`page.goBack()`).
   - Expect: the URL ends with `python_intro.asp`, and Python Intro is active in the sidebar.
3. Go back again.
   - Expect: the URL is `/python/`.
4. Go forward (`page.goForward()`).
   - Expect: the URL ends with `python_intro.asp`.

---

## Suite 5: Try it Yourself Editor

Seed: `tests/w3cschool/seed.spec.ts`

### 5.1 Editor opens in a new tab and shows output
**File:** `tests/w3cschool/tryit/open-editor.spec.ts`

**Steps:**
1. Wait for the context's `page` event and click "Try it Yourself »".
   - Expect: the new tab's URL contains `trypython.asp?filename=demo_default`.
   - Expect: the original tab is still on `/python/`.
2. In the new tab, wait for the editor and the result panel.
   - Expect: the editor contains `print("Hello, World!")`.
   - Expect: the result panel shows "Hello, World!" within 30 seconds.

### 5.2 Edit and run code
**File:** `tests/w3cschool/tryit/run-code.spec.ts`

**Steps:**
1. Open `trypython.asp?filename=demo_default`. Replace the code with `print(2 + 3)` by pressing ControlOrMeta+A and typing. Click "Run ❯".
   - Expect: the result panel shows "5" within 30 seconds.

### 5.3 Invalid code shows an error
**File:** `tests/w3cschool/tryit/syntax-error.spec.ts`

**Steps:**
1. Replace the code with `print("unclosed` and click Run.
   - Expect: the result contains "Error" (for example SyntaxError).
   - Expect: the page does not crash.

---

## Suite 6: Exercises, Examples, Quiz and References

Seed: `tests/w3cschool/seed.spec.ts`

### 6.1 Inline exercise, correct answer
**File:** `tests/w3cschool/exercises/inline-correct.spec.ts`

**Steps:**
1. Scroll to `#exercisecontainer`.
   - Expect: the question, 4 radio options and "Submit Answer »" are visible. The question may change, so check that it contains "variable" rather than the full text.
2. Select `x = 5` and submit, catching the new tab.
   - Expect: a new tab opens on `exercise.asp` and says the answer is correct.

### 6.2 Inline exercise, wrong or empty answer
**File:** `tests/w3cschool/exercises/inline-wrong.spec.ts`

**Steps:**
1. Select `var x = 5` and submit.
   - Expect: the `exercise.asp` tab says the answer is incorrect.
2. On a fresh page, submit without selecting anything.
   - Expect: nothing crashes. Record what happens (a validation message or a no-answer message).

### 6.3 See all Python Exercises
**File:** `tests/w3cschool/exercises/all-exercises.spec.ts`

**Steps:**
1. Click "See all Python Exercises".
   - Expect: the URL ends with `python_exercises.asp`.
   - Expect: the `#main` h1 contains "Exercises".

### 6.4 Examples and Quiz links
**File:** `tests/w3cschool/exercises/examples-quiz.spec.ts`

**Steps:**
1. Click "See All Python Examples".
   - Expect: the URL ends with `python_examples.asp`.
2. Go back and click "Python Quiz" in `#main`.
   - Expect: the URL ends with `python_quiz.asp`.
   - Expect: a button or link to start the quiz is visible.

### 6.5 Reference links return 200
**File:** `tests/w3cschool/exercises/reference-links.spec.ts`

**Steps:**
1. Collect the 16 reference links in `#main`: `python_reference.asp`, `python_ref_functions.asp`, `python_ref_string.asp`, `python_ref_list.asp`, `python_ref_dictionary.asp`, `python_ref_tuple.asp`, `python_ref_set.asp`, `python_ref_file.asp`, `python_ref_keywords.asp`, `python_ref_exceptions.asp`, `python_ref_glossary.asp`, `module_random.asp`, `module_requests.asp`, `module_statistics.asp`, `module_math.asp`, `module_cmath.asp`. Request each one with `request.get`.
   - Expect: each returns HTTP 200.
2. Click "String Methods".
   - Expect: the URL ends with `python_ref_string.asp`.
   - Expect: the h1 contains "String Methods".

### 6.6 File handling and database links
**File:** `tests/w3cschool/exercises/topic-links.spec.ts`

**Steps:**
1. Click "Python File Handling".
   - Expect: the URL ends with `python_file_handling.asp`.
2. Go back and click "Python MySQL Tutorial".
   - Expect: the URL ends with `python_mysql_getstarted.asp`.
3. Go back and click "Python MongoDB Tutorial".
   - Expect: the URL ends with `python_mongodb_getstarted.asp`.

### 6.7 External link targets
**File:** `tests/w3cschool/exercises/external-links.spec.ts`

**Steps:**
1. Check the hrefs of the python.org link and "Get Certified Today". Do not click through to third-party sites.
   - Expect: the python.org href is `https://python.org/`.
   - Expect: the Get Certified href contains `campus.w3schools.com` and `python-course`.

---

## Suite 7: Site Search

Seed: `tests/w3cschool/seed.spec.ts`

### 7.1 Suggestions for a valid term
**File:** `tests/w3cschool/search/suggestions.spec.ts`

**Steps:**
1. Type "python list" slowly into `#tnb-google-search-input`.
   - Expect: `#tnb-search-suggestions` is visible.
   - Expect: there is at least one entry containing "list" (case-insensitive).
2. Click the first suggestion.
   - Expect: the browser goes to a related w3schools.com page, for example `python_lists.asp`.

### 7.2 Submit a search with Enter
**File:** `tests/w3cschool/search/submit.spec.ts`

**Steps:**
1. Type "python dictionary" and press Enter, or click "Button to search".
   - Expect: a results page or a related tutorial loads.
   - Expect: there is at least one result link to w3schools.com.

### 7.3 Gibberish term
**File:** `tests/w3cschool/search/no-results.spec.ts`

**Steps:**
1. Type "zxqvbnmkjhgf123".
   - Expect: the suggestions list is empty or hidden.
2. Press Enter.
   - Expect: the page shows no results, and no error page appears.

### 7.4 Empty and script-injection input
**File:** `tests/w3cschool/search/edge.spec.ts`

**Steps:**
1. Focus the search field and press Enter with it empty.
   - Expect: nothing happens, or a harmless page loads.
   - Expect: there are no JS errors from w3schools.com.
2. Register a `page.on('dialog')` listener that fails the test. Search for `<script>alert(1)</script>`.
   - Expect: no dialog appears.
   - Expect: the input is treated as plain text.

---

## Suite 8: Footer

Seed: `tests/w3cschool/seed.spec.ts`

### 8.1 Footer links navigate
**File:** `tests/w3cschool/footer/links.spec.ts`

**Steps:**
1. Scroll to `#spacemyfooter`.
   - Expect: FORUM, ABOUT, terms of use, privacy policy and "Copyright 1999-<current year>" are visible. Match the year with a regex.
   - Expect: CONTACT US and cookies are visible.
2. Click ABOUT.
   - Expect: the URL ends with `/about/default.asp`.
3. Go back and click "privacy policy".
   - Expect: the URL ends with `/about/about_privacy.asp`.
4. Go back and click "terms of use".
   - Expect: the URL ends with `/about/about_copyright.asp`.
5. Go back and click FORUM.
   - Expect: the URL ends with `/forum/index.php`.

### 8.2 Contact Us and Cookies controls
**File:** `tests/w3cschool/footer/contact-cookies.spec.ts`

**Steps:**
1. Click CONTACT US.
   - Expect: a contact form or modal opens, and the URL does not change.
2. Close it and click cookies.
   - Expect: a cookie settings dialog opens and can be closed.

---

## Suite 9: Responsive / Mobile

Seed: `tests/w3cschool/seed.spec.ts`

### 9.1 Mobile layout
**File:** `tests/w3cschool/mobile/layout.spec.ts`

**Steps:**
1. Set the viewport to 375x812 (or use `devices['iPhone 13']`) and go to `/python/`.
   - Expect: the `#main` h1 is visible and contains "Python Tutorial".
   - Expect: the left sidebar `#leftmenu` is hidden.
   - Expect: a menu (hamburger) button is visible.
   - Expect: the desktop nav buttons are hidden or folded into the mobile menu.

### 9.2 Mobile sidebar toggle
**File:** `tests/w3cschool/mobile/sidebar-toggle.spec.ts`

**Steps:**
1. Tap the button that opens the tutorial menu.
   - Expect: the sidebar is visible, with Python HOME active.
2. Tap "Python Intro".
   - Expect: the URL ends with `python_intro.asp`.
   - Expect: the sidebar closes.

### 9.3 Mobile menu and dark mode
**File:** `tests/w3cschool/mobile/nav-menu.spec.ts`

**Steps:**
1. Open the mobile top menu (`#tnb-mobile-nav`).
   - Expect: it lists Tutorials, References, Exercises, Certificates and Services.
2. Switch on `#darkToggle_on_small`.
   - Expect: the dark theme is applied.

### 9.4 No sideways overflow
**File:** `tests/w3cschool/mobile/overflow.spec.ts`

**Steps:**
1. At 375px, compare `document.documentElement.scrollWidth` with `clientWidth`.
   - Expect: scrollWidth is at most clientWidth + 1. Make this a soft assertion, because ad slots may break it.

---

## Suite 10: Robustness and Edge Cases

Seed: `tests/w3cschool/seed.spec.ts`

### 10.1 Page works with ads blocked
**File:** `tests/w3cschool/edge/ads-blocked.spec.ts`

**Steps:**
1. Block the ad domains with `page.route` (googlesyndication, doubleclick, criteo, pubmatic, openx, gumgum, connectad, 33across, bliink, e-planning, yellowblue). Go to `/python/`.
   - Expect: the `#main` h1, the sidebar, "Next ❯" and "Try it Yourself »" are visible.
   - Expect: clicking "Next ❯" still goes to `python_intro.asp`.

### 10.2 Consent banner in an EU locale
**File:** `tests/w3cschool/edge/consent.spec.ts`

**Steps:**
1. Set the locale to `de-DE` and the timezone to `Europe/Berlin`, then go to `/python/`.
   - Expect: if a consent dialog appears (for example `.fc-consent-root`, or a dialog with a Consent or Accept button), accepting it hides the dialog.
   - Expect: the "Next ❯" button can then be clicked.

### 10.3 Reload and URL equivalence
**File:** `tests/w3cschool/edge/reload-anchor.spec.ts`

**Steps:**
1. Open `/python/python_intro.asp` and reload.
   - Expect: the URL, the h1 and the active sidebar item are unchanged.
2. Open `/python/default.asp`.
   - Expect: the content is the same as `/python/` (h1 "Python Tutorial").

### 10.4 Keyboard access
**File:** `tests/w3cschool/edge/keyboard.spec.ts`

**Steps:**
1. Press Tab repeatedly from the top of the page.
   - Expect: focus reaches the logo, the Tutorials button and the search field, in that order.
   - Expect: the focused element is visibly marked.
2. Focus "Tutorials" and press Enter.
   - Expect: the Tutorials panel opens.

---

## Risks and Flakiness Notes

- **Ads:** the page loads more than 15 third-party ad iframes (googlesyndication, criteo, pubmatic, openx, gumgum, connectad, 33across, bliink, e-planning, yellowblue, doubleclick, and others). On a normal load they caused about 11 console errors: 403s, X-Frame-Options refusals, ERR_NAME_NOT_RESOLVED, and blocked scripts in sandboxed frames. Console checks must only count errors from w3schools.com. Blocking ad domains with `page.route` would make tests faster and more stable.
- **Waiting for page load:** waiting for the network to go quiet (`waitUntil: 'networkidle'`) will hang because the ads keep loading. Wait for `domcontentloaded` and then for specific elements.
- **Consent popup:** none appeared from this location, which the site treated as outside the EU (`gdpr=0` in the ad URLs). EU runs may get a consent dialog (for example `.fc-consent-root`). Add a helper that waits about 3 seconds and accepts the dialog only if it shows up.
- **Elements blocked by overlays:** ad banners and the "W3Schools app" promo can sit on top of other elements. Use role- or href-based locators and `scrollIntoViewIfNeeded`, and never click by coordinates.
- **Content that changes:** promotional sections (Adventure Mode, app store badges, PLUS offer, the certificate year) and the exercise question may vary. Social-login links contain random `state` values. Do not assert exact wording for any of these.
- **Duplicate headings:** the top menus also contain h1 elements, so heading checks must be limited to `#main`.
- **Search:** results may come from Google, a third party. Check that navigation happens and results exist, not the order of results.
- **Try it editor:** it runs code on W3Schools' servers, so allow 15–30 second timeouts. Rate limits or bot challenges are possible if many tests run at once. None were seen during exploration, but use few parallel workers.
- **Unchecked selectors:** the contents of the top menus, the search results page, the inside of the Try it editor and the mobile toggle selectors were not checked in the browser. Confirm them before writing those tests.
