module.exports = async (runner, args) => {
  console.log("> PRE: Installing prerequisites (API):");

  const rc = args.rc;
  await runner.execute(
    [
      `nx g @nx/node:application ${rc.path} --bundler=webpack --framework=koa --e2eTestRunner=none --swcJest`,
      "npm install glob",
      "npm install ansi-colors",
      "npm install koa",
      "npm install koa-bodyparser",
      "npm install koa-router",
      "npm install @koa/cors",
      "npm install --save-dev webpack-merge",
      "npm install --save-dev @types/koa",
      "npm install --save-dev @types/koa-bodyparser",
      "npm install --save-dev @types/koa-router",
      "npm install --save-dev @types/koa__cors",
    ],
    {
      cwd: rc.workspace_path,
    }
  );

  console.log("> PRE: requisites ✅ DONE");
};
