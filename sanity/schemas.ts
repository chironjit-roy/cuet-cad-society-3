import { defineType, defineField, defineArrayMember } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime'
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Registration Open', value: 'open' },
          { title: 'Coming Soon', value: 'coming-soon' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true
          }
        })
      ]
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url'
    })
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image'
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: new Date(date).toLocaleDateString(),
        media
      }
    }
  }
})

export const workshop = defineType({
  name: 'workshop',
  title: 'Workshops',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'duration',
      title: 'Duration (hours)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'string'
    }),
    defineField({
      name: 'learningOutcomes',
      title: 'Learning Outcomes',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'text'
    }),
    defineField({
      name: 'software',
      title: 'Required Software',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'availableSpots',
      title: 'Available Spots',
      type: 'number'
    }),
    defineField({
      name: 'nextSession',
      title: 'Next Session Date',
      type: 'datetime'
    })
  ],
  preview: {
    select: {
      title: 'title',
      level: 'level',
      media: 'image'
    },
    prepare({ title, level, media }) {
      return {
        title,
        subtitle: level,
        media
      }
    }
  }
})

export const committeeMember = defineType({
  name: 'committeeMember',
  title: 'Committee Members',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'role',
      title: 'Role Type',
      type: 'string',
      options: {
        list: [
          { title: 'Faculty Advisor', value: 'faculty' },
          { title: 'Executive Board', value: 'executive' },
          { title: 'Committee Member', value: 'member' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'year',
      title: 'Academic Year',
      type: 'string'
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email'
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text'
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image'
    }
  }
})

export const alumniProfile = defineType({
  name: 'alumniProfile',
  title: 'Alumni Profiles',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'graduationYear',
      title: 'Graduation Year',
      type: 'number',
      validation: Rule => Rule.required().min(1900).max(new Date().getFullYear() + 10)
    }),
    defineField({
      name: 'degree',
      title: 'Degree',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'currentPosition',
      title: 'Current Position',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'company',
      title: 'Company/Organization',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'achievements',
      title: 'Key Achievements',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url'
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Alumni',
      type: 'boolean',
      description: 'Feature this alumni on the homepage'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'currentPosition',
      media: 'image'
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `${subtitle}`,
        media
      }
    }
  }
})

// Home Page Content
export const homeContent = defineType({
  name: 'homeContent',
  title: 'Home Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'icon', type: 'string', title: 'Icon Name (Users, Lightbulb, Calendar, Wrench)' },
          ],
        },
      ],
    }),
  ],
})

// About Page Content
export const aboutContent = defineType({
  name: 'aboutContent',
  title: 'About Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'text',
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'text',
    }),
    defineField({
      name: 'communityDescription',
      title: 'Community Description',
      type: 'text',
    }),
    defineField({
      name: 'activities',
      title: 'Activities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
          ],
        },
      ],
    }),
  ],
})

// Join Page Content
export const joinContent = defineType({
  name: 'joinContent',
  title: 'Join Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'benefits',
      title: 'Membership Benefits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'icon', type: 'string', title: 'Icon Name (Users, Award, Lightbulb)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'officeLocation',
      title: 'Office Location',
      type: 'string',
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'string',
    }),
  ],
})

export const schemaTypes = [
  homeContent,
  aboutContent,
  joinContent,
  event,
  workshop,
  committeeMember,
  alumniProfile
]
