module.exports = async (runner, args) => {
  try {
    console.log("> PRE: Installing prerequisites (Subscriber):");

    const rc = args.rc;
    
    const topics = !!rc.settings.topics;
    
    const packages = [
      "npm install --save-dev @nx/node",
      "npm install --save-dev webpack-merge",
      "npm install --save @team_seki/subscriber-plugin@1.0.8",
    ];
    const installPubsub = Array.isArray(topics) && topics.some(topic => topic.provider === "PubSub") ? "npm install --save @team_seki/pubsub-streamer-plugin@1.1.4" : null;
    const installKafka = Array.isArray(topics) && topics.some(topic => topic.provider === "Kafka") ? "npm install --save @team_seki/kafka-streamer-plugin@1.0.11" : null;
    
    await runner.execute(packages, { cwd: rc.workspace_path });
    if (installPubsub !== null) {
      console.log("> Installing prerequisites (Pubsub):");
      await runner.execute(installPubsub, { cwd: rc.workspace_path });  
    }
    if (installKafka !== null) {
      console.log("> Installing prerequisites (Kafka):");
      await runner.execute(installKafka, { cwd: rc.workspace_path });  
    }

    await runner.execute([`npx nx g @nx/node:application ${rc.path} --bundler=none --tags=\"REQUIRED:GOLDEN\" --unitTestRunner=jest --e2eTestRunner=none`], { cwd: rc.workspace_path })

    console.log("> PRE: requisites ✅ DONE");
  } catch (ex) {
    console.error(ex);
    throw new Error("Failed to install subscriber pre-requisites");
  }
};
