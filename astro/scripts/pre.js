module.exports = async (runner, args) => {
  try {
    console.log("> PRE: Installing prerequisites (Astro):");

    const rc = args.rc;
    await runner.execute(
      [
        "npm install -D @nxtensions/astro",
        `npx nx generate @nxtensions/astro:app ${rc.path} -i react --addCypressTests=false`
      ],
      {
        cwd: rc.workspace_path,
      }
    );

    console.log("> PRE: requisites ✅ DONE");
  } catch {
    console.error(ex);
    throw new Error("failed to install api pre-requisites");
  }
};
