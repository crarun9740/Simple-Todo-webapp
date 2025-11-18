# Demo Script - Todo App Testing Guide

This document provides step-by-step instructions to test all acceptance criteria and features of the Todo App.

## Prerequisites

- Application running at `http://localhost:4200`
- Browser with developer tools open
- Approximately 10-15 minutes for complete walkthrough

---

## 1️⃣ Create / Manage Todos

### Test 1.1: Create a Todo with Title Only
**Steps:**
1. Click the **"+ New Todo"** button (in bulk actions section)
2. Enter title: "Learn Angular"
3. Leave description empty
4. Click **"Create"**

**Expected Result:**
- Todo appears in the list immediately
- Checkbox is unchecked
- No description is shown
- Created timestamp appears below the title

### Test 1.2: Create a Todo with Title and Description
**Steps:**
1. Click **"+ New Todo"**
2. Enter title: "Buy groceries"
3. Enter description: "Milk, eggs, bread, cheese"
4. Click **"Create"**

**Expected Result:**
- Todo appears with both title and description
- Description displays below the title
- Timestamp is visible

### Test 1.3: Validate Required Title Field
**Steps:**
1. Click **"+ New Todo"**
2. Leave title empty (or just spaces)
3. Click **"Create"**

**Expected Result:**
- Error message appears: "Title is required"
- No todo is created
- Form remains visible

### Test 1.4: Mark Todo as Complete
**Steps:**
1. Click the **checkbox** next to "Learn Angular"
2. Observe the visual change

**Expected Result:**
- Checkbox is now checked
- Title has strikethrough text
- Todo appears slightly faded
- The created date still shows

### Test 1.5: Toggle Todo Back to Incomplete
**Steps:**
1. Click the **checkbox** on "Learn Angular" again

**Expected Result:**
- Checkbox is unchecked
- Strikethrough removed
- Todo appears normal
- No description loss or other changes

### Test 1.6: Edit a Todo
**Steps:**
1. Click the **edit icon** (pencil) on the "Buy groceries" todo
2. Change title to: "Buy groceries and cook dinner"
3. Change description to: "Milk, eggs, bread, cheese - make pasta"
4. Click **"Update"**

**Expected Result:**
- Todo updates immediately
- Form disappears
- New title and description are displayed
- Todo remains in its position
- Updated timestamp is set

### Test 1.7: Cancel Editing
**Steps:**
1. Click the **edit icon** on any todo
2. Make changes to title
3. Click **"Cancel"**

**Expected Result:**
- Form closes without saving
- Todo retains original content
- No changes are applied

### Test 1.8: Delete a Todo with Confirmation
**Steps:**
1. Click the **delete icon** (trash) on "Learn Angular"
2. A confirmation dialog appears asking "Delete Todo?"
3. Click **"Delete"** in the confirmation dialog

**Expected Result:**
- Todo is removed from the list
- Confirmation dialog closes
- No other todos are affected

### Test 1.9: Cancel Delete
**Steps:**
1. Click the **delete icon** on a todo
2. Confirmation dialog appears
3. Click **"Cancel"**

**Expected Result:**
- Dialog closes
- Todo remains in the list
- No changes are made

---

## 2️⃣ Filtering & Searching

### Test 2.1: Filter - Show All Todos
**Setup:** Have at least 2 completed and 2 active todos

**Steps:**
1. Use the **"Filter"** dropdown
2. Select **"All"**

**Expected Result:**
- All todos are visible regardless of completion status
- Count matches total number of todos created

### Test 2.2: Filter - Show Only Active Todos
**Steps:**
1. Use the **"Filter"** dropdown
2. Select **"Active"**

**Expected Result:**
- Only uncompleted todos are shown
- Completed todos are hidden
- Count matches the number of active todos

### Test 2.3: Filter - Show Only Completed Todos
**Steps:**
1. Use the **"Filter"** dropdown
2. Select **"Completed"**

**Expected Result:**
- Only completed todos are shown
- Active todos are hidden
- Count matches the number of completed todos

### Test 2.4: Search by Title
**Setup:** Have todos: "Buy milk", "Buy eggs", "Learn Angular"

**Steps:**
1. Type "Buy" in the **search box**
2. Observe the list in real-time

**Expected Result:**
- Only "Buy milk" and "Buy eggs" appear
- "Learn Angular" is hidden
- Search is case-insensitive (try "buy" or "BUY")

### Test 2.5: Search by Description
**Setup:** Have a todo with title "Task" and description "Important meeting today"

**Steps:**
1. Type "meeting" in the search box

