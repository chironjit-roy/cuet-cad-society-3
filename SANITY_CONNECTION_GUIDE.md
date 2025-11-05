# Complete Sanity CMS Connection Guide for CUET CAD Club

## Overview
This guide provides step-by-step instructions to connect your CUET CAD Club website to Sanity CMS for content management.

---

## Part 1: Sanity Project Setup

### Step 1: Create Sanity Account
1. Visit [sanity.io](https://www.sanity.io/)
2. Click "Get Started" or "Sign Up"
3. Sign up using:
   - GitHub account (recommended)
   - Google account
   - Email/password
4. Verify your email if using email/password signup

### Step 2: Install Sanity CLI
Open your terminal and run:
```bash
npm install -g @sanity/cli
```

Or if using npm gives errors, try:
```bash
yarn global add @sanity/cli
```

### Step 3: Login to Sanity
In your terminal, run:
```bash
sanity login
```
This will open your browser for authentication. Follow the prompts to authorize the CLI.

### Step 4: Initialize Sanity in Your Project
Navigate to your project directory:
```bash
cd /path/to/your/cuet-cad-club-project
```

Run the initialization command:
```bash
sanity init
```

Answer the prompts as follows:
- **Create new project?** → Yes
- **Your project name:** → `CUET CAD Club CMS`
- **Use the default dataset configuration?** → Yes
- **Project output path:** → Press Enter (use current directory)
- **Select project template:** → Clean project with no predefined schemas

### Step 5: Get Your Project ID
After initialization completes, you'll see a message like:
```
Success! Now what?
```

Your **Project ID** will be displayed. It looks like: `abc12345` (8 random characters)

**IMPORTANT:** Copy this Project ID - you'll need it in the next steps!

Alternatively, you can find it:
1. Visit [sanity.io/manage](https://sanity.io/manage)
2. Click on your "CUET CAD Club CMS" project
3. The Project ID is shown in the project dashboard

---

## Part 2: Configure Your Project Files

### Step 6: Update sanity.config.ts
Open `sanity.config.ts` in your code editor and replace `'your-project-id'` with your actual Project ID:

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schema'

export default defineConfig({
  name: 'default',
  title: 'CUET CAD Club CMS',
  
  projectId: 'abc12345', // ← Replace with YOUR project ID
  dataset: 'production',
  
  plugins: [
    structureTool(),
    visionTool()
  ],
  
  schema: {
    types: schemaTypes,
  },
})
```

### Step 7: Update src/lib/sanity.ts
Open `src/lib/sanity.ts` and replace `'your-project-id'` with your actual Project ID:

```typescript
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'abc12345', // ← Replace with YOUR project ID
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

// ... rest of the file remains the same
```

### Step 8: Create Environment Variables (Optional but Recommended)
Create a `.env.local` file in your project root:

```bash
VITE_SANITY_PROJECT_ID=abc12345
VITE_SANITY_DATASET=production
```

Then update `src/lib/sanity.ts` to use environment variables:

```typescript
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'abc12345',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})
```

---

## Part 3: Configure CORS Settings

### Step 9: Allow Your Website Domain
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your "CUET CAD Club CMS" project
3. Click on **"API"** in the left sidebar
4. Scroll to **"CORS Origins"**
5. Click **"Add CORS origin"**
6. Add these origins one by one:
   - `http://localhost:5173` (for local development)
   - `http://localhost:3000` (alternative local port)
   - Your production domain (e.g., `https://cuet-cad-club.com`)
7. Check **"Allow credentials"** for each
8. Click **"Save"**

---

## Part 4: Deploy Sanity Studio

### Step 10: Start Sanity Studio Locally
First, test that everything works locally:

```bash
npm run dev
```

In a **new terminal window**, start Sanity Studio:

```bash
sanity start
```

The Studio should open at `http://localhost:3333`

If you see the Studio interface, you're ready to deploy!

### Step 11: Deploy Studio to the Cloud
Stop the local studio (Ctrl+C) and run:

```bash
sanity deploy
```

You'll be asked to choose a studio hostname:
```
Studio hostname (<value>.sanity.studio): 
```

Enter a unique name like: `cuet-cad-club`

Your Sanity Studio will now be available at:
```
https://cuet-cad-club.sanity.studio
```

**Save this URL** - this is where you'll manage all your content!

---

## Part 5: Add Initial Content

