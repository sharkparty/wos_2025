# Client

This is a [Next.js](https://nextjs.org/) project.

## Getting Started

First, install the dependencies:

```bash
npm ci
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `.next` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `npm run start`

Starts the application in production mode. The application should be built before running this command.

### `npm run lint`

Runs ESLint to find and fix problems in your code.

### `npm run pretty`

Runs Prettier to format the code.

### `npm run format`

Runs ESLint and Prettier to format the code.

### `npm run storybook`

Runs Storybook on port 6006.

### `npm run build-storybook`

Builds Storybook for deployment.

### `npm run test`

Launches the test runner in the interactive watch mode.

## Folder Structure

The project structure is as follows:

```
.
├── .next
├── .storybook
├── node_modules
├── src
│   ├── app
│   │   ├── components
│   │   └── ...
│   └── stories
└── ...
```

*   `.next`: Contains the compiled output of the Next.js application.
*   `.storybook`: Contains the Storybook configuration files.
*   `node_modules`: Contains all the project's dependencies.
*   `src`: Contains the source code of the application.
*   `src/app`: Contains the main application logic, including pages and components.
*   `src/app/components`: Contains reusable components used throughout the application.
*   `src/stories`: Contains Storybook stories for the components.

## Testing

This project uses [Jest](https://jestjs.io/) and [Vitest](https://vitest.dev/) for testing.

### Jest

To run the Jest tests, run the following command:

```bash
npm run test
```

### Vitest

This project uses Vitest to test Storybook stories. To run the Vitest tests, you will need to have Storybook running.

First, start Storybook:

```bash
npm run storybook
```

Then, in a separate terminal, run the following command:

```bash
npx vitest
```

## Linting and Formatting

This project uses [ESLint](httpss://eslint.org/) for linting and [Prettier](https://prettier.io/) for formatting.

To run the linter, run the following command:

```bash
npm run lint
```

To format the code, run the following command:

```bash
npm run pretty
```

You can also run both the linter and the formatter at the same time:

```bash
npm run format
```

## Storybook

This project uses [Storybook](https://storybook.js.org/) for component development.

To run Storybook, run the following command:

```bash
npm run storybook
```

This will start Storybook on port 6006.