**Expected Result:**
- The todo with "meeting" in description appears
- Search works across descriptions, not just titles

### Test 2.6: Clear Search
**Steps:**
1. Type something in search box
2. Clear the search box (delete the text)

**Expected Result:**
- All todos (based on current filter) are shown again
- Search is real-time and responsive

### Test 2.7: Sort by Created Date
**Setup:** Have 3+ todos created at different times

**Steps:**
1. Use the **"Sort"** dropdown
2. Select **"Created"**

**Expected Result:**
- Todos appear in order from newest to oldest
- Most recently created appears first

### Test 2.8: Sort by Title (A-Z)
**Steps:**
1. Use the **"Sort"** dropdown
2. Select **"Title (A-Z)"**

**Expected Result:**
- Todos are sorted alphabetically by title
- "Apple" comes before "Zebra"

### Test 2.9: Sort by Status
**Steps:**
1. Use the **"Sort"** dropdown
2. Select **"Status"**

**Expected Result:**
- Active todos appear first (uncompleted)
- Completed todos appear after
- Within each group, order is stable

### Test 2.10: Combined Filter + Search + Sort
**Steps:**
1. Set Filter to: "All"
2. Set Sort to: "Title"
3. Type "Buy" in search

**Expected Result:**
- Only todos matching "Buy" in title or description appear
- Results are sorted alphabetically
- Status filter doesn't affect the list

---

## 3️⃣ Bulk Actions

### Test 3.1: Toggle All - Complete All Todos
**Setup:** Have at least 3 todos, some incomplete

**Steps:**
1. Click **"Toggle All"** button
2. Observe all todos

**Expected Result:**
- All todos are now marked as complete
- All checkboxes are checked
- All titles have strikethrough

### Test 3.2: Toggle All - Incomplete All Todos
**Steps:**
1. Click **"Toggle All"** again

**Expected Result:**
- All todos are now marked as incomplete
- All checkboxes are unchecked
- Strikethrough is removed

### Test 3.3: Clear Completed Todos
**Setup:** Have 3 completed and 2 active todos

**Steps:**
1. Click **"Clear Completed"** button
2. Confirmation dialog appears
3. Click **"Delete"** in the dialog (or "Cancel" to abort)

**Expected Result:**
- All completed todos are removed
- Only active todos remain
- Active todos count decreases
- Total count decreases

### Test 3.4: Cancel Clear Completed
**Steps:**
1. Click **"Clear Completed"**
2. Click **"Cancel"** in the confirmation dialog

**Expected Result:**
- Dialog closes
- All completed todos remain
- No todos are deleted

---

## 4️⃣ Statistics & Display

### Test 4.1: Stats Display - Total Count
**Setup:** Have any number of todos

**Expected Result:**
- **"Total"** stat shows the correct number
- Updates immediately when adding/removing todos

### Test 4.2: Stats Display - Active Count
**Steps:**
1. Create 5 todos
2. Complete 2 of them

**Expected Result:**
- **"Active"** stat shows "3"
- Updates in real-time as you toggle todos

### Test 4.3: Stats Display - Completed Count
**Expected Result:**
- **"Completed"** stat shows the number of completed todos
- Updates immediately when toggling completion

### Test 4.4: Empty State
**Steps:**
1. Delete all todos or start fresh
2. Observe the list area

**Expected Result:**
- Empty state message appears: "No todos yet. Create one to get started!"
- No error messages or broken UI

---

## 5️⃣ Export & Import

### Test 5.1: Export Todos to Clipboard
**Setup:** Have 2-3 todos

**Steps:**
1. Click **"Export"** button
2. Modal dialog opens showing JSON
3. Click **"Copy to Clipboard"**
4. Alert confirms successful copy

**Expected Result:**
- JSON modal shows all todos in proper format
- JSON contains id, title, completed status, timestamps
- Success message appears
- JSON can be pasted elsewhere

### Test 5.2: Export Todos to File
**Steps:**
1. Click **"Export"**
2. Click **"Download"** button

**Expected Result:**
- Browser downloads a `.json` file
- Filename format: `todos_YYYY-MM-DD.json`
- File contains valid JSON data

### Test 5.3: Import Todos from Paste
**Setup:** Have copied valid JSON from previous export

**Steps:**
1. Clear all todos (optional, for clarity)
2. Click **"Import"**
3. Paste previously exported JSON
4. Click **"Import"** button

**Expected Result:**
- Modal closes
- Success message appears
- All imported todos appear in the list
- Todos retain their original data (title, description, status)

