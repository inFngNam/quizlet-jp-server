import React from 'react';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
import { Carousel } from 'react-bootstrap';
const Quotes = () => {
    return (
        <div className="quotes-container">
            <div className="quotes-container-child">
                <Carousel
                    interval={3000}
                    controls={false}
                    indicators={false}
                    slide={true}
                >
                    <Carousel.Item className="quotes-container-child-child">
                        <p className="quotes-details">
                            <ImQuotesLeft className="quote-icon" />
                            Trước đây, khi nói đến việc học, tôi dở vô cùng.
                            Bây giờ tôi đang ở một trường đại học mới và họ giới thiệu tôi với Quizlet.
                            Tôi không còn căng thẳng mỗi khi học và làm bài tập nữa. CẢM ƠN QUIZLET!!!
                            <ImQuotesRight className="quote-icon" />
                        </p>
                        <p className="quotes-author">- LITTLEBUTTERCUP, 17 tuổi</p>
                    </Carousel.Item>
                    <Carousel.Item className="quotes-container-child-child">
                        <p className="quotes-details">
                            <ImQuotesLeft className="quote-icon" />
                            Quizlet là một phương pháp học tuyệt vời.
                            Tôi đã giới thiệu nó cho bạn bè và tất cả chúng tôi đang tiến bộ. Bất cứ khi nào nghĩ về Quizlet,
                            tôi lại thấy niềm vui khi học trong vài phút thay vì nhiều giờ.
                            <ImQuotesRight className="quote-icon" />
                        </p>
                        <p className="quotes-author">- AGENTDOLLY, 29 tuổi</p>
                    </Carousel.Item>
                    <Carousel.Item className="quotes-container-child-child">
                        <p className="quotes-details">
                            <ImQuotesLeft className="quote-icon" />
                            Tôi phát hiện ra Quizlet hồi mới 12 tuổi. 
                            Nó đã giúp tôi cải thiện điểm số rất nhiều. 
                            Cảm ơn Quizlet đã giúp cho việc học trở nên vui vẻ và hiệu quả!
                            <ImQuotesRight className="quote-icon" />
                        </p>
                        <p className="quotes-author">- SIERRAFR, 20 tuổi</p>
                    </Carousel.Item>
                </Carousel>

            </div>

        </div>
    )
}

export default Quotes
