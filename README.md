Based on https://www.figma.com/community/file/1314076616839640516/real-estate-business-website-ui-template-dark-theme-produce-ui
## Stack:
- Typescript
- React
- Tailwind
- Cloudfare Workers/KV/R2
- [Custom KV filter/search wrapper](https://github.com/JFree00/Real-Estate-Business-Website/blob/master/data/filter.ts)
- Sentry

# Real Estate Business Website

A real estate web app built with React, TypeScript, and Tailwind CSS, demonstrating advanced front-end architecture and first class optimization.

## Technical Highlights

### Architecture & Design Choices

- **Cloudflare Pages**: A cost-effective serverless platform with no inactivity timeout, allowing the project
to always be free and available. Serves the web app as static assets, while using Cloudflare Workers as serverless functions.
- **React Router**: Combines well with Cloudflare Workers. Server side fetching allows the cloudflare worker to 
fetch fresh data during the initial page load, reducing cold starts and improving performance.
- **Cloudflare KV**: Performant and zero-cost initially. Considered other options like a serverless database, but combining serverless
function cold starts with a serverless database cold start would introduce a significant startup time. A cloud managed database or a VPS would
add unnecessary costs and latency.


## Focuses and Priorities
Being a serverless ssr application, Performance is the top priority to reduce the time it takes for the server to build 
each page, with costs close behind since better performance directly means lower costs.
### Speed


#### Assets
- Optimized image delivery using WebP format and compression
- [Uses client cache headers for faster loading and reduced server calls](https://github.com/JFree00/Real-Estate-Business-Website/blob/0e0a503b758d1ce5777977f03f03505bed3f45fc/app/routes/assets.%24asset.tsx)

#### Serverless Functions
- Uses React router + server side rendering to fetch fresh data initially before sending the page to the client, coupled with 
cloudflare kv as a strongly consistent datastore that sits close to the workers function.
- Streams nearly all data to the client to resolve directly into the page. Speeds up the page load even more by
not waiting for the promise to resolve. (Since the kv sits close to the worker function, there isn't much time to be saved. But hey, monitoring says the last two week's p99 for kv cache misses was 118ms, and 118ms saved from server load time is still 118ms saved)

### Costs

- https://github.com/JFree00/Real-Estate-Business-Website/blob/0e0a503b758d1ce5777977f03f03505bed3f45fc/data/filter.ts