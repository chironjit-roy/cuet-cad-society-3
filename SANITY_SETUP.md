# Sanity CMS Setup Instructions

This project is now configured to use Sanity CMS for managing content including Events, Workshops, Committee Members, and Alumni Profiles.

## Setup Steps

### 1. Create a Sanity Account
1. Go to [sanity.io](https://www.sanity.io/)
2. Sign up for a free account

### 2. Install Sanity CLI
```bash
npm install -g @sanity/cli
```

### 3. Initialize Sanity Project
```bash
sanity login
sanity init
```

Follow the prompts:
- Create new project or use existing
- Choose a project name: "CUET CAD Club CMS"
- Use default dataset configuration: "production"
- Choose "Clean project with no predefined schemas"

### 4. Get Your Project ID
After initialization, you'll receive a Project ID. Copy this ID.

### 5. Update Configuration Files
Replace `'your-project-id'` in these files with your actual Sanity Project ID:
- `sanity.config.ts`
- `src/lib/sanity.ts`

### 6. Deploy Sanity Studio
```bash
sanity deploy
```

Choose a studio hostname (e.g., `cuet-cad-club`). Your Sanity Studio will be available at:
`https://cuet-cad-club.sanity.studio`

### 7. Add Content
1. Go to your Sanity Studio URL
2. Start adding content for:
   - Events
   - Workshops
   - Committee Members
   - Alumni Profiles

## Content Schemas

### Events
- Title, Date, Location, Description
- Status (Open/Coming Soon/Completed/Cancelled)
- Featured Image & Gallery
- Registration Link

### Workshops
- Title, Level (Beginner/Intermediate/Advanced)
- Duration, Instructor
- Learning Outcomes, Prerequisites
- Required Software
- Next Session Date

### Committee Members
- Name, Position, Role Type
- Department, Year, Email
- Bio, Profile Image
- LinkedIn Profile
- Display Order

### Alumni Profiles
- Name, Graduation Year, Degree
- Current Position, Company
- Bio, Key Achievements
- Profile Image, LinkedIn, Email
- Featured Flag

## Using the Data in Your App

The `src/lib/sanity.ts` file includes helper functions to fetch data:

```typescript
import { getEvents, getWorkshops, getCommitteeMembers, getAlumniProfiles } from '@/lib/sanity'

// In your components
const events = await getEvents()
const workshops = await getWorkshops()
const members = await getCommitteeMembers()
const alumni = await getAlumniProfiles()
```

## Next Steps

1. Update your React components to fetch and display data from Sanity
2. Replace static data arrays with dynamic Sanity queries
3. Consider adding loading states and error handling
4. Implement real-time preview for editors (optional)

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity + React Guide](https://www.sanity.io/guides/sanity-nextjs-guide)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
