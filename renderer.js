function log(...args) {
  console.log('%c[Kernel.StaffMode]', 'color: #4de376;', ...args);
}

function enableStaffMode() {
  let wpRequire;
  window.webpackChunkdiscord_app.push([
    [Math.random()],
    {},
    (req) => {
      wpRequire = req;
    },
  ]);
  const mod = Object.values(wpRequire.c).find(
    (x) => typeof x?.exports?.default?.isDeveloper !== 'undefined'
  );
  const usermod = Object.values(wpRequire.c).find(
    (x) => x?.exports?.default?.getUsers
  );
  const nodes = Object.values(
    mod.exports.default._dispatcher._actionHandlers._dependencyGraph.nodes
  );
  try {
    nodes
      .find((x) => x.name == 'ExperimentStore')
      .actionHandler['OVERLAY_INITIALIZE']({ user: { flags: 1 } });
  } catch (e) {}
  const oldGetUser = usermod.exports.default.__proto__.getCurrentUser;
  usermod.exports.default.__proto__.getCurrentUser = () => ({
    hasFlag: () => true,
  });
  nodes
    .find((x) => x.name == 'DeveloperExperimentStore')
    .actionHandler['CONNECTION_OPEN']();
  usermod.exports.default.__proto__.getCurrentUser = oldGetUser;
  log('StaffMode successfuly enabled');
}

function checkExistence() {
  const element = document.querySelector(
    '#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div.container-1eFtFS > div > div > div.sidebar-1tnWFu > section > div.container-YkUktl > div.flex-2S1XBF.flex-3BkGQD.horizontal-112GEH.horizontal-1Piu5-.flex-3BkGQD.directionRow-2Iu2A9.justifyStart-2Mwniq.alignStretch-Uwowzr.noWrap-hBpHBz > button:nth-child(3)'
  );
  if (element) {
    enableStaffMode();
  } else {
    setTimeout(checkExistence, 250);
  }
}
checkExistence();
