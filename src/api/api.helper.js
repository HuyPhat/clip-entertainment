import coreConfig from './api.config';

function getConfigsByEnv() {
  // console.log('>>>>>>>>>>>>>>>>>>>');
  // console.log(process.env.NODE_ENV);
  // console.log('???????????????????');
  // console.log(coreConfig);
  switch (process.env.NODE_ENV) {
    case 'production':
      return coreConfig.prod;
    case 'local':
      return coreConfig.local;
    default:
      return coreConfig.dev;
  }
}

function getBaseAPI() {
  return getConfigsByEnv().apiUrl;
}

function getLinkAPI(uri) {
  const cbe = getConfigsByEnv();
  return cbe.apiUrl + uri;
}

export { getBaseAPI, getConfigsByEnv, getLinkAPI };
