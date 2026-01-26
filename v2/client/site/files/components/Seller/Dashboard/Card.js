import '../../../styles/ocerview.css'

const Card = ({title, summary}) => {
    return ( 
        <>
            <div className="box-cnt shadow-sm">
        
                <div className="link">
                    View
                </div>

                <div className="counter">
                    {title}
                </div>

                <div style={{fontSize: "small"}}>
                    {summary}
                </div>

            </div>
        </>
     ); 
}
 
export default Card;