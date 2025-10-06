import '../../../styles/ocerview.css'

const Card = ({title, summary}) => {
    return ( 
        <>
            <div class="box-cnt shadow-sm">
        
                <div class="link">
                    View
                </div>

                <div class="counter">
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