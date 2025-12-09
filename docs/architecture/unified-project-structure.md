# Unified Project Structure

```
umerfilms/
├── .github/                      # CI/CD workflows (optional)
│   └── workflows/
│       └── ci.yaml
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── work/
│   │   ├── page.tsx              # Portfolio grid
│   │   └── [slug]/
│   │       └── page.tsx          # Project detail
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── contact/
│   │   └── page.tsx              # Work With Me page
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact API
│   ├── not-found.tsx             # 404 page
│   ├── globals.css               # Global styles
│   └── favicon.ico
├── components/                   # React components
│   ├── ui/                       # Base UI components
│   ├── layout/                   # Layout components
│   ├── video/                    # Video components
│   ├── portfolio/                # Portfolio components
│   ├── contact/                  # Contact components
│   └── home/                     # Homepage sections
├── data/                         # Static data
│   ├── projects.ts               # Project data
│   └── content.ts                # Site content
├── lib/                          # Utilities
│   ├── api.ts                    # API client
│   └── utils.ts                  # Helper functions (cn, etc.)
├── public/                       # Static assets
│   ├── videos/
│   │   ├── hero/                 # Hero showreel
│   │   ├── projects/             # Project videos
│   │   ├── thumbnails/           # Video thumbnails
│   │   └── about/                # About video
│   ├── images/                   # Static images
│   └── fonts/                    # Custom fonts (if any)
├── types/                        # TypeScript types
│   ├── project.ts
│   ├── contact.ts
│   └── content.ts
├── styles/                       # Additional styles (if needed)
├── .env.example                  # Environment template
├── .env.local                    # Local environment (git-ignored)
├── .eslintrc.json                # ESLint config
├── .gitignore
├── next.config.ts                # Next.js config
├── package.json
├── postcss.config.js             # PostCSS config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
└── README.md
```

---
