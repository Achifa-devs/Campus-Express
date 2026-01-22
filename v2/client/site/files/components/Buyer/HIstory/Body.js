
const Body = ({item}) => {
    return ( 
        <>
            <div className="buyer-history-body">

                                
                <div className='buyer-item-title'>
                    <p>{item.title}</p>
                </div>

                <div className='buyer-item-seller'>
                    <span>Seller: Jason.N.N</span>
                </div>


                <div className="buyer-item-price">
                    <span style={{fontWeight: 'bold'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.price)} </span>
                </div>



                <div className="buyer-items-btn">
                    <button>View</button>
                </div>
            </div>
        </>
     );
}
 
export default Body;