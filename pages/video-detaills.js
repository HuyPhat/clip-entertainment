import React from 'react';
import $ from 'jquery';
import Main from '@components/layouts/main';
import MusicZone from '@components/home/music-zone';
import EntertainmentZone from '@components/home/entertainment-zone';

class SVideoDetailsPage extends React.Component {
	componentDidMount() {
		setTimeout(() => {
			$('.loading-page').fadeOut();
		}, 2500);
	}
	render() {
		return (
			<div className="page-video-detail">
				<Main>
					<div className="video-detail-page container pt100">
						<div className="breadcrumbs">
							<ul className="list-breadcrumbs">
								<li className="item">
									<a href="javascript:voi(0)">E! Zone</a>
								</li>
								<li className="item">
									<a href="javascript:voi(0)">Leep up with the kardashians</a>
								</li>
								<li className="item">
									<a href="javascript:voi(0)">Tiếp tục hành trình phượt xe máy khắp</a>
								</li>
							</ul>
						</div>
						<div className="video-wrap">
							<iframe width="100%" height="550" src="https://www.youtube.com/embed/xQrkLbpi3yE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
						</div>
						<div className="video-info video-detail">
							<div className="video-title big-feature-title">
								Đột nhập shop phụ kiện của Phùng Khánh Linh
							</div>
							<div class="video-tool">
								<ul class="button-group">
									<li class="header-category">
										<div class="hover-effect">
											<img src="/static/images/ezone-share-icon.png" />
										</div>
									</li>
									<li class="header-category">
										<div class="hover-effect">
											<img src="/static/images/ezone-like-icon.png" />
										</div>
									</li>
									<li class="view">
										<div class="hover-effect">
											<img src="/static/images/ezone-view-icon.png" />
											<span>0
											Views</span>
										</div>
									</li>
									<li class="date">
										<div class="hover-effect">05/07/2018 - 10:00</div>
									</li>
								</ul>
							</div>
							<div className="video-title big-feature-desc">
								Hãy cùng POPS và "Săm Soi Sao" khám phá shop phụ kiện xinh xắn của Phùng Khánh Linh. Cô bạn nổi tiếng với ca khúc "Hôm nay tôi buồn" bên ngoài là một người cực kỳ sôi nổi, đáng yêu
							</div>
							{/* <div className="readmore-wrap">
								<a href="javascript:void(0)" class="readmore links">
									Xem thêm
								</a>
							</div> */}
						</div>
					</div>
					<div className="video-detail-page pb100">
						<MusicZone />
						<EntertainmentZone />
					</div>
				</Main>
				<div className="loading-page">
					<div className="loading-table">
						<div className="loading-table-cell">
							<div className="loading-wrap">
								<div className="loading-logo">
									<img
										className="loading-img img"
										src="/static/images/header-popstv-logo.png"
									/>
								</div>
								<div className="loading-loader">
									<div className="loader">
										<div className="bar bar1" />
										<div className="bar bar2" />
										<div className="bar bar3" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SVideoDetailsPage;
