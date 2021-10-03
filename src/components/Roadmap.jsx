import React from "react";

function Roadmap() {
    return (
        <div className="roadmap" id="roadmap">
            <div className="container">
                <h2 class="text-center width-50 margin-bottom-50">Roadmap</h2>
                <div className="RoadmapRow">
                    <div className="RoadmapCard-Root">
                        <div><h3>Presale - 24th of September, 4pm UTC</h3></div>
                        <div><p>We want to reward our most loyal followers with an access to a presale.</p></div>
                    </div>
                    <div className="RoadmapLine">
                        <div className="RoadmapLineCenter">
                            <div className="RoadmapLineDot filled"></div>
                        </div>
                    </div>
                    <div className="RoadmapEmpty"></div>
                </div>

                <div className="RoadmapRow RoadmapRowFlip">
                    <div className="RoadmapCard-Root">
                        <div><h3>Successfull launch - 26th of September, 4pm UTC</h3></div>
                        <div><p>Launch of remaining Hippos to all our comunity members with a fair minting process.</p></div>
                    </div>
                    <div className="RoadmapLine">
                        <div className="RoadmapLineCenter">
                            <div className="RoadmapLineDot filled"></div>
                        </div>
                    </div>
                    <div className="RoadmapEmpty"></div>
                </div>

                <div className="RoadmapRow">
                    <div className="RoadmapCard-Root">
                        <div><h3>Marketplace integration</h3></div>
                        <div><p>Right after the lauch you will be able to buy and sell our Lazy Hippos on all Solana NFT marketplaces.</p></div>
                    </div>
                    <div className="RoadmapLine">
                        <div className="RoadmapLineCenter">
                            <div className="RoadmapLineDot filled"></div>
                        </div>
                    </div>
                    <div className="RoadmapEmpty"></div>
                </div>

                <div className="RoadmapRow RoadmapRowFlip">
                    <div className="RoadmapCard-Root">
                        <div><h3>Rarity calculator</h3></div>
                        <div><p>We want to tell you just how rare your hippo is with a rarity calculator integrated in our website.</p></div>
                    </div>
                    <div className="RoadmapLine">
                        <div className="RoadmapLineCenter">
                            <div className="RoadmapLineDot"></div>
                        </div>
                    </div>
                    <div className="RoadmapEmpty"></div>
                </div>

                <div className="RoadmapRow">
                    <div className="RoadmapCard-Root">
                        <div><h3>Hippo family</h3></div>
                        <div><p>We want to extend our Lazy Hippo family with other family members living on Solana blockchain.</p></div>
                    </div>
                    <div className="RoadmapLine">
                        <div className="RoadmapLineCenter">
                            <div className="RoadmapLineDot"></div>
                        </div>
                    </div>
                    <div className="RoadmapEmpty"></div>
                </div>

                <div className="RoadmapRow RoadmapRowFlip">
                    <div className="RoadmapCard-Root">
                        <div><h3>Charity donation</h3></div>
                        <div><p>We want to help our fellow Hippos. That's why we will donate 10% of Hippo sales to African Wild Life Foundation!</p></div>
                    </div>
                    <div className="RoadmapLine">
                        <div className="RoadmapLineCenter">
                            <div className="RoadmapLineDot"></div>
                        </div>
                    </div>
                    <div className="RoadmapEmpty"></div>
                </div>
            </div>
        </div>

    );
}

export default Roadmap;