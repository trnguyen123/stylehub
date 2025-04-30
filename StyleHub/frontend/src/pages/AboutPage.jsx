import React from 'react';
import FounderCard from '../components/FounderCard'; // Import component FounderCard
import './AboutPage.css'; // Đảm bảo rằng bạn có file CSS để định dạng trang

const About = () => {
    const founders = [
        {
            name: 'Trần Đại Nghĩa',
            position: 'CO-FOUNDER',
            image: require('../assets/founder2.png')
        },
        {
            name: 'Tạ Hà Quỳnh Anh',
            position: 'CO-FOUNDER',
            image: require('../assets/founder1.png')
        },
        {
            name: 'Trần Huỳnh Bảo Ngọc',
            position: 'CO-FOUNDER',
            image: require('../assets/founder1.png')
        },
        {
            name: 'Phạm Trương Tuấn Ninh',
            position: 'CO-FOUNDER',
            image: require('../assets/founder2.png')
        },
        {
            name: 'Nguyễn Hoàng Trung Nguyên',
            position: 'CO-FOUNDER',
            image: require('../assets/founder2.png')
        }
    ];

    return (
        <div className="about-page-container">
            <h2 className="about-page-title">Về Chúng Tôi</h2> {/* Tiêu đề trang */}

            {/* Giới thiệu doanh nghiệp */}
            <section className="company-introduction-section">
                <h3 className="company-introduction-title">Giới Thiệu Doanh Nghiệp</h3>
                <p className="company-introduction-description">Chúng tôi chuyên cung cấp các sản phẩm thời trang hàng hiệu cao cấp của các thương hiệu nổi tiếng trên thế giới, bao gồm các sản phẩm về thời trang, túi xách, nước hoa, kính mắt, giày,...</p>
                <p className="company-introduction-description">Tại đây bạn có thể dễ dàng tìm kiếm các sản phẩm hàng hiệu cao cấp một cách nhanh chóng. Chúng tôi liên tục cập nhật các mẫu hot nhất, mới nhất của các thương hiệu lớn, bạn hoàn toàn có thể mua sắm vui vẻ, nhanh chóng.</p>
            </section>

            {/* Mục tiêu và phương châm */}
            <section className="company-goals-section">
                <h3 className="company-goals-title">Mục Tiêu và Phương Châm</h3>
                <p className="company-goals-description">Phương châm của chúng tôi là mang đến các sản phẩm thời trang cao cấp đến với mọi đối tượng khách hàng, từ những đối tượng ít quan tâm đến thời trang đến các tín đồ đam mê hàng hiệu. Chúng tôi luôn cam kết mang đến những sản phẩm chất lượng, thời thượng và phù hợp với nhu cầu của từng khách hàng.</p>
            </section>

            {/* Danh sách các nhà sáng lập */}
            <div className="founders-list-container">
                {founders.map((founder, index) => (
                    <FounderCard 
                        key={index} 
                        name={founder.name} 
                        position={founder.position} 
                        image={founder.image} 
                    />
                ))}
            </div>
        </div>
    );
};

export default About;
