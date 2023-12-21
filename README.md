Hello fellow developers,
This is a updated repository for https://github.com/adrianhajdin/projects_realestate. The repository created by jsmastery was build for Nextjs 12 and below. But if you are rebuilding the project for Nextjs 14 just like me, most of the things in original repository will throw an error. This is due to migration of lot of features from Nextjs 12 to Nextjs 14. I have faced those errors and decided to fix for any developers working on this as a reference in the future.
So, Here are all the changes you need to do to fix the bugs:

- You donot want to include babelrc file instead update the eslintrc.json file with the respective code I have in my repository.
- You donot have a pages folder with index.js as your main entry point. Instead you have app directory as your main entry folder and page.js as your main file.
- In Nextjs 14, a new concept of Server Components and client components was introduced because of which a component is by default server component and if you want to perform client actions you need to specifically declare 'use client' at the top of your javascript file. For more details on this: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
- \_app.js is replaced with layout.js, so you cannot directly embed the ChakraProvider in layout.js so I made a Provider component and imported it in layout.js. To add layout to my ChakraProvider, I created a Node Layout which contains the basic structure of app.
- getStaticProps() and getServerSideProps() will throw an Hydration Error, so you need to use an alternative. My approach to solve this issue was to fetch data using react hooks
- The folder structure changed, so the slug components which can previously be created as /property/[id].js should now be /property/[id]/page.js
- Router queries was deprecated so I used useSearchParams() and usePathname() hooks to retrieve the respective data from routing parameters.
- Since queries doesnot work, you cannot simply push it in a router. You need to use createQueryString() function to push the queries to router using the method as SearchFilters.
- For the Image Scroll bar, you need to import react horizontal scrolling bar css file.

Hope this helps you. Thank you and enjoy your day✌️.
