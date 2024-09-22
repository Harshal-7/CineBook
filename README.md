# Cine-Book

**Cine-Book** allows users to search, explore, and bookmark their favorite movies and TV shows. Users can view trending, popular, new releases, and upcoming content, explore detailed information on each title, and save items to their bookmarks after authentication. This app provides a seamless movie discovery experience with user-specific bookmarks.

## Features

- **Explore Movies & TV Shows**: Search for movies and TV shows across categories like trending, popular, new releases, and upcoming.
- **Movie Details**: View information about a selected movie, including ratings, reviews, and other relevant details.
- **User-Specific Bookmarks**: Save your favorite movies and TV shows to bookmarks (requires user authentication).
- **Authentication**: Secure login and signup process to ensure user-specific content.

## Tech Stack

- **Next.js**: Server-side rendering and static site generation for improved performance and SEO.
- **Tailwind CSS**: Utility-first CSS framework for responsive and fast UI development.
- **TypeScript**: Ensures type safety throughout the application.
- **Prisma ORM**: Database ORM used with MongoDB for efficient data querying and management.
- **MongoDB**: NoSQL database for storing users, bookmarks, and movie information.
- **Auth.js**: Handles user authentication and authorization.
- **Zod**: Used for schema validation to ensure data integrity.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/cine-book.git
   cd cine-book
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables. Create a .env file in the root directory and add the following:

   ```bash
   DATABASE_URL=mongodb://your-mongo-url
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-next-auth-secret
   ```

4. Run Prisma migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Visit http://localhost:3000 in your browser.

## Usage

- Search: Use the search bar to find specific movies or TV shows.
- Explore: Browse trending, popular, new releases, and upcoming titles.
- View Movie Details: Click on a movie or TV show to view its information.
- Bookmark: Save a movie or show by clicking the bookmark button. You must log in or sign up to use this feature.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch: git checkout -b feature-name
3. Make your changes.
4. Push the branch: git push origin feature-name
5. Submit a pull request.
