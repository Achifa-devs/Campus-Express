import deleteSvg from '../../assets/delete-svgrepo-com (1).svg'


const RmBtn = () => {
    return ( 
        <>
            <div className="buyer-history-remove-btn">
                <img src={deleteSvg} alt="" />
                &nbsp;
                &nbsp;
                <span>Viewed 2 days ago</span>
            </div>
        </>
     );
}
 
export default RmBtn;