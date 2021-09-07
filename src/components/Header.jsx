import React from "react";


function connect() {
    alert("Coming soon!");
}

function Header() {
    return (
        <div className="header">
            <div className="container">
                <div className="navbar">
                    <h2 className="logo">LAZY HIPPOS</h2>
                    <div className="menu">
                        <a href="https://lazyhippo.art/#attributes" className="menu-item">attributes</a>
                        <a href="https://lazyhippo.art/#roadmap" className="menu-item">roadmap</a>
                        <a href="https://lazyhippo.art/#faq" className="menu-item">FAQ</a>
                    </div>
                    <button className="connect" onClick={connect}>connect wallet</button>
                </div>
                <div className="content-header">
                <img src="img/hippo-gif.gif" alt="hippo" className="hippo-image"></img>
                <h1>Meet our lazy hippos!</h1>
                <h2 className="hippo-description">10.000 randomly generated very<br /> lazy hippos living on Solana</h2>

                <h2 className="coming-soon">COMING SOON!</h2>
                <a href="https://discord.gg/HmSGCkUk"><i class="fab fa-discord"></i></a>
                <a href="https://twitter.com/SolHippo"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
        </div>
    );
}

export default Header;