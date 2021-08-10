import React from "react";
import "../../assets/styles/customStyles.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div>
                <div className="credits">
                    <p>Aaron Au Yoong Copyright (c) 2021-Present. All rights reserved. </p>
                    <p> <i className="fas fa-music"></i> Music Powered by Spotify.</p>
                </div>
                <div className="icon-links">
                    <a href="https://www.github.com/aaronauyoong"><i className="fab fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/aaron-au-yoong-a69213142/"><i className="fab fa-linkedin-in"></i></a>
                    <a href="mailto:auyoong.aaron@gmail.com"><i className="fas fa-envelope-square"></i></a>
                </div>
            </div>         
        </footer>
    )
}