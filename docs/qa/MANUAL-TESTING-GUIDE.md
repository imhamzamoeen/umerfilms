# Manual Testing Quick Reference Guide
## Story 3.5: Final Integration & Launch Readiness

**Development Server:** http://localhost:3000
**Report Template:** [docs/qa/manual-testing-report-3.5.md](manual-testing-report-3.5.md)

---

## Quick Start

1. **Start Development Server** (if not running):
   ```bash
   npm run dev
   ```
   Access at: http://localhost:3000

2. **Open Report Template**:
   Edit `docs/qa/manual-testing-report-3.5.md` to record results

3. **Complete Tests in Order**:
   - Favicon Verification
   - Lighthouse Audits
   - Contact Form E2E
   - Cross-Browser Testing
   - Mobile Testing

---

## Test 1: Favicon Verification (5 minutes)

### Steps:
1. Open http://localhost:3000 in Chrome
2. Look at the browser tab
3. Verify favicon (small "U" or UmerFilms icon) is visible
4. Check it displays clearly without pixelation

### What to Check:
- ✅ Favicon appears in tab
- ✅ Icon is clear and recognizable
- ✅ Works on all pages (/, /work, /about, /contact)

### Record in Report:
- Section 1: Favicon Verification
- Mark checkboxes
- Note any issues

---

## Test 2: Lighthouse Audits (30 minutes)

### For Each Page (Home, Work, Project, About, Contact):

