# Complete Sanity CMS Setup Guide for CUET CAD Club

## Overview
This guide provides complete instructions for setting up and using Sanity CMS to manage all content for the CUET CAD Club website.

## 1. Initial Setup

### Step 1: Install Sanity CLI
```bash
npm install -g @sanity/cli
```

### Step 2: Login to Sanity
```bash
sanity login
```

### Step 3: Initialize Sanity Project
```bash
sanity init
```

Follow the prompts:
- Create new project? **Yes**
- Project name: **CUET CAD Club CMS**
- Use default dataset? **Yes (production)**
- Output path: **Use the current directory**
- Select project template: **Clean project**

### Step 4: Update Configuration Files

**Update `sanity.config.ts`:**
Replace `your-project-id` with your actual Sanity project ID (found in sanity.io dashboard)

**Update `src/lib/sanity.ts`:**
Replace `your-project-id` with your actual Sanity project ID

## 2. Content Schemas

The project includes 7 content types:

### 1. **Home Content** (`homeContent`)
Manages the homepage content including:
- Hero section (title, subtitle, description, image)
- Statistics (member count, projects, events, workshops)
- Featured updates

### 2. **About Content** (`aboutContent`)
Manages the about page including:
- Mission statement
- Vision statement
- Community description
- Activities list

### 3. **Join Content** (`joinContent`)
Manages the join page including:
- Membership benefits
- Contact information
- Office location and hours

### 4. **Events** (`event`)
Individual event records with:
- Title, date, location
- Description, status (open/coming-soon/completed/cancelled)
- Images and gallery
- Registration link

### 5. **Workshops** (`workshop`)
Workshop records with:
- Title, level (beginner/intermediate/advanced)
- Duration, instructor
- Learning outcomes, prerequisites
- Software requirements
- Next session date

### 6. **Committee Members** (`committeeMember`)
Team member profiles with:
- Name, position, role (faculty/executive/member)
- Department, year, email
- Bio, profile image
- LinkedIn profile
- Display order

### 7. **Alumni Profiles** (`alumniProfile`)
Alumni records with:
- Name, graduation year, degree
- Current position and company
- Bio, achievements
- Profile image, LinkedIn
- Featured status

## 3. Running Sanity Studio

### Start the Studio locally:
```bash
cd your-project-directory
npm run dev
```

Then open another terminal and run:
```bash
sanity start
```

The Studio will be available at `http://localhost:3333`

### Deploy Sanity Studio:
```bash
sanity deploy
```

Choose a studio hostname (e.g., `cuet-cad-club`)
Your studio will be available at: `https://cuet-cad-club.sanity.studio`

## 4. Adding Content

### Home Page Content
1. Go to "Home Page Content" in Sanity Studio
2. Click "Create new"
3. Fill in:
   - Hero Title: "CUET CAD Club"
   - Hero Subtitle: "Where Design Meets Innovation"
   - Hero Description: Your club description
   - Upload hero image
   - Add statistics (label, value, icon name)
   - Select featured updates from events/workshops

### About Page Content
1. Go to "About Page Content"
2. Add mission, vision, community description
3. Add activities with titles and descriptions

### Join Page Content
1. Go to "Join Page Content"
2. Add benefits (title, description, icon name)
3. Add contact email, office location, and hours

### Events
1. Go to "Events"
2. Click "Create new event"
3. Fill in all required fields
4. Set status appropriately
5. Upload images
6. Add registration link if applicable

### Workshops
1. Go to "Workshops"
2. Create workshop entries
3. Set difficulty level
4. Add learning outcomes and prerequisites
5. Schedule next session date

### Committee Members
1. Go to "Committee Members"
2. Add each member
3. Set role (faculty/executive/member)
4. Set display order (lower numbers appear first)
5. Upload profile images

### Alumni
1. Go to "Alumni Profiles"
2. Add alumni records
3. Check "Featured" for profiles to appear in featured section
4. Add achievements as a list

## 5. Frontend Integration

All pages now fetch data from Sanity CMS:

- **Home** (`/`) - Fetches home content, committee members
- **About** (`/about`) - Fetches about content
- **Events** (`/events`) - Fetches all events
- **Workshops** (`/workshops`) - Fetches all workshops
- **Committee** (`/committee`) - Fetches committee members
- **Alumni** (`/alumni`) - Fetches alumni profiles
- **Join** (`/join`) - Fetches join content

## 6. Icon Names Reference

When adding content that requires icons, use these exact names:

- `Users` - For community/members
- `Award` - For achievements/skills
- `Lightbulb` - For ideas/projects
- `Calendar` - For events/dates
- `Wrench` - For workshops/tools

## 7. Content Management Workflow

### Regular Updates:
1. **Events**: Update status to "completed" after events finish
2. **Workshops**: Update next session dates regularly
3. **Committee**: Update at start of each academic year
4. **Alumni**: Add new graduates each year, mark outstanding ones as "featured"

### Content Best Practices:
- Keep descriptions concise and engaging
- Use high-quality images (minimum 1200px width)
- Update homepage statistics quarterly
- Feature 3-6 alumni maximum
- Keep workshop prerequisites clear and accurate

## 8. Environment Variables

Add to your `.env.local`:
```
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
```

## 9. Image Handling

Images are automatically optimized by Sanity CDN:
- Upload original high-resolution images
- Sanity will serve optimized versions
- Use the image hotspot feature for better cropping

## 10. Troubleshooting

### Studio won't start:
```bash
sanity init --reconfigure
```

### Data not showing on frontend:
1. Check project ID in both config files match
2. Ensure dataset is "production"
3. Check CORS origins in Sanity dashboard
4. Verify content is published (not draft)

### CORS Errors:
1. Go to sanity.io dashboard
2. Navigate to API settings
3. Add your frontend URLs to CORS origins:
   - `http://localhost:5173`
   - `https://your-production-domain.com`

## 11. Production Deployment

1. Deploy Sanity Studio: `sanity deploy`
2. Update production environment variables
3. Add production domain to CORS origins
4. Deploy frontend application

## 12. Backup and Migration

### Export data:
```bash
sanity dataset export production backup.tar.gz
```

### Import data:
```bash
sanity dataset import backup.tar.gz production
```

## Support Resources

- Sanity Documentation: https://www.sanity.io/docs
- Sanity Community: https://www.sanity.io/community
- Project Structure: See `PROJECT_STRUCTURE.md`

---

**Last Updated**: January 2025
**Maintained by**: CUET CAD Club Tech Team
