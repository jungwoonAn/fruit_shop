import React from 'react'
import { useNavigate } from 'react-router-dom';

const Product = (props) => {
    console.log(props)
    const {id, title, price, imgUrl, content} = props.fruit;
    const navigate = useNavigate()

    return (
        <div className="col-md-4 mb-3" onClick={()=>{navigate('/detail/' + id)}}>
            <img src={process.env.PUBLIC_URL + imgUrl} width="80%" alt="" />
            <h4 className='mt-2'>{title}</h4>
            <p>{content}</p>
            <span>{price}</span>
        </div>
    )
}

export default Product