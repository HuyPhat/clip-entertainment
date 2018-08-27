import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import $ from 'jquery';
import Advertisement from '@components/custom-element/advertisement/advertisement';
import { withStyles } from '@material-ui/core/styles';

import Router from 'next/router';
const mockedRouter = { push: () => { } };
Router.router = mockedRouter;

import NProgress from 'nprogress';
NProgress.configure({
	showSpinner: false,
	template: `<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>`
});

// import CustomElementToastIndex from '@components/custom-element/toast';
import CustomElementLoadingPage from '@components/custom-element/loading/page';
import '@root/style.less';

Router.onRouteChangeStart = url => {
	NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
});

class LayoutsHeader extends React.PureComponent {
	getOffset(element) {
		var bounding = element.getBoundingClientRect();
		return {
			top: bounding.top + document.body.scrollTop,
			left: bounding.left + document.body.scrollLeft
		};
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
		let headerContainer = $('.header-container'),
			advHeader = $('#header-section .ad-header'),
			advHeaderHeight = advHeader.height(),
			headerContainerHeight = headerContainer.height(),
			navigationHeight = $('.header-container .navigation').height();
		$(window).on('scroll', function () {
			let scrollTop = $(window).scrollTop();
			if (scrollTop > advHeaderHeight) {
				headerContainer.addClass('scroll');
				// headerContainer.css({
				// 	'top': advHeaderHeight - headerContainerHeight - 1 + 'px'
				// });
				$('.pops-tv-backtotop').fadeIn();
			} else {
				headerContainer.removeClass('scroll');
				// headerContainer.css({
				// 	'top': '0'
				// });
				$('.pops-tv-backtotop').fadeOut();
			}
		});

		// now scroll to element with that id

		setTimeout(() => {
			{
				// var windowHash = window.location.hash;
				$('html, body').animate({
					scrollTop: $(window).offset().top - headerContainerHeight + advHeaderHeight + navigationHeight
				});
			}
		}, 2500);
		$('.navigation li .item-cursor, .pops-tv-links .item-cursor').on(
			'click',
			function (e) {
				e.preventDefault();
				let $this = $(this),
					curSection = $this.attr('href');
				setTimeout(() => {
					$('html, body').animate(
						{
							scrollTop: $(curSection).offset().top - headerContainerHeight + advHeaderHeight + navigationHeight
						},
						800
					);
				}, 100);
			}
		);

		$(document).on('click', '.goto-top', function (e) {
			e.preventDefault();
			setTimeout(() => {
				$('html,body')
					.stop()
					.animate(
						{
							scrollTop: 0
						},
						800
					);
			}, 100);
		});
		if ($('.video-detail').length > 0) {
			var textLength = $('.detail-desc p').html();
			console.log(textLength.length);
			if (textLength.length > 400) {
				$('.video-detail .detail-desc').addClass('hidden-text');
				$('.video-detail .detail-desc .readmore').click(function (e) {
					e.preventDefault();
					$(this).fadeOut().parent().removeClass('hidden-text');

				});

			}
			// $('body').addClass('video-detail-page').css({
			// 	"background-image": 'url(static/images/bg.png)',
			// 	"background-position": "top left",
			// 	"background-repeat": "repeat-x"
			// });
		}

		$(window).on('beforeunload', function () {
			$(window).scrollTop(0);
		});
		$('.related-video-items-container .less').click(function () {
			$('.related-video-items-container').toggleClass('active');
		});
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	render() {
		const { titleRef, contentRef } = this.refs;
		return (
			<div className="header-container">
				<CustomElementLoadingPage key="loading" />
				<div className="container" id="header-section">
					<Advertisement titleStyle="ad-header" />
					<div className="navigation positon-sticky wp-inlineb">
						<div className="inlineb-m logo-img-wrap">
							<Link href="/">
								<a className="inlineb-m header-logo-wrap">
									<img
										className="header-logo"
										src="/static/images/header-popstv-logo.png"
									/>
								</a>
							</Link>
							<ul className="inlineb-m">
								<li>
									<a
										id="ezone"
										className="item-cursor"
										onClick={() => Router.push('/')}
										href="#ezone-section"
									>
										E! ZONE
                  					</a>
								</li>
								<li>
									<a
										id="music"
										className="item-cursor"
										onClick={() => Router.push('/')}
										href="#music-section"
									>
										ÂM NHẠC
                  					</a>
								</li>
								<li>
									<a
										id="entertainment"
										className="item-cursor"
										onClick={() => Router.push('/')}
										href="#entertainment-section"
									>
										GIẢI TRÍ
                  					</a>
								</li>
							</ul>
						</div>
						<div className="inlineb-m nmenu-left">

							<div className="header-icon-fb-youtube">
								<p><a target="_blank" rel="noopener no referrer" href=""><img src="/static/images/search.png"></img></a></p>
								<p><a target="_blank" rel="noopener no referrer" href="https://www.facebook.com/POPSTVVIETNAM/?ref=br_rs"><img src="/static/images/icon-fb.png"></img></a></p>
								<p><a target="_blank" rel="noopener no referrer" href="https://www.youtube.com/user/POPSTVVIETNAM"><img src="/static/images/icon-ins.png"></img></a></p>
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}
}

LayoutsHeader.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LayoutsHeader);
