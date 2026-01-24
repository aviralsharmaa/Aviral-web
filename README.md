# Aviral Sharma - ML Engineer Portfolio

A minimal, clean portfolio website built with Next.js 14, TypeScript, and Tailwind CSS, designed specifically for Machine Learning Engineers.

## Features

- 🎨 Minimal black and white design
- 📱 Fully responsive layout
- ⚡ Fast performance with Next.js 14
- 🌙 Black background with white accents
- 📊 Skills visualization
- 💼 Project showcase
- 📝 Experience section
- 📧 Contact section
- 📄 Resume download button
- 📸 Profile photo support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding Your Profile Photo and Resume

1. **Profile Photo**:
   - Place your profile photo in the `public/` folder
   - Name it `profile.jpg` (or update the path in `components/Hero.tsx`)
   - Recommended size: 256x256 pixels or larger (square image works best)
   - If no image is found, initials "AS" will be displayed

2. **Resume**:
   - Place your resume PDF in the `public/` folder
   - Name it `resume.pdf` (or update the path in `components/Hero.tsx`)
   - The download button will automatically link to this file

## Customization

### Update Personal Information

1. **Hero Section** (`components/Hero.tsx`):
   - Update social media links
   - Modify the introduction text

2. **About Section** (`components/About.tsx`):
   - Edit the about text
   - Update feature cards

3. **Skills Section** (`components/Skills.tsx`):
   - Modify skill categories and proficiency levels

4. **Projects Section** (`components/Projects.tsx`):
   - Add/remove projects
   - Update project details, links, and technologies

5. **Experience Section** (`components/Experience.tsx`):
   - Update work experience entries

6. **Contact Section** (`components/Contact.tsx`):
   - Update contact information and links

### Styling

The website uses Tailwind CSS. You can customize colors, spacing, and other design elements in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global styles and CSS variables

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This portfolio can be easily deployed on:

- **Vercel** (recommended for Next.js): Connect your GitHub repository
- **Netlify**: Deploy via Git or drag-and-drop
- **AWS Amplify**: Connect repository and deploy
- **Any Node.js hosting**: Build and deploy the production build

## License

MIT License - feel free to use this portfolio template for your own projects!

