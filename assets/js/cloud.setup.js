/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */

Cloud.setup({

  /* eslint-disable */
  methods: {"logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["emailAddress","password","rememberMe"]},"signup":{"verb":"POST","url":"/api/v1/entrance/signup","args":["emailAddress","password","fullName"]},"observeMySession":{"verb":"POST","url":"/api/v1/observe-my-session","args":[],"protocol":"io.socket"},"getFiles":{"verb":"GET","url":"/api/v1/get-files","args":[]},"getProgress":{"verb":"GET","url":"/api/v1/get-progress","args":[]},"create":{"verb":"POST","url":"/api/v1/portal/create","args":["name","url","emailsToCall","cellphonesToCall"]},"getList":{"verb":"GET","url":"/api/v1/portal/get-list","args":["limit","offset"]},"delete":{"verb":"PUT","url":"/api/v1/portal/active","args":[]},"getMe":{"verb":"GET","url":"/api/v1/account/get-me","args":[]},"ffproble":{"verb":"GET","url":"/api/v1/ffproble","args":[],"protocol":"io.socket"},"driveconfig":{"verb":"GET","url":"/api/v1/driveconfig","args":[]},"activeProcess":{"verb":"POST","url":"/api/v1/active-process","args":[]}}
  /* eslint-enable */

});
