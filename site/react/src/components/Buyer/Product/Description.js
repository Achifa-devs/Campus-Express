const Description = ({item}) => {
    return ( 
        <>
            <div className="buyer-product-description shadow-sm" style={{background: '#fff', borderRadius: '5px', padding: '0'}}>
                <h6 className="" style={{padding:'10px', margin: '0', borderBottom: '1px solid #efefef', height: '50px', width: '100%', background: '#fff'}}>Description</h6>
                <section style={{padding: '20px', fontSize: 'small', fontWeight: '400', background: '#fff', fontFamily: 'sans-serif'}}>
                    {item?.description}
                </section>
            </div>
        </>
     );
}
 
export default Description;