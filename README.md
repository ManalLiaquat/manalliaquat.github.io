# Manal Liaquat — Backend Engineer & Team Lead

**Live:** https://manalliaquat.github.io

I'm a Backend Engineer and Backend Team Lead at Plai, with 7+ years building
web and mobile applications in JavaScript: Node.js, Express, MongoDB, React, Next.js and React Native.

This repository is my portfolio. It draws my career as a metro network map: Backend,
Frontend and Mobile are the lines, and each role is a station.

## For AI agents and crawlers

- [`/llms.txt`](https://manalliaquat.github.io/llms.txt): short profile in Markdown
- [`/llms-full.txt`](https://manalliaquat.github.io/llms-full.txt): full experience, skills, certifications and writing
- [`/resume.json`](https://manalliaquat.github.io/resume.json): machine-readable résumé ([JSON Resume](https://jsonresume.org) schema)
- Schema.org `Person` / `ProfilePage` JSON-LD and prerendered HTML in every page

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run deploy   # build and publish dist/ to the gh-pages branch
```

All content lives in [`src/data/portfolio.js`](src/data/portfolio.js). The build-time SEO plugin in
[`seo/seoPlugin.js`](seo/seoPlugin.js) generates the meta tags, JSON-LD, sitemap, robots.txt, llms.txt
and résumé from that same file.

Pushing to the `portfolio` branch deploys automatically through GitHub Actions.

## Contact

- Email: m.manalliaquat@gmail.com
- [LinkedIn](https://www.linkedin.com/in/manalliaquat/) · [GitHub](https://github.com/manalliaquat) · [Medium](https://medium.com/@m.manalliaquat) · [Stack Overflow](https://stackoverflow.com/users/12815456/manal-liaquat)

## License

GPL-3.0. See [LICENSE](LICENSE).