### Test 5.4: Import from File
**Setup:** Have a JSON todo file

**Steps:**
1. Click **"Import"**
2. Click the file input area (or "upload a file" link)
3. Select a JSON file with valid todos

**Expected Result:**
- File is loaded
- Success message appears
- Todos from file appear in the list

### Test 5.5: Import Error - Invalid JSON
**Steps:**
1. Click **"Import"**
2. Paste invalid JSON: `{invalid json here}`
3. Click **"Import"**

**Expected Result:**
- Error message appears: "Failed to import todos: ..."
- Todos remain unchanged
- Modal stays open for correction

### Test 5.6: Import Error - Not an Array
**Steps:**
1. Click **"Import"**
2. Paste: `{"not": "array"}`
3. Click **"Import"**

**Expected Result:**
- Error message appears: "must be an array of todos"
- Current todos are not affected

---

## 6️⃣ Routing & Navigation

### Test 6.1: Home Route (/)
**Steps:**
1. Navigate to `http://localhost:4200/`

**Expected Result:**
- Todo list page loads
- Header and footer are visible
- "Home" link in navigation is highlighted

### Test 6.2: About Route (/about)
**Steps:**
1. Click **"About"** link in header navigation
2. Or navigate to `http://localhost:4200/about`

**Expected Result:**
- About page loads
- Page title is "About Todo App"
- Features and tech stack information is visible
- "About" link in navigation is highlighted
- Can navigate back to home

### Test 6.3: Settings Route - Not Authenticated
**Steps:**
1. Make sure you are **logged out** (see Login toggle in header)
2. Click **"Settings"** link in header
3. Or try to navigate to `http://localhost:4200/settings`

**Expected Result:**
- Redirected to home page (/)
- Settings page is NOT accessible
- No error message (graceful redirect)

### Test 6.4: Settings Route - Authenticated
**Steps:**
1. Click **"Login"** button in header
2. Now click **"Settings"** in header navigation

**Expected Result:**
- Settings page loads
- Page shows account, storage, and app information
- "Settings" link in navigation is highlighted

---

## 7️⃣ Authentication & Guards

### Test 7.1: Login
**Steps:**
1. Observe the **header** - see "Login" button
2. Click **"Login"**

**Expected Result:**
- Button changes to **"Logout"**
- Auth state is saved (check localStorage)
- Settings page becomes accessible

### Test 7.2: Logout
**Steps:**
1. Click **"Logout"** button in header
2. Confirmation dialog appears
3. Click "OK" or "Yes"

**Expected Result:**
- Button changes back to **"Login"**
- Auth state is cleared
- Accessing /settings redirects to home

### Test 7.3: Auth State Persistence
**Steps:**
1. Click **"Login"**
2. Refresh the page (F5)

**Expected Result:**
- Login state persists
- Settings page is still accessible without re-logging in

### Test 7.4: Auth Guard Protection
**Steps:**
1. Ensure you are logged out
2. Open developer console
3. Navigate directly to `http://localhost:4200/settings`

**Expected Result:**
- Page redirects to home (/)
- Settings page does NOT load
- No errors in console

---

## 8️⃣ UI/UX & Accessibility

### Test 8.1: Responsive Layout - Desktop
**Steps:**
1. Use full browser window (1920x1080 or larger)

**Expected Result:**
- Layout looks clean and organized
- Cards have proper spacing
- Text is readable
- All buttons are visible

### Test 8.2: Responsive Layout - Tablet
**Steps:**
1. Resize browser to 768px width
2. Or use DevTools device emulation (iPad)

**Expected Result:**
- Layout adjusts gracefully
- Single column where appropriate
- Buttons stack properly
- Text remains readable

### Test 8.3: Responsive Layout - Mobile
**Steps:**
1. Resize browser to 375px width (iPhone size)
2. Or use DevTools mobile emulation

**Expected Result:**
- Layout is fully mobile-optimized
- Single column for todos
- Mobile menu toggle appears
- Forms and buttons are touch-friendly
- No horizontal scrolling

### Test 8.4: Mobile Menu
**Steps:**
1. Resize to mobile (< 768px)
2. Click the **hamburger menu icon** (☰)

**Expected Result:**
- Navigation menu slides down
- Home, About, Settings links appear
- Login/Logout button appears
- Menu closes when you click a link

### Test 8.5: Keyboard Navigation
**Steps:**
1. Press **Tab** to cycle through interactive elements

**Expected Result:**
- Focus indicator appears on buttons and inputs
- Can navigate entire interface without mouse
- Focus order makes logical sense

### Test 8.6: Form Focus States
**Steps:**
1. Click in the title input field
2. Observe the border and shadow

**Expected Result:**
- Input has blue border (primary color)
- Blue shadow/glow appears around the field
- Placeholder text is visible and appropriately colored

### Test 8.7: Button Hover States
**Steps:**
1. Hover mouse over different button types
2. Try Primary, Secondary, Danger buttons

**Expected Result:**
- Primary button gets darker blue
- Secondary button changes background color
- Danger button gets darker red
- All have smooth transitions

### Test 8.8: Delete Confirmation Inline Dialog
**Steps:**
1. Click delete on a todo

**Expected Result:**
- Modal dialog appears over the todo
- Overlay darkens the background
- Dialog has "Delete" and "Cancel" buttons
- Clicking outside dialog cancels (on overlay)

---

## 9️⃣ Data Persistence

### Test 9.1: localStorage Persistence
**Setup:** Create 2-3 todos

**Steps:**
1. Open DevTools → Application → localStorage
2. Look for key: `app_todos`

**Expected Result:**
- `app_todos` key exists
- Contains JSON array of all todos
- Data is valid and parseable

### Test 9.2: Persistence Across Refresh
**Steps:**
1. Create 3 todos
2. Press F5 to refresh the page

**Expected Result:**
- All 3 todos appear after refresh
- Completion statuses are preserved
- No data loss

### Test 9.3: Persistence Across Sessions
**Steps:**
1. Close the browser completely
2. Reopen and navigate back to `http://localhost:4200`

**Expected Result:**
- All previously created todos are still there
- App state is fully preserved

### Test 9.4: Clear All Data
**Setup:** Have some todos and auth state

**Steps:**
1. Click "Settings" (login first if needed)
2. Click **"Clear All Data"**
3. Confirm the action

**Expected Result:**
- localStorage is cleared
- Page refreshes
- All todos are gone
- App returns to initial state
- Auth state is cleared

---

## 🔟 Error Handling

### Test 10.1: Network-like Errors
**Setup:** Open DevTools → Console

**Steps:**
1. Try importing malformed JSON multiple times
2. Check console for errors

**Expected Result:**
- Error messages display in UI (not console errors)
- App doesn't crash
- Can still use the app

### Test 10.2: Edge Cases - Very Long Text
**Steps:**
1. Create a todo with a very long title (100+ characters)

**Expected Result:**
- Text wraps properly
- No UI layout breaks
- Readable on all screen sizes

### Test 10.3: Edge Cases - Special Characters
**Steps:**
1. Create a todo with special characters: `Test "todo" with <special> & chars!`

**Expected Result:**
- Characters are displayed correctly
- No XSS or injection vulnerabilities
- App handles special characters safely

---

## ✅ Acceptance Criteria Checklist

After completing all tests above, verify:

- [ ] ✅ Create todos with title (required) and description (optional)
- [ ] ✅ Mark todos complete/incomplete
- [ ] ✅ Edit todos inline or via form
- [ ] ✅ Delete todos with confirmation
- [ ] ✅ Filter: All / Active / Completed
- [ ] ✅ Search by title or description (case-insensitive)
- [ ] ✅ Sort by: Date created, Title, Status
- [ ] ✅ Toggle all todos complete/incomplete
- [ ] ✅ Clear all completed todos
- [ ] ✅ Display stats: total, active, completed
- [ ] ✅ Persist todos to localStorage
- [ ] ✅ Export todos to JSON
- [ ] ✅ Import todos from JSON
- [ ] ✅ Routes: / (home), /about, /settings
- [ ] ✅ AuthGuard protects /settings
- [ ] ✅ Login/Logout toggle in header
- [ ] ✅ Responsive on mobile, tablet, desktop
- [ ] ✅ Full keyboard navigation
- [ ] ✅ ARIA labels and semantic HTML
- [ ] ✅ Unit tests pass
- [ ] ✅ No console errors
- [ ] ✅ No XSS vulnerabilities
- [ ] ✅ Smooth CSS transitions
- [ ] ✅ Clean, modern UI
- [ ] ✅ README with full documentation
- [ ] ✅ Code comments on public methods
- [ ] ✅ TypeScript strict mode

---

## 📝 Notes

- All timestamps use ISO 8601 format
- Todos are stored with unique IDs
- Search is real-time and case-insensitive
- All data is in localStorage by default (easily replaceable with API)
- App is production-ready after connecting a backend
- No external icon libraries used (all inline SVG)
- CSS is plain with no framework

---

**🎉 Demo Complete! All features are working as expected.**

