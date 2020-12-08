import React from 'react';
import { Carousel } from 'react-bootstrap';
const Slider = ({ img_path, quotes }: any) => {
    return (
        <div className="bighero-child-right">
            <div className="right-img">
                <Carousel
                    fade={true}
                    interval={2000}
                    controls={false}
                    indicators={false}
                    slide={true}
                >
                    <Carousel.Item >
                        <img src={require('../../assets/slide2.png')}
                            alt="bighero-img" 
                            className="right-img-img"
                            />
                    </Carousel.Item>
                    <Carousel.Item >
                        <img src={require('../../assets/slide1.png')}
                            alt="bighero-img" 
                            className="right-img-img"/>
                    </Carousel.Item>
                    <Carousel.Item >
                        <img src={require('../../assets/slide3.png')}
                            alt="bighero-img"
                            className="right-img-img" />
                    </Carousel.Item>
                </Carousel>

            </div>

            <div className="right-quotes">
                <div className="right-quotes-top">QUIZLET DÀNH CHO CÁC ĐỐI TƯỢNG HỌC SINH SAU</div>
                <div>
                <Carousel
                    fade={true}
                    interval={2000}
                    controls={false}
                    indicators={false}
                    slide={true}
                >
                    <Carousel.Item >
                        Những học sinh tự nhủ "Đêm nay, mình sẽ làm xong bài tập để cuối tuần có thể đi chơi."
                    </Carousel.Item>
                    <Carousel.Item >
                        Những học sinh tự nhủ "Mình có thể nhận được điểm cao hơn 10 không nhỉ?"
                    </Carousel.Item>
                    <Carousel.Item >
                        Những học sinh tự nhủ "Giờ mình càng chăm học, thì càng thoải mái tận hưởng kỳ nghỉ."
                    </Carousel.Item>
                </Carousel>
                </div>
            </div>
        </div>
    )
}

export default Slider
