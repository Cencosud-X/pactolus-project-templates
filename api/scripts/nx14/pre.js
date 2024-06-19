/**
 * @type {import("../../../tools").TContextualizedMethod}
 */
module.exports = async (runner, context) => {
  const cmds = [
    // Project creation
    `nx g @nrwl/node:application ${context.getProjectName()} --bundler=webpack --framework=koa --e2eTestRunner=none --swcJest`,
    // Move specific version files
    // `mv ${clonedPath}/scripts/nx16/template/project.json ${clonedPath}/template`,
    // `mv ${clonedPath}/scripts/nx16/template/webpack.config.js ${clonedPath}/template`,
    // `rm -rf ${clonedPath}/template/src/api/health/health.resolver.ts`,
  ];

  await runner.execute(cmds, { cwd: context.getRootPath() });
};
