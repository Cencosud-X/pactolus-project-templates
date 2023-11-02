/**
 * @type {import("../../../tools").TContextualizedMethod}
 */
module.exports = async (runner, context) => {
  const { version } = context.getNxInformation();
  const clonedPath = context.getCurrentClonedPath();

  const cmds = [
    // To reference workspace libraries in monorepo
    context.whenNotInstalled("tsconfig-paths", (pkg) => {
      return `npm install -D ${pkg}`;
    }),

    // React typings
    context.whenNotInstalled("@types/react", (pkg) => {
      return `npm install -D ${pkg}`;
    }),
    context.whenNotInstalled("@types/react-dom", (pkg) => {
      return `npm install -D ${pkg}`;
    }),

    // Nx generator dependencies
    context.whenNotInstalled("@nx/react", (pkg) => {
      return `npm install -D ${pkg}@${version}`;
    }),
    context.whenNotInstalled("@nx/web", (pkg) => {
      return `npm install -D ${pkg}@${version}`;
    }),

    // Docusaurus Dependencies
    context.whenNotInstalled("@docusaurus/core", (pkg) => {
      return `npm install ${pkg}@3.0.0`;
    }),
    context.whenNotInstalled("@docusaurus/preset-classic", (pkg) => {
      return `npm install ${pkg}@3.0.0`;
    }),
    context.whenNotInstalled("@docusaurus/theme-mermaid", (pkg) => {
      return `npm install ${pkg}@3.0.0`;
    }),
    context.whenNotInstalled("prism-react-renderer", (pkg) => {
      return `npm install ${pkg}@^2.1.0`;
    }),
    context.whenNotInstalled("@docusaurus/module-type-aliases", (pkg) => {
      return `npm install -D ${pkg}@3.0.0`;
    }),
    context.whenNotInstalled("@docusaurus/types", (pkg) => {
      return `npm install -D ${pkg}@3.0.0`;
    }),

    // Project creation
    `npx nx g @nx/web:app ${context.getProjectName()} --directory=apps/${context.getProjectName()} --projectNameAndRootFormat=as-provided --bundler=webpack`,

    // Move specific version files
    `mv ${clonedPath}/scripts/nx16/template/project.json ${clonedPath}/template`,
    `mv ${clonedPath}/scripts/nx16/template/webpack.config.js ${clonedPath}/template`,
    `mv ${clonedPath}/scripts/nx16/template/tsconfig.app.json ${clonedPath}/template`,
  ].filter((c) => c != null);

  await runner.execute(cmds, { cwd: context.getRootPath() });
};
