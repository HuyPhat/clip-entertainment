import React from 'react';
import PropTypes from 'prop-types';
import EntertainmentPlaylistSlider from '@components/home/slider/entertainment';
// import CustomElementPlaylistSliderItem from '@components/custom-element/playlist/playlist-slider';
import api from '../../../api/index';

class RelatedPlaylist extends React.PureComponent {
  static propTypes = {
    playlists: PropTypes.array
  };

  static defaultProps = {
    playlists: []
  };

  state = {
    relatedPlaylistsData: [],
    error: null
  };

  componentDidMount() {
    this.fetchPlayList();
  }

  async fetchPlayList() {
    const params = this.props.playlists.map(element => {
      return {
        id: element.playlistID.trim(),
        page: 0,
        offset: 10
      };
    });
    try {
      const result = await api.getRelatedPlaylists(params);
      // console.log('>>>> r: ', result);
      if (result.ok) {
        const relatedPlaylistsData = result.data.data;
        this.setState({ relatedPlaylistsData });
      } else {
        this.setState({ error: result.data.error });
      }
    } catch (error) {
      console.log(error);
      this.setState({ error });
    }
  }

  render() {
    const { playlists } = this.props;
    const { relatedPlaylistsData } = this.state;
    const el = relatedPlaylistsData.map((item, idx) => {
      const { playlist } = item;
      if (_.get(item.playlist, 'data')) {
        const playlistInfo = {
          title: playlist.title,
          items: playlist.data
        };
        const properties = {
          key: playlists[idx].playlistID || idx,
          playlistInfo
        };
        return (
          <EntertainmentPlaylistSlider {...properties} zone={this.props.zone} />
        );
      }
      // return (
      //   <EntertainmentPlaylistSlider {...properties} zone={this.props.zone} />
      // );
    });
    return <div>{el}</div>;
  }
}

export default RelatedPlaylist;
