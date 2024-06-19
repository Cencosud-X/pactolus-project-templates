module.exports = async (runner, args) => {
  console.log("> Cleaning Monorepo....");

  const rc = args.rc;
  await runner.execute(`npx nx g @nx/workspace:rm ${rc.path}`, {
    cwd: rc.workspace_path,
  });

  console.log("> Rollback ✅ DONE");
};
