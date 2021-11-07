# Ask Phill Front-end Technical Assignemt
Built on Next.js, deployed to Vercel.

Live url: https://ask-phill.vercel.app

To run, install dependencies with `npm i` then to start a local server `npm run dev`

## Some notes

In my opinion, this kind of data parsing should **never** be done on the front-end. The reasons for this being that:
1. You're sending a big JSON file to the user's device
2. The parsing speed would depend on the user device's power
3. It would block the main-thread which means the UI would freeze during the parsing
4. No feasible caching

In real-life, products are usually managed on a CMS, so I would simply use the CMS endpoints to get the data that I need. The CMS would handle the actual filtering and returning of data based on filter parameters I would send.
However, since without the data parsing aspect this task would be trivial, I created some sort of 'fake' backend that does it (with a forced timeout so it feels more real).

## Structure overview
- backend/ - This holds the "fake" backend code that parses the data
- components/ - UI Components (Not too many so I didn't bother organising too much. Ideally I would keep smart/dumb separation here)
- data/ - The raw JSON data
- hooks/ - So far just the 'useDebounce' hook for debouncing
- pages/ - The routes of the front-end app
- style/ - SASS style files

## Dependencies
- Next - Static Generation
- react-select - A Select component that offers autocomplete, multi-select dropdowns
- react-range - A Range component with multiple 'sliders'
- sass - For styling
