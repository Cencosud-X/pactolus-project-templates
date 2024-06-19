/**
 * @type {import("../../../tools").TContextualizedMethod}
 */
module.exports = async (runner, context) => {
  const clonedPath = context.getCurrentClonedPath();
  const cmds = [
    // Project creation
    `nx g @nrwl/node:application ${context.getProjectName()} --bundler=webpack --framework=koa --e2eTestRunner=none --swcJest`,
    // Move specific version files
    `mv ${clonedPath}/scripts/nx14/template/project.json ${clonedPath}/template`,
    `mv ${clonedPath}/scripts/nx14/template/webpack.js ${clonedPath}/template`,
  ];

  await runner.execute(cmds, { cwd: context.getRootPath() });
};
