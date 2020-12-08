import React from 'react';
import HeroSection from './HeroSection';
import BigHero from './BigHero';
import Quotes from './Quotes';

const MainSection = () => {


    return (
        <div>
            <BigHero />
            <HeroSection
                tilte="Bạn chỉ cần động não, còn mọi thứ khác đã có chúng tôi lo."
                quotes="Từ các thẻ ghi nhớ giúp bạn học tiếng Anh,
                        đến các trò chơi giúp học lịch sử dễ dàng,
                         bạn có thể sử dụng nhiều loại công cụ để chinh phục mọi thử thách."
                img_path="https://images.prismic.io/quizlet-prod/f566f00a-c722-47f4-8d0e-cfe6dfea372e_bannecker-benefit1.png?auto=compress,format"
                order="1"
            />
            <HeroSection
                tilte="Thành công tiếp theo của bạn đang ở rất gần rồi."
                quotes="Mỗi kiến thức mới bạn học là một thành tích.
                        Quizlet chia nhỏ các chủ đề và môn học để
                         bạn tiến bộ từng ngày."
                img_path="https://images.prismic.io/quizlet-prod/96d962d7-4cac-4b5d-9442-478054f61473_bannecker-benefit2.png?auto=compress,format"
                order="0"
            />
            <HeroSection
                tilte="Đừng nản lòng. Cùng nỗ lực nào."
                quotes="Khi một bài học nhỏ nhất cũng mang lại cảm giác chiến thắng,
                        bạn sẽ có thêm động lực tiếp bước."
                img_path="https://images.prismic.io/quizlet-prod/63a034d5-9f01-4024-a6bf-e36996575fd1_bannecker-benefit3.png?auto=compress,format"
                order="1"
            />
            <Quotes />

 
        </div>
        
    )
}

export default MainSection
