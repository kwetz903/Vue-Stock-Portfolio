module.exports = {
  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: "test-projects",
      overrideEndpoint: false,
      region: "us-east-2",
      bucket: "vue-portfolio-project",
      createBucket: false,
      staticHosting: true,
      staticIndexPage: "index.html",
      staticErrorPage: "index.html",
      assetPath: "dist",
      assetMatch: "**",
      deployPath: "/",
      acl: "public-read",
      pwa: false,
      enableCloudfront: false,
      pluginVersion: "4.0.0-rc3",
      uploadConcurrency: 5
    }
  }
};
