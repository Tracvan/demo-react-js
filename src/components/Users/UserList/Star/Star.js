import {useEffect, useState} from "react";

function Star(props) {
    const [startColor, setStartColor] = useState("gold");
    const [arrStar, setArrStar] = useState([])

    useEffect(() => {
        const totalStar = props.totalStar;
        const data = [];
        for (let i = 0; i < 10; i++) {
            let star = <i key={i} onMouseOver={() => handleHoverStar(i)}
                          style={{color: totalStar >= i ? startColor : ''}} className="bi bi-star-fill"></i>
            data.push(star);
        }
        setArrStar([...data]);
    }, []);

    useEffect(() => {
        console.log('================================ Star Didmount')
    }, []);

    const handleHoverStar = (index) => {
        const data = [];
        for (let i = 0; i < 10; i++) {
            let star = <i key={i} onMouseOver={() => handleHoverStar(i)}
                          style={{color: index >= i ? startColor : ''}} className="bi bi-star-fill"></i>
            data.push(star);
        }
        setArrStar([...data]);
        props.ratingStar(props.indexUser, index)
    }

    return (
        <>
            {arrStar}
        </>
    )
}

export default Star;