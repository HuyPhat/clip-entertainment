import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import VideoItem from '@components/custom-element/cards/video-item';
import CustomElementPlaylistSliderItem from '@components/custom-element/playlist/playlist-slider';

class SliderHeader extends Component {
  
	
    render() {
        const playlistInfo = [
            {
                id: 1,
                thumbnail: 'https://prod.media.wapa.pe/720x405/wapa/imagen/2018/05/12/noticia-fx-esta-es-la-traduccion-de-red-light.png',
                title: 'F(X): esta es la traducción de “Red Light”',
                shortDes: 'Ky tich trong hanh trinh 10 nam gan bo cua cac co gai SNSD',
            },
            {
                id: 2,
                thumbnail: 'https://images.kienthuc.net.vn/zoomh/500/uploaded/hathihang/2017_10_10/snsd/ky-tich-trong-hanh-trinh-10-nam-gan-bo-cua-cac-co-gai-snsd.jpg',
                title: 'Ky tich trong hanh trinh 10 nam gan bo cua cac co gai SNSD',
                shortDes: 'Ky tich trong hanh trinh 10 nam gan bo cua cac co gai SNSD',
            },
            {
                id: 3,
                thumbnail: 'https://images.vov.vn/h500/uploaded/iks5biboyf0v5jhf2jbg/2017_12_14/1_CHDC.jpg',
                title: 'Black pink vuot mat big bang dan dau bxh top 10 mv duoc xem nhieu nhat Black pink vuot mat big bang dan dau bxh top 10 mv duoc xem nhieu nhat',
                shortDes: 'Ky tich trong hanh trinh 10 nam gan bo cua cac co gai SNSD',

            },
            {
                id: 4,
                thumbnail: 'https://prod.media.larepublica.pe/720x405/larepublica/imagen/2018/02/04/noticia-selena-gomez.png',
                title: 'Selena Gómez nuevamente mal de su salud mental. Foto: Difusión'
            },
            {
                id: 5,
                thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSykZWHZb-sQFVRdr_xFCrRMURNZPWc56PVzW5mT3y7eI_ziqd5Ug',
                title: 'Miley Cyrus Reveals The Deeper Meaning Behind on "Malibu"'
            },
            {
                id: 6,
                thumbnail: 'https://cdn-az.allevents.in/banners/8a4a59d5d40c79b7f507a1308e64a9e1-rimg-w720-h405-gmir.jpg',
                title: 'Maroon 5 & Julia Michaels At Xcel Energy Center, Saint Paul, MN'
            },

        ]
    
    
        return (
            <Grid container>
                
                <div className="slider-container">
                <Grid item md={8} className='slider-header-content'>
                {/* <div className='slider-header-content'> */}
                        {/* <h3>
                            Tiếp tục hành trình phượt xe máy khắp thế giới, Trần Đặng Đăng Khoa đến với Colombia và có những câu chuyện
                        </h3>
                        <span>POPS Worldwide is a leading digital entertainment company and based in Vietnam. As a pioneer in the field of digital entertainment in Vietnam, POPS has become the multi-channel aaa</span> */}
                    {/* </div> */}
                    {/* <CustomElementPlaylistSliderItem playlistInfo={playlistInfo}/>})} */}
				/>
                </Grid>
                    
                        
			    </div>
            </Grid>
            
        )
    }
}

export default SliderHeader