### Step 12: Access Your Studio
Visit your deployed studio URL (e.g., `https://cuet-cad-club.sanity.studio`)

Log in with the same account you used earlier.

### Step 13: Create Content Documents
You should see these content types in the sidebar:

1. **Home Page Content** - Create one document
2. **About Page Content** - Create one document
3. **Join Page Content** - Create one document
4. **Events** - Create multiple event documents
5. **Workshops** - Create multiple workshop documents
6. **Committee Members** - Create documents for each team member
7. **Alumni Profiles** - Create documents for alumni

### Step 14: Fill in Home Page Content
1. Click **"Home Page Content"** in the Studio
2. Click **"Create new"**
3. Fill in the fields:
   - **Hero Title:** `CUET CAD Club`
   - **Hero Subtitle:** `Where Design Meets Innovation`
   - **Hero Description:** `Join Bangladesh's premier student organization for Computer-Aided Design excellence`
   - **Hero Image:** Upload your club's hero image (minimum 1920px width)
   - **Stats:** Add statistics (click "Add item" for each):
     - Icon: `Users`, Label: `Active Members`, Value: `150+`
     - Icon: `Lightbulb`, Label: `Projects`, Value: `50+`
     - Icon: `Calendar`, Label: `Events Yearly`, Value: `20+`
     - Icon: `Wrench`, Label: `Workshops`, Value: `30+`
4. Click **"Publish"**

### Step 15: Fill in About Page Content
1. Click **"About Page Content"**
2. Click **"Create new"**
3. Fill in:
   - **Mission:** Your club's mission statement
   - **Vision:** Your club's vision statement
   - **Community Description:** Description of your community
   - **Activities:** Add activities with titles and descriptions
4. Click **"Publish"**

### Step 16: Fill in Join Page Content
1. Click **"Join Page Content"**
2. Click **"Create new"**
3. Fill in:
   - **Benefits:** Add membership benefits (title, description, icon)
   - **Contact Email:** `cadclub@cuet.ac.bd`
   - **Office Location:** `Club Room 204, Student Center`
   - **Office Hours:** `Saturdays, 2 PM - 5 PM`
4. Click **"Publish"**

### Step 17: Add Events
1. Click **"Events"** → **"Create new event"**
2. Fill in all fields:
   - Title, Date, Location, Description
   - Status: open/coming-soon/completed/cancelled
   - Upload event images
   - Add registration link (if applicable)
3. Repeat for each event
4. Always click **"Publish"** when done

### Step 18: Add Workshops
1. Click **"Workshops"** → **"Create new workshop"**
2. Fill in all fields:
   - Title, Level (beginner/intermediate/advanced)
   - Duration, Instructor, Description
   - Learning Outcomes (list)
   - Prerequisites
   - Software Requirements (list)
   - Next Session Date
   - Available Spots
3. Upload workshop image
4. Click **"Publish"**

### Step 19: Add Committee Members
1. Click **"Committee Members"** → **"Create new committee member"**
2. Fill in:
   - Name, Position
   - Role: faculty/executive/member
   - Department, Year, Email
   - Bio
   - Upload profile image
   - LinkedIn profile (optional)
   - **Order:** Lower numbers appear first (0, 1, 2, 3...)
3. Click **"Publish"**
4. Repeat for all team members

### Step 20: Add Alumni
1. Click **"Alumni Profiles"** → **"Create new alumni profile"**
2. Fill in:
   - Name, Graduation Year, Degree
   - Current Position, Company
   - Bio, Achievements (list)
   - Upload profile image
   - LinkedIn, Email
   - Check **"Featured"** for profiles you want to highlight
3. Click **"Publish"**

---

## Part 6: Verify Everything Works

