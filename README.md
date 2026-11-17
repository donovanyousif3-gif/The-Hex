# The Hex – website

A covered market, two event halls and a learning floor on Detroit Street, Kerrytown, Ann Arbor.
Student design proposal by Donovan Yousif, ARC 3114 Integrated Design 3, Lawrence Technological University.

## 1. Put the site online with GitHub Pages (about 5 minutes)

1. Sign in at github.com and click **New repository**. Name it `the-hex`, set it to **Public**, and click **Create repository**.
2. On the new repo page, click **uploading an existing file**. Drag in everything from this folder
   (`index.html`, `img`, `dwg`, `model.json`, `model_geo.json`, `README.md`, `Code.gs`). Click **Commit changes**.
   (Drag the folders themselves so `img/` and `dwg/` keep their names.)
3. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, and **Save**.
4. After a minute the site is live at `https://YOUR-USERNAME.github.io/the-hex/`.

Anyone with that link can open it, on any device, without a Claude account.

## 2. Test it

Open the link on your review laptop: the 3D model, sun slider, level cuts, section slider and clickable plans all run in the browser.
Until step 3 is done, the booking and job forms only save in the visitor's browser.

## 3. Make the forms real with Google Apps Script (optional, about 10 minutes)

1. Create a new Google Sheet named **The Hex – forms**.
2. In the sheet: **Extensions → Apps Script**. Delete the sample code and paste all of `Code.gs`.
   Optionally put your email in `NOTIFY_EMAIL` to get a notice for every submission. Click **Save**.
3. Click **Deploy → New deployment**, choose type **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click **Deploy**, approve the permissions, and copy the **Web app URL** (ends in `/exec`).
4. In GitHub, open `index.html`, click the pencil (edit), find the line
   `const HEX_API = '';` and paste the URL between the quotes. **Commit changes**.
5. Submit a test booking on the live site. It appears in the sheet's **Bookings** tab;
   applications go to **Applications**, and uploaded résumés to a Drive folder called *The Hex – resumes*.

If you change `Code.gs` later, use **Deploy → Manage deployments → Edit → New version** so the same URL keeps working.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole site (styles, 3D viewer and forms are inline) |
| `img/` | Renders |
| `dwg/` | Drawings: plans, sections, elevations, diagrams |
| `model.json`, `model_geo.json` | 3D model of the building + rooms for the plans |
| `Code.gs` | Google Apps Script backend for the forms |
