/**
 * @type {import("../../../tools").TContextualizedMethod}
 */
module.exports = async (runner, context) => {
  const cmds = [
    // Project creation
    `nx g @nx/node:application ${context.getProjectName()} --directory=apps/${context.getProjectName()} --projectNameAndRootFormat=as-provided --bundler=webpack --framework=koa --e2eTestRunner=none --swcJest`,
    // Move specific version files
    `mv ${clonedPath}/scripts/nx16/template/project.json ${clonedPath}/template`,
    `mv ${clonedPath}/scripts/nx16/template/webpack.config.js ${clonedPath}/template`,
  ];

  await runner.execute(cmds, { cwd: context.getRootPath() });
};