### Step 21: Test Your Frontend
1. Start your development server:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:5173` in your browser
3. Navigate through all pages:
   - Home (`/`) - Should show your hero content and stats
   - About (`/about`) - Should show mission, vision, activities
   - Events (`/events`) - Should list your events
   - Workshops (`/workshops`) - Should list your workshops
   - Committee (`/committee`) - Should show team members
   - Alumni (`/alumni`) - Should show alumni profiles
   - Join (`/join`) - Should show benefits and contact info

### Step 22: Troubleshooting

**If content doesn't appear:**

1. Check browser console for errors (F12 → Console tab)
2. Verify Project ID matches in both config files
3. Check CORS settings in Sanity dashboard
4. Make sure content is **published** (not in draft state)
5. Clear browser cache and refresh

**Common Issues:**

- **404 Errors:** Wrong Project ID
- **CORS Errors:** Add your domain to CORS origins
- **Empty Data:** Content not published in Studio
- **Image Not Loading:** Check image upload completed successfully

---

## Part 7: Content Management Workflow

### Regular Content Updates

**Weekly:**
- Update event statuses
- Add new upcoming events
- Update workshop next session dates

**Monthly:**
- Review and update statistics on homepage
- Add new committee members if any
- Update alumni profiles

**Annually:**
- Update committee members for new academic year
- Archive old events (change status to "completed")
- Add graduating students to alumni

### Best Practices

1. **Images:**
   - Upload high-resolution images (minimum 1200px width)
   - Use consistent aspect ratios
   - Optimize images before uploading (use tools like TinyPNG)

2. **Content:**
   - Keep descriptions concise and engaging
   - Use clear, actionable language
   - Proofread before publishing

3. **SEO:**
   - Use descriptive titles
   - Write unique descriptions
   - Add alt text to images (Sanity handles this)

4. **Publishing:**
   - Always click "Publish" - drafts won't appear on your site
   - Preview changes before publishing
   - Use the "Unpublish" feature if you need to remove content temporarily

---

## Part 8: Backup and Security

### Backup Your Content

Export all your data regularly:
```bash
sanity dataset export production backup.tar.gz
```

### Restore from Backup

If needed, import data:
```bash
sanity dataset import backup.tar.gz production
```

### Security Tips

1. Don't share your Project ID publicly (though it's not super sensitive)
2. Use environment variables for production deployments
3. Regularly update Sanity CLI: `npm update -g @sanity/cli`
4. Review who has access to your Sanity project in the dashboard

---

## Part 9: Production Deployment

### Deploy Your Frontend

When deploying your frontend to production (Vercel, Netlify, etc.):

1. Add environment variables in your hosting dashboard:
   ```
   VITE_SANITY_PROJECT_ID=abc12345
   VITE_SANITY_DATASET=production
   ```

2. Add your production domain to Sanity CORS origins:
   - Go to sanity.io/manage
   - Select your project
   - API → CORS Origins
   - Add your production URL (e.g., `https://cuet-cad-club.com`)

3. Deploy your site

### Update Sanity Studio

If you make schema changes:
```bash
sanity deploy
```

This updates your studio without affecting your data.

---

## Quick Reference

### Important URLs
- **Sanity Dashboard:** https://sanity.io/manage
- **Your Studio:** https://cuet-cad-club.sanity.studio (your chosen hostname)
- **Sanity Docs:** https://www.sanity.io/docs

### Useful Commands
```bash
# Start local studio
sanity start

# Deploy studio
sanity deploy

# Export data
sanity dataset export production backup.tar.gz

# Import data
sanity dataset import backup.tar.gz production

# Update CLI
npm update -g @sanity/cli

# Check studio configuration
sanity check
```

### Icon Names Reference
When adding content with icons, use these exact names:
- `Users` - Community/Members
- `Lightbulb` - Projects/Ideas
- `Calendar` - Events/Dates
- `Wrench` - Workshops/Tools
- `Award` - Achievements/Skills

### Content Type Overview
| Content Type | How Many | Purpose |
|--------------|----------|---------|
| Home Page Content | 1 | Homepage hero, stats, featured content |
| About Page Content | 1 | Mission, vision, activities |
| Join Page Content | 1 | Benefits, contact info |
| Events | Many | Individual event records |
| Workshops | Many | Workshop records |
| Committee Members | Many | Team member profiles |
| Alumni Profiles | Many | Alumni records |

---

## Support & Resources

### Get Help
- **Sanity Documentation:** https://www.sanity.io/docs
- **Sanity Community:** https://www.sanity.io/community
- **Sanity Slack:** https://slack.sanity.io/

### Additional Resources
- Schema Documentation: See `sanity/schema.ts` in your project
- Project Structure: See `PROJECT_STRUCTURE.md`
- Full CMS Guide: See `SANITY_CMS_COMPLETE_GUIDE.md`

---

**Last Updated:** January 2025  
**Maintained by:** CUET CAD Club Tech Team

**Need help?** Contact your tech team or refer to the Sanity documentation.
