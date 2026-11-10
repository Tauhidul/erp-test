/**
 * Selectors shared by the W3Schools tests.
 *
 * VERIFIED: seen on the live page during planning (2026-11-10).
 * UNVERIFIED: written without checking the live site (the planner stopped before it could).
 * If a test fails on one of these, fix it here once and every test picks it up.
 */
export const SEL = {
  // VERIFIED
  main: '#main',
  mainH1: '#main h1',
  sidebar: '#leftmenuinnerinner',
  sidebarOuter: '#leftmenu',
  logoLabel: 'Home link',
  navTutorials: '#navbtn_tutorials',
  navReferences: '#navbtn_references',
  navExercises: '#navbtn_exercises',
  navCertified: '#navbtn_certified',
  navServices: '#navbtn_services',
  searchInput: '#tnb-google-search-input',
  searchSuggestions: '#tnb-search-suggestions',
  loginButton: '#tnb-login-btn',
  darkToggle: '#darkToggle',
  darkToggleSmall: '#darkToggle_on_small',
  exercise: '#exercisecontainer',
  footer: '#spacemyfooter',
  codeBlock: '#main .w3-code',

  // UNVERIFIED: dropdown panels opened by the top-nav buttons
  panelTutorials: '#nav_tutorials',
  panelReferences: '#nav_references',
  panelExercises: '#nav_exercises',
  panelCertified: '#nav_certified',
  panelServices: '#nav_services',

  // UNVERIFIED: mobile controls
  mobileSidebarToggle: '[onclick*="open_menu"]',
  mobileNav: '#tnb-mobile-nav',

  // UNVERIFIED: Try it editor (trypython.asp)
  tryitEditor: '.CodeMirror',
  tryitResultFrame: '#iframeResult',

  // UNVERIFIED: footer pop-ups
  anyVisibleDialog: '[role="dialog"]:visible, .w3-modal:visible, .fc-dialog-container:visible',
} as const;
