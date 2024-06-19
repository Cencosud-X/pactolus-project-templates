const { witHelper } = require("./../../tools/helper");

const installVersionSpecificDependencies = async (helper, runner, args) => {
  console.log("Installing version-specific prerequisites...");
  await helper.callVersionedPre(runner, args);
};

const installGeneralDependencies = async (helper, runner) => {
  const context = helper.getContext();
  const commands = generateInstallationCommands(context);
  const devCommands = generateInstallationDevCommands(context);

  console.log("Installing general prerequisites...");
  await runner.execute([...commands, ...devCommands], {
    cwd: context.getRootPath(),
  });
};

const generateInstallationDevCommands = (context) => {
  const devDependencies = [
    "@koa/cors",
    "webpack-merge",
    "@types/koa",
    "@types/koa-bodyparser",
    "@types/koa-router",
    "@types/koa__cors",
  ];

  return devDependencies.map((dep) =>
    context.whenNotInstalled(dep, (pkg) => {
      const command = `npm install --save-dev ${pkg}`;
      console.log(`Generated command for ${pkg}: ${command} 📦`);
      return command;
    })
  );
};

const generateInstallationCommands = (context) => {
  const dependencies = [
    "glob",
    "ansi-colors",
    "koa",
    "koa-bodyparser",
    "koa-router",
  ];

  return dependencies.map((dep) =>
    context.whenNotInstalled(dep, (pkg) => {
      const command = `npm install ${pkg}`;
      console.log(`Generated command for ${pkg}: ${command} 📦`);
      return command;
    })
  );
};

module.exports = async (runner, args) => {
  console.log("PRE: 🚀 Starting installation of prerequisites (API)");

  const helper = witHelper(args.rc, __dirname);
  await installVersionSpecificDependencies(helper, runner, args);
  await installGeneralDependencies(helper, runner);

  console.log("PRE: ✅ Prerequisites installation complete.");
};
