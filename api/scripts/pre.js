const { witHelper } = require("./../../tools/helper");

module.exports = async (runner, args) => {
  console.log("> PRE: Installing prerequisites (API):");

  // Call script based on the Nx Version!
  const helper = witHelper(args.rc, __dirname);
  await helper.callVersionedPre(runner, args);

  // --------------------------------------------------------
  // Always run this commands (nx version agnostic)
  const context = helper.getContext();

  const cmds = [
    context.whenNotInstalled(`glob`, (pkg) => {
      return `npm install ${pkg}`;
    }),
    context.whenNotInstalled(`ansi-colors`, (pkg) => {
      return `npm install ${pkg}`;
    }),
    context.whenNotInstalled(`koa`, (pkg) => {
      return `npm install ${pkg}`;
    }),
    context.whenNotInstalled(`koa-bodyparser`, (pkg) => {
      return `npm install ${pkg}`;
    }),
    context.whenNotInstalled(`koa-router`, (pkg) => {
      return `npm install ${pkg}`;
    }),
    context.whenNotInstalled(`@koa/cors`, (pkg) => {
      return `npm install ${pkg}`;
    }),
    context.whenNotInstalled(`webpack-merge`, (pkg) => {
      return `npm install --save-dev ${pkg}`;
    }),
    context.whenNotInstalled(`@types/koa`, (pkg) => {
      return `npm install --save-dev ${pkg}`;
    }),
    context.whenNotInstalled(`@types/koa-bodyparser`, (pkg) => {
      return `npm install --save-dev ${pkg}`;
    }),
    context.whenNotInstalled(`@types/koa-router`, (pkg) => {
      return `npm install --save-dev ${pkg}`;
    }),
    context.whenNotInstalled(`@types/koa__cors`, (pkg) => {
      return `npm install --save-dev ${pkg}`;
    }),
  ];

  await runner.execute(cmds, { cwd: context.getRootPath() });

  console.log("> PRE: requisites ✅ DONE");
};