#### Steps:
1. Open page in Chrome (e.g., http://localhost:3000)
2. Press **F12** to open DevTools
3. Click **"Lighthouse"** tab (right side)
4. Settings:
   - Mode: Navigation
   - Device: Desktop
   - Categories: All (Performance, Accessibility, SEO, Best Practices)
5. Click **"Analyze page load"**
6. Wait 10-30 seconds for results

#### Record Scores:
- Performance: __/100 (target >80)
- Accessibility: __/100 (target >90)
- SEO: __/100 (target >90)
- Best Practices: __/100 (target >90)

#### What to Look For:
- 🔴 Red issues (0-49): Critical - must fix
- 🟠 Orange issues (50-89): Warning - should fix
- 🟢 Green scores (90-100): Good - meets target

### Common Issues & Quick Fixes:

**Low Performance:**
- Images not optimized → Use Next.js Image component
- Large JavaScript bundles → Check bundle size
- Render-blocking resources → Defer non-critical CSS/JS

**Low Accessibility:**
- Missing alt text → Add to all images
- Insufficient color contrast → Adjust colors
- Missing ARIA labels → Add to interactive elements

**Low SEO:**
- Missing meta description → Add to page metadata
- Heading hierarchy issues → Fix h1, h2, h3 order
- Links without text → Add descriptive link text

### Record in Report:
- Section 2.1-2.5: One section per page
- Copy scores from Lighthouse
- Screenshot critical issues
- List recommendations

---

## Test 3: Contact Form E2E (15 minutes)

### Prerequisites:
1. Verify environment variables in `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxx
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   RESEND_TO_EMAIL=your-email@example.com
   ```

### Test 3.1: Valid Submission

#### Steps:
1. Go to http://localhost:3000/contact
2. Fill form with:
   ```
   Name: Test User (QA)
   Email: your-test-email@example.com
   Project Type: Commercial
   Message: This is an end-to-end test of the contact form functionality.
   ```
3. Click "Send Message"
4. Wait for success message
5. **Check your email** (RESEND_TO_EMAIL address)

#### Expected Results:
- ✅ Success message: "Message sent successfully!"
- ✅ Form clears after submission
- ✅ Email received within 5-10 seconds
- ✅ Email subject: "New Portfolio Inquiry: Commercial"
- ✅ Email contains all form data
- ✅ HTML formatting correct (bold labels, line breaks)

### Test 3.2-3.4: Validation Tests

#### Test Missing Name:
1. Leave name field empty
2. Fill other fields
3. Click submit
4. **Expected:** "Name is required" error

#### Test Invalid Email:
1. Enter "notanemail" in email field
2. Fill other fields
3. Click submit
4. **Expected:** "Please enter a valid email address" error

#### Test Short Message:
1. Enter "Short" (5 chars) in message
2. Fill other fields
3. Click submit
4. **Expected:** "Message must be at least 10 characters" error

### Test 3.3: Honeypot (Spam Protection)

#### Steps:
1. Open DevTools (F12) > Elements tab
2. Find honeypot field: `<input name="website" />`
3. In DevTools, remove `display: none` style
4. Fill honeypot with "spam"
5. Fill form normally
6. Submit
7. **Expected:** Form rejected, no email sent

### Test 3.4: XSS Prevention

#### Steps:
1. Fill form with:
   ```
   Name: <script>alert('XSS')</script>
   Email: test@example.com
   Project Type: Commercial
   Message: Test <strong>HTML</strong> content
   ```
2. Submit form
3. Check email received
4. **Verify HTML is escaped:**
   - Name shows: `&lt;script&gt;alert('XSS')&lt;/script&gt;`
   - Message shows: `Test &lt;strong&gt;HTML&lt;/strong&gt; content`

### Record in Report:
- Section 3: Contact Form E2E Test
- Mark each test pass/fail
- Screenshot success message
- Screenshot email received
- Note any failures

---

## Test 4: Cross-Browser Testing (20 minutes)

### Test on Each Browser:

#### Chrome (You're here already!)
- Test complete when all pages load correctly

#### Firefox
1. Download/Open Firefox
2. Go to http://localhost:3000
3. Test each page: /, /work, /work/brand-launch-campaign, /about, /contact
4. Check: Navigation, Layout, Forms, Videos, Hover states

#### Safari (macOS only)
1. Open Safari
2. Go to http://localhost:3000
3. Test each page
4. **Common Safari issues:**
   - Video codecs (use MP4 H.264)
   - Date input formatting
   - Flexbox bugs

#### Edge
1. Open Microsoft Edge
2. Go to http://localhost:3000
3. Test each page
4. Should work like Chrome (same engine)

### What to Check on Each Page:

**Navigation:**
- [ ] Header links work
- [ ] Active page highlighted
- [ ] Mobile menu works (if applicable)

**Layout:**
- [ ] No broken styles
- [ ] Proper spacing
- [ ] Responsive design works

**Forms:**
- [ ] Inputs work
- [ ] Submit works
- [ ] Validation works

**Videos:**
- [ ] Poster image shows
- [ ] Play button works
- [ ] Video plays

**Hover States:**
- [ ] Buttons change on hover
- [ ] Links underline/highlight
- [ ] Cards elevate/shadow

### Record in Report:
- Section 4.1-4.4: One per browser
- Mark checkboxes for each page
- List browser-specific issues

---

## Test 5: Mobile Testing (25 minutes)

### Option A: Real Devices (Preferred)

#### iOS Safari (iPhone):
1. Connect iPhone to same WiFi as laptop
2. Find laptop IP: `ipconfig` (Windows) or `ifconfig` (Mac)
3. On iPhone, open Safari
4. Go to: `http://[YOUR-IP]:3000`
5. Test all pages, check touch targets

#### Android Chrome:
1. Connect Android to same WiFi
2. Use same IP address
3. Open Chrome
4. Go to: `http://[YOUR-IP]:3000`
5. Test all pages

### Option B: Chrome DevTools (Simulation)

#### Steps:
1. Open http://localhost:3000 in Chrome
2. Press **Ctrl+Shift+M** (Toggle Device Toolbar)
3. Select device:
   - iPhone SE (320px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
   - iPad Pro (1024px)

#### Test Each Breakpoint:

**320px (iPhone SE):**
- [ ] No horizontal scroll
- [ ] Text readable (not too small)
- [ ] Buttons large enough to tap
- [ ] Layout stacks vertically

**768px (iPad):**
- [ ] Layout adapts (may show 2 columns)
- [ ] Navigation accessible
- [ ] Images scale properly

**1024px (iPad Landscape):**
- [ ] Desktop layout active
- [ ] Navigation bar visible
- [ ] Hover states work

### Touch Target Test:

#### Measure Touch Targets (44x44px minimum):
1. In DevTools Device Mode
2. Right-click element > Inspect
3. Check computed size in Styles panel
4. Verify ≥ 44px width and height

**Check:**
- [ ] Navigation links
- [ ] CTA buttons
- [ ] Project cards
- [ ] Form inputs
- [ ] Submit button

### Video Playback Test (Mobile):

1. Go to /about page
2. **Check:**
   - [ ] Poster image displays
   - [ ] Play button visible and large enough
   - [ ] Tapping play starts video
   - [ ] No autoplay issues
   - [ ] Video doesn't overflow screen

### Form Usability Test (Mobile):

1. Go to /contact page
2. **Check:**
   - [ ] Inputs focusable by tapping
   - [ ] No unwanted zoom on focus (font-size ≥ 16px)
   - [ ] Keyboard dismisses properly
   - [ ] Submit button accessible
   - [ ] Validation messages visible

### Record in Report:
- Section 5.1-5.3: iOS, Android, Breakpoints
- Mark all checkboxes
- Measure touch targets
- Screenshot mobile views
- Note any issues

---

## After Testing: Update Story 3.5

### Update Lighthouse Scores Table:

In `docs/stories/3.5.final-integration-launch-readiness.story.md`, find the Lighthouse table and fill in:

```markdown
| Page | Performance | Accessibility | SEO | Best Practices |
|------|-------------|---------------|-----|----------------|
| Home |     92/100 |     98/100 |     95/100 |     96/100 |
| Work |     90/100 |     97/100 |     95/100 |     95/100 |
| ...  |            |            |        |             |
```

### Mark Manual Testing Checklists:

Find sections in story file and mark completed:

```markdown
#### 1. Favicon Verification (AC 4)
- [x] Open site in browser
- [x] Verify favicon appears in browser tab
...
```

---

## Common Issues & Solutions

### Issue: Dev Server Not Starting
**Solution:**
```bash
# Kill existing process
npx kill-port 3000

# Restart
npm run dev
```

### Issue: Email Not Received
**Check:**
1. Environment variables in `.env.local`
2. Resend API key is valid
3. FROM email is verified in Resend dashboard
4. Check spam folder

### Issue: Lighthouse Scores Low
**Quick Fixes:**
- Clear cache: Ctrl+Shift+Delete
- Test in Incognito mode: Ctrl+Shift+N
- Disable browser extensions

### Issue: Can't Access from Mobile
**Solution:**
1. Check firewall (allow port 3000)
2. Use correct local IP (not 127.0.0.1)
3. Both devices on same WiFi

---

## Time Estimates

| Test | Time Required |
|------|---------------|
| Favicon | 5 min |
| Lighthouse (all pages) | 30 min |
| Contact Form E2E | 15 min |
| Cross-Browser | 20 min |
| Mobile Testing | 25 min |
| **Total** | **~95 minutes** |

---

## Checklist: Before Marking Complete

- [ ] All 5 test sections completed
- [ ] Manual testing report filled out
- [ ] Screenshots attached to report
- [ ] Critical issues documented
- [ ] Story 3.5 Lighthouse table updated
- [ ] Story 3.5 manual testing checklists marked
- [ ] Issues logged (if any)
- [ ] Ready for production decision made

---

## Need Help?

**Can't complete a test?**
- Note the issue in the report
- Mark test as "Blocked" with reason
- Continue with other tests

**Found a bug?**
- Document in report under "Issues Found"
- Include: Steps to reproduce, expected vs actual, severity
- Screenshot if visual issue

**All tests pass?**
- Update Story 3.5 status to "Ready for Done"
- Proceed with Vercel deployment (AC 13)

---

## Next Step: Vercel Deployment

Once manual testing is complete and all issues are fixed:

1. Go to [vercel.com](https://vercel.com)
2. Connect GitHub repository
3. Configure environment variables
4. Deploy to production
5. Test production URL
6. Mark Story 3.5 as "Done"

🎉 **Launch ready!**
