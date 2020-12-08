import React, { useState, useEffect } from 'react';
import Slider from "./Slider";
import { Redirect, Link } from 'react-router-dom';


const BigHero = () => {

    const handleClick = () => {
        window.location.replace("/overview");
    }


    return (
        <div className="bighero-container">
            <div className="bighero-child-left">
                <div className="bighero-child-left-child">
                    <div className="text">
                        <h1>Trở thành phiên bản xuất sắc nhất của chính bạn</h1>
                    </div>
                    <div className="quotes">
                        <p>Nắm vững mọi môn học, từng bước một</p>
                    </div>
                    <div className="button-start" onClick={handleClick}>
                        Bắt đầu học
                    </div>
                    <div className="role">
                        <div>
                            Tôi là giáo viên
                        </div>
                        <div>
                            Tôi là phụ huynh
                        </div>
                    </div>
                </div>

            </div>

            <Slider />

        </div>
    )
}

export default BigHero
