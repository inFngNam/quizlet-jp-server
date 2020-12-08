import React from 'react'

const HeroSection = ({tilte, quotes, img_path, order}: any) => {
    return (
        <div className="hero-container">
            <div className="hero-child-child">
                {
                    (order === "1") ? (
                        <div className="hero-child">
                            <div className="hero-text">
                                <h2>{tilte}</h2>
                                <p>{quotes}</p>
                            </div>
                            <div className="hero-image">
                                <img src={img_path}
                                    alt="hero-image" />
                            </div>
                        </div>
                    ) : (
                        <div className="hero-child">
                            <div className="hero-image">
                                <img src={img_path}
                                    alt="hero-image" />
                            </div>
                            <div className="hero-text">
                                <h2>{tilte}</h2>
                                <p>{quotes}</p>
                            </div>
                            
                        </div>
                    )
                    
                }
            </div>

        </div>
    )
}

export default HeroSection;
