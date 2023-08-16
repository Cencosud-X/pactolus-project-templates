module.exports = async (runner, args) => {
  try {
    console.log('> PRE: Installing prerequisites (WEB):');

    const rc = args.rc;
    await runner.execute([
      'npm install -D @nx/web',
      'npm install -D swc-loader',
      'npm install -D react-router-dom@6.15.0',
      'npm install -D webpack-merge',
      `npx nx g @nx/web:app ${rc.path} --unitTestRunner=jest --e2eTestRunner=none --bundler=webpack`
    ], {
      cwd: rc.workspace_path
    })

    console.log('> PRE: requisites ✅ DONE')

  } catch (ex) {
    console.error(ex);
    throw new Error('failed to install web pre-requisites');
  }
}