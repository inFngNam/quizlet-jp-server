import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";

function Footer() {
  return (
      <>
          <div className="footer-container">
              <div className="footer-child">
                  <div className="footer-top">
                      <div className="footer-column column1">
                          <h6>Chủ đề</h6>
                          <Link to='/'>Khoa học</Link>
                          <Link to='/'>Khoa học xã hội</Link>
                          <Link to='/'>Khác</Link>
                          <Link to='/'>Nghệ thuật và nhân văn</Link>
                          <Link to='/'>Ngôn ngữ</Link>
                          <Link to='/'>Toán học</Link>
                      </div>
                      <div className="footer-column column2">
                          <h6>Tính năng</h6>
                          <Link to='/'>Quizlet Live</Link>
                          <Link to='/'>Chế độ Học</Link>
                          <Link to='/'>Sơ đồ</Link>
                          <Link to='/'>Thẻ ghi nhớ</Link>
                          <Link to='/'>Ứng dụng</Link>
                      </div>
                      <div className="footer-column column3">
                          <h6>Hỗ trợ</h6>
                          <Link to='/'>Đăng ký</Link>
                          <Link to='/'>Trung tâm Hỗ trợ</Link>
                          <Link to='/'>Quy tắc danh dự</Link>
                          <Link to='/'>Nguyên tắc cộng đồng</Link>
                          <Link to='/'>Học sinh</Link>
                          <Link to='/'>Giáo viên</Link>
                      </div>
                      <div className="footer-column column4">
                          <h6>Giới thiệu</h6>
                          <Link to='/'>Công ty</Link>
                          <Link to='/'>Blog</Link>
                          <Link to='/'>Báo chí</Link>
                          <Link to='/'>Tuyển dụng</Link>
                          <Link to='/'>Quảng cáo</Link>
                          <Link to='/'>Quyền riêng tư</Link>
                          <Link to='/'>Terms of Service</Link>
                          <Link to='/'>Chính sách quảng cáo và cookie</Link>
                          <Link to='/'>Điều khoản dịch vụ</Link>

                      </div>
                      <div className="footer-column column5">
                          <h6>Ngôn ngữ</h6>
                          <select>
                              <option value="vietnamese">Tiếng Việt</option>
                              <option value="english">Tiếng Anh</option>
                              <option value="chinese">Trung Quốc</option>
                              <option value="japanese">Tiếng Nhật</option>
                          </select>
                      </div>
                  </div>
                  <hr />
                  <div className="footer-bottom">
                      <div className="left">
                          <AiOutlineTwitter className="iccon" />
                          <FaFacebook className="iccon" />
                          <FaInstagram className="iccon" />
                      </div>
                      <div className="right">
                          © 2020 Quizlet Inc.
                  </div>

                  </div>
              </div>


          </div>
      </>
  )
}

export default Footer
