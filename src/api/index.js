import { create } from 'apisauce';
import { getBaseAPI } from './api.helper';

const baseURL = getBaseAPI();

const api = create({
  baseURL,
  headers: {
    'Cache-Control': 'no-cache',
    'api-key': '5b598a1f21e5ca2127b7ed7c'
  }
});

const getPage = ({ code, profileID }) =>
  api.get(`/v1/Pages/findByCode?code=${code}`);

const getVideoInfo = ({
  videoId,
  source = 'yt, cdn, brightcove',
  encrypt = '_plain',
  forceHLS = true
}) =>
  api.post(`v1/Videos/requestVideo`, {
    id: videoId,
    source,
    encrypt,
    forceHLS
  });

const getVideoById = ({ videoId }) => api.get(`v1/Videos/${videoId}`);

const getRelatedPlaylists = params =>
  api.get(`v1/Playlists/fetchListPlaylist`, { query: JSON.stringify(params) });

export default { getPage, getVideoInfo, getVideoById, getRelatedPlaylists };
