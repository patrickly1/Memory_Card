export default function Card({ pic, 
    title ,
    index,
    handleCardClick
}) {
    return (
        <div className="cardContainer">
            <button onClick={() => handleCardClick(index)}>
                <div className="buttonPic">
                    {pic}
                </div>
                <div className="buttonTitle">
                    {title}
                </div>
            </button>
        </div>
    )
